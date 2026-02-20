// Gestion de l'inscription
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const studyLevel = document.getElementById('studyLevel').value;
            const field = document.getElementById('field').value;
            const terms = document.getElementById('terms').checked;
            
            // Validation
            if (password !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas!');
                return;
            }
            
            if (password.length < 8) {
                alert('Le mot de passe doit contenir au moins 8 caractères!');
                return;
            }
            
            if (!terms) {
                alert('Vous devez accepter les conditions d\'utilisation!');
                return;
            }
            
            // Simulation d'enregistrement (dans un vrai projet, vous enverriez ces données à un serveur)
            const user = {
                fullName,
                email,
                password,
                studyLevel,
                field,
                registeredAt: new Date().toISOString()
            };
            
            // Stockage dans localStorage (simulation de base de données)
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('user_' + email, JSON.stringify(user));
            
            // Redirection vers le tableau de bord
            window.location.href = 'dashboard.html';
            
            alert('Compte créé avec succès! Bienvenue ' + fullName + '!');
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember') ? document.getElementById('remember').checked : false;
            
            // Simulation de vérification (dans un vrai projet, vous vérifieriez sur un serveur)
            const userData = localStorage.getItem('user_' + email);
            
            if (userData) {
                const user = JSON.parse(userData);
                
                if (user.password === password) {
                    // Connexion réussie
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    
                    if (remember) {
                        localStorage.setItem('rememberedEmail', email);
                    } else {
                        localStorage.removeItem('rememberedEmail');
                    }
                    
                    // Redirection vers le tableau de bord
                    window.location.href = 'dashboard.html';
                    
                    alert('Connexion réussie! Bienvenue ' + user.fullName + '!');
                } else {
                    alert('Mot de passe incorrect!');
                }
            } else {
                // Simulation d'un compte par défaut pour démo
                if (email === 'demo@etudiantpro.fr' && password === 'demo123') {
                    const demoUser = {
                        fullName: 'Étudiant Démo',
                        email: 'demo@etudiantpro.fr',
                        studyLevel: 'bac3',
                        field: 'Informatique',
                        registeredAt: new Date().toISOString()
                    };
                    
                    localStorage.setItem('currentUser', JSON.stringify(demoUser));
                    window.location.href = 'dashboard.html';
                    alert('Connexion réussie avec le compte démo!');
                } else {
                    alert('Aucun compte trouvé avec cet email. Veuillez vous inscrire.');
                }
            }
        });
        
        // Pré-remplir l'email si l'utilisateur a choisi "Se souvenir de moi"
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail && document.getElementById('email')) {
            document.getElementById('email').value = rememberedEmail;
            if (document.getElementById('remember')) {
                document.getElementById('remember').checked = true;
            }
        }
    }
});