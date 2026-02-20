// Gestion du profil utilisateur
document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');
    const preferencesForm = document.getElementById('preferencesForm');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const avatarUpload = document.getElementById('avatarUpload');
    const avatarImage = document.getElementById('avatarImage');
    const cancelProfileChanges = document.getElementById('cancelProfileChanges');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const newPasswordInput = document.getElementById('newPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    
    // Variables
    let currentUser = null;
    let originalProfileData = null;
    
    // Charger les données de l'utilisateur
    loadUserData();
    
    // Gérer les onglets
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Mettre à jour les onglets actifs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Afficher le contenu correspondant
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}Tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Gérer l'upload de l'avatar
    if (avatarUpload) {
        avatarUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            // Vérifier le type de fichier
            if (!file.type.startsWith('image/')) {
                alert('Veuillez sélectionner une image valide.');
                return;
            }
            
            // Vérifier la taille (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('L\'image ne doit pas dépasser 5MB.');
                return;
            }
            
            // Lire et afficher l'image
            const reader = new FileReader();
            reader.onload = function(event) {
                avatarImage.src = event.target.result;
                
                // Sauvegarder l'image dans le localStorage
                if (currentUser) {
                    currentUser.avatar = event.target.result;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    localStorage.setItem(`user_${currentUser.email}`, JSON.stringify(currentUser));
                    
                    showNotification('Photo de profil mise à jour !', 'success');
                }
            };
            reader.readAsDataURL(file);
        });
    }
    
    // Gérer la soumission du formulaire de profil
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateProfile();
        });
    }
    
    // Annuler les modifications du profil
    if (cancelProfileChanges) {
        cancelProfileChanges.addEventListener('click', function() {
            if (originalProfileData) {
                fillProfileForm(originalProfileData);
            }
        });
    }
    
    // Gérer la soumission du formulaire de mot de passe
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePassword();
        });
    }
    
    // Vérifier la force du mot de passe en temps réel
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', checkPasswordStrength);
    }
    
    // Gérer la soumission du formulaire de préférences
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePreferences();
        });
    }
    
    // Supprimer le compte
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
                deleteAccount();
            }
        });
    }
    
    // Fonctions
    function loadUserData() {
        const userData = localStorage.getItem('currentUser');
        
        if (!userData) {
            // Rediriger vers la page de connexion
            window.location.href = 'login.html';
            return;
        }
        
        currentUser = JSON.parse(userData);
        originalProfileData = { ...currentUser };
        
        // Mettre à jour l'affichage
        updateUserDisplay();
        fillProfileForm(currentUser);
        fillPreferencesForm();
        
        // Charger les statistiques
        loadUserStats();
    }
    
    function updateUserDisplay() {
        // Mettre à jour le nom dans la navbar
        document.querySelectorAll('.user-name').forEach(element => {
            element.textContent = currentUser.fullName;
        });
        
        // Mettre à jour les informations du profil
        document.getElementById('userFullName').textContent = currentUser.fullName;
        document.getElementById('userEmail').textContent = currentUser.email;
        document.getElementById('profileName').value = currentUser.fullName;
        document.getElementById('profileEmail').value = currentUser.email;
        
        // Mettre à jour l'avatar s'il existe
        if (currentUser.avatar) {
            avatarImage.src = currentUser.avatar;
        } else {
            // Générer un avatar avec les initiales
            const name = currentUser.fullName || 'Utilisateur';
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
            avatarImage.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4361ee&color=fff&size=150`;
        }
        
        // Mettre à jour la date d'inscription
        if (currentUser.registeredAt) {
            const date = new Date(currentUser.registeredAt);
            const formattedDate = date.toLocaleDateString('fr-FR');
            document.getElementById('memberSince').textContent = formattedDate;
        }
    }
    
    function fillProfileForm(userData) {
        document.getElementById('profileName').value = userData.fullName || '';
        document.getElementById('profileEmail').value = userData.email || '';
        document.getElementById('profilePhone').value = userData.phone || '';
        document.getElementById('profileStudyLevel').value = userData.studyLevel || '';
        document.getElementById('profileField').value = userData.field || '';
        document.getElementById('profileUniversity').value = userData.university || '';
        document.getElementById('profileBio').value = userData.bio || '';
    }
    
    function fillPreferencesForm() {
        const preferences = currentUser.preferences || {};
        
        document.getElementById('language').value = preferences.language || 'fr';
        document.getElementById('theme').value = preferences.theme || 'light';
        document.getElementById('notificationsEmail').checked = preferences.notificationsEmail !== false;
        document.getElementById('notificationsReminders').checked = preferences.notificationsReminders !== false;
        document.getElementById('weeklyReport').checked = preferences.weeklyReport !== false;
    }
    
    function updateProfile() {
        // Récupérer les données du formulaire
        const updatedUser = {
            ...currentUser,
            fullName: document.getElementById('profileName').value,
            email: document.getElementById('profileEmail').value,
            phone: document.getElementById('profilePhone').value,
            studyLevel: document.getElementById('profileStudyLevel').value,
            field: document.getElementById('profileField').value,
            university: document.getElementById('profileUniversity').value,
            bio: document.getElementById('profileBio').value
        };
        
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(updatedUser.email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }
        
        // Mettre à jour l'utilisateur
        currentUser = updatedUser;
        
        // Sauvegarder dans le localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem(`user_${currentUser.email}`, JSON.stringify(currentUser));
        
        // Si l'email a changé, mettre à jour la clé dans le localStorage
        if (originalProfileData.email !== currentUser.email) {
            localStorage.removeItem(`user_${originalProfileData.email}`);
        }
        
        // Mettre à jour l'affichage
        updateUserDisplay();
        
        // Mettre à jour les données originales
        originalProfileData = { ...currentUser };
        
        showNotification('Profil mis à jour avec succès !', 'success');
    }
    
    function updatePassword() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmNewPassword').value;
        
        // Vérifier le mot de passe actuel
        if (currentUser.password !== currentPassword) {
            alert('Le mot de passe actuel est incorrect.');
            return;
        }
        
        // Vérifier que les nouveaux mots de passe correspondent
        if (newPassword !== confirmPassword) {
            alert('Les nouveaux mots de passe ne correspondent pas.');
            return;
        }
        
        // Vérifier la force du mot de passe
        if (!isPasswordStrong(newPassword)) {
            alert('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.');
            return;
        }
        
        // Mettre à jour le mot de passe
        currentUser.password = newPassword;
        
        // Sauvegarder dans le localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem(`user_${currentUser.email}`, JSON.stringify(currentUser));
        
        // Réinitialiser le formulaire
        passwordForm.reset();
        passwordStrength.className = 'strength-meter';
        passwordStrength.style.width = '0%';
        
        showNotification('Mot de passe changé avec succès !', 'success');
    }
    
    function updatePreferences() {
        const preferences = {
            language: document.getElementById('language').value,
            theme: document.getElementById('theme').value,
            notificationsEmail: document.getElementById('notificationsEmail').checked,
            notificationsReminders: document.getElementById('notificationsReminders').checked,
            weeklyReport: document.getElementById('weeklyReport').checked
        };
        
        // Mettre à jour l'utilisateur
        currentUser.preferences = preferences;
        
        // Sauvegarder dans le localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem(`user_${currentUser.email}`, JSON.stringify(currentUser));
        
        // Appliquer le thème si nécessaire
        applyTheme(preferences.theme);
        
        showNotification('Préférences enregistrées !', 'success');
    }
    
    function deleteAccount() {
        const userEmail = currentUser.email;
        
        // Supprimer l'utilisateur du localStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem(`user_${userEmail}`);
        
        // Supprimer les données associées
        const reminders = JSON.parse(localStorage.getItem('reminders')) || {};
        delete reminders[userEmail];
        localStorage.setItem('reminders', JSON.stringify(reminders));
        
        const quizResults = JSON.parse(localStorage.getItem('quizResults')) || {};
        delete quizResults[userEmail];
        localStorage.setItem('quizResults', JSON.stringify(quizResults));
        
        // Rediriger vers la page d'accueil
        window.location.href = 'index.html';
        
        showNotification('Compte supprimé avec succès.', 'info');
    }
    
    function checkPasswordStrength() {
        const password = newPasswordInput.value;
        let strength = 0;
        
        // Longueur
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Complexité
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        // Mettre à jour la barre de force
        let width = 0;
        let className = '';
        
        if (strength <= 2) {
            width = 33;
            className = 'strength-weak';
        } else if (strength <= 4) {
            width = 66;
            className = 'strength-medium';
        } else {
            width = 100;
            className = 'strength-strong';
        }
        
        passwordStrength.className = `strength-meter ${className}`;
        passwordStrength.style.width = `${width}%`;
    }
    
    function isPasswordStrong(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
    }
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        
        // Pour le thème auto, on pourrait détecter les préférences système
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }
    }
    
    function loadUserStats() {
        // Charger les statistiques des quiz
        const quizResults = JSON.parse(localStorage.getItem('quizResults')) || {};
        const userQuizResults = quizResults[currentUser.email] || [];
        document.getElementById('quizzesCompleted').textContent = userQuizResults.length;
        
        // Charger les statistiques des documents (simulation)
        const documents = JSON.parse(localStorage.getItem('documents')) || {};
        const userDocuments = documents[currentUser.email] || [];
        document.getElementById('documentsSaved').textContent = userDocuments.length;
        
        // Charger les statistiques des rappels
        const reminders = JSON.parse(localStorage.getItem('reminders')) || {};
        const userReminders = reminders[currentUser.email] || [];
        const activeReminders = userReminders.filter(r => r.status === 'upcoming').length;
        document.getElementById('activeReminders').textContent = activeReminders;
    }
});