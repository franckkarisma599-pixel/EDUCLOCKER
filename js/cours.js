// Gestion des cours - Éditeur intégré
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser l'éditeur Quill
    const quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link', 'image', 'video', 'formula'],
                ['clean']
            ]
        },
        placeholder: 'Commencez à écrire votre cours ici... Vous pouvez ajouter des titres, des listes, des images, des liens, etc.',
    });
    
    // Éléments DOM
    const newCoursBtn = document.getElementById('newCoursBtn');
    const firstCoursBtn = document.getElementById('firstCoursBtn');
    const saveCoursBtn = document.getElementById('saveCoursBtn');
    const cancelCoursBtn = document.getElementById('cancelCoursBtn');
    const coursTitle = document.getElementById('coursTitle');
    const coursMatiere = document.getElementById('coursMatiere');
    const favoriteBtn = document.getElementById('favoriteBtn');
    const shareWhatsAppBtn = document.getElementById('shareWhatsAppBtn');
    const coursList = document.getElementById('coursList');
    const searchCours = document.getElementById('searchCours');
    const matiereTags = document.querySelectorAll('.matiere-tag');
    
    // Éléments de comptage
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lastModified = document.getElementById('lastModified');
    
    // Éléments de statistiques
    const totalCours = document.getElementById('totalCours');
    const recentCours = document.getElementById('recentCours');
    const favoritesCours = document.getElementById('favoritesCours');
    const sharedCours = document.getElementById('sharedCours');
    
    // Variables
    let cours = [];
    let currentCoursId = null;
    let currentMatiere = 'all';
    let searchQuery = '';
    let autoSaveInterval = null;
    
    // Initialisation
    loadCours();
    updateStats();
    
    // Événements
    newCoursBtn.addEventListener('click', createNewCours);
    firstCoursBtn.addEventListener('click', createNewCours);
    saveCoursBtn.addEventListener('click', saveCurrentCours);
    cancelCoursBtn.addEventListener('click', cancelEdit);
    
    // Recherche
    searchCours.addEventListener('input', function() {
        searchQuery = this.value.toLowerCase();
        displayCoursList();
    });
    
    // Filtres par matière
    matiereTags.forEach(tag => {
        tag.addEventListener('click', function() {
            matiereTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentMatiere = this.dataset.matiere;
            displayCoursList();
        });
    });
    
    // Compteur de caractères/mots
    quill.on('text-change', function() {
        updateCounters();
        autoSave();
    });
    
    // Modification du titre
    coursTitle.addEventListener('input', function() {
        autoSave();
    });
    
    // Modification de la matière
    coursMatiere.addEventListener('change', function() {
        autoSave();
    });
    
    // Favori
    favoriteBtn.addEventListener('click', function() {
        const isFavorite = this.querySelector('i').classList.contains('fas');
        if (isFavorite) {
            this.querySelector('i').className = 'far fa-star';
            this.title = 'Ajouter aux favoris';
        } else {
            this.querySelector('i').className = 'fas fa-star';
            this.title = 'Retirer des favoris';
        }
        autoSave();
    });
    
    // Partage WhatsApp
    shareWhatsAppBtn.addEventListener('click', shareCoursViaWhatsApp);
    
    // Fonctions
    function loadCours() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;
        
        const allCours = JSON.parse(localStorage.getItem('cours')) || {};
        cours = allCours[currentUser.email] || [];
        
        // Si pas de cours, créer un exemple
        if (cours.length === 0) {
            createExampleCours();
        } else {
            // Trier par date de modification (plus récents d'abord)
            cours.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
            
            // Afficher le premier cours par défaut
            if (cours.length > 0) {
                loadCoursIntoEditor(cours[0]);
            }
        }
        
        displayCoursList();
    }
    
    function createExampleCours() {
        const exampleCours = {
            id: Date.now(),
            title: 'Mon premier cours',
            matiere: 'math',
            content: '<h1>Bienvenue dans votre espace cours !</h1><p>Ici vous pouvez :</p><ul><li><strong>Prendre des notes</strong> de vos cours</li><li><strong>Organiser</strong> par matière</li><li><strong>Mettre en forme</strong> votre texte</li><li><strong>Partager</strong> via WhatsApp</li><li><strong>Marquer</strong> comme favori</li></ul><p>Commencez par modifier ce cours ou créez-en un nouveau !</p>',
            favorite: false,
            shared: false,
            created: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            charCount: 250,
            wordCount: 45
        };
        
        cours.push(exampleCours);
        saveAllCours();
        loadCoursIntoEditor(exampleCours);
    }
    
    function createNewCours() {
        const newCours = {
            id: Date.now(),
            title: 'Nouveau cours',
            matiere: '',
            content: '',
            favorite: false,
            shared: false,
            created: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            charCount: 0,
            wordCount: 0
        };
        
        cours.unshift(newCours); // Ajouter au début
        saveAllCours();
        loadCoursIntoEditor(newCours);
        displayCoursList();
        updateStats();
        
        // Focus sur le titre
        setTimeout(() => {
            coursTitle.focus();
            coursTitle.select();
        }, 100);
    }
    
    function loadCoursIntoEditor(coursItem) {
        currentCoursId = coursItem.id;
        
        // Mettre à jour le formulaire
        coursTitle.value = coursItem.title || '';
        coursMatiere.value = coursItem.matiere || '';
        
        // Mettre à jour le bouton favori
        const favoriteIcon = favoriteBtn.querySelector('i');
        if (coursItem.favorite) {
            favoriteIcon.className = 'fas fa-star';
            favoriteBtn.title = 'Retirer des favoris';
        } else {
            favoriteIcon.className = 'far fa-star';
            favoriteBtn.title = 'Ajouter aux favoris';
        }
        
        // Mettre à jour l'éditeur
        quill.setContents(quill.clipboard.convert(coursItem.content || ''));
        
        // Mettre à jour les compteurs
        updateCounters();
        
        // Mettre à jour la date de modification
        const date = new Date(coursItem.lastModified);
        lastModified.textContent = date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        
        // Marquer comme actif dans la liste
        document.querySelectorAll('.cours-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.id == coursItem.id) {
                item.classList.add('active');
            }
        });
    }
    
    function saveCurrentCours() {
        if (!currentCoursId) return;
        
        const coursIndex = cours.findIndex(c => c.id == currentCoursId);
        if (coursIndex === -1) return;
        
        // Récupérer le contenu HTML de l'éditeur
        const content = quill.root.innerHTML;
        const plainText = quill.getText();
        
        // Compter les caractères et mots
        const charCountValue = plainText.length;
        const wordCountValue = plainText.trim().split(/\s+/).filter(word => word.length > 0).length;
        
        // Mettre à jour le cours
        cours[coursIndex] = {
            ...cours[coursIndex],
            title: coursTitle.value || 'Sans titre',
            matiere: coursMatiere.value || '',
            content: content,
            favorite: favoriteBtn.querySelector('i').classList.contains('fas'),
            lastModified: new Date().toISOString(),
            charCount: charCountValue,
            wordCount: wordCountValue
        };
        
        // Sauvegarder
        saveAllCours();
        displayCoursList();
        updateStats();
        updateCounters();
        
        showNotification('Cours enregistré avec succès !', 'success');
    }
    
    function autoSave() {
        // Effacer le timer précédent
        if (autoSaveInterval) {
            clearTimeout(autoSaveInterval);
        }
        
        // Déclencher un nouvel auto-save après 5 secondes d'inactivité
        autoSaveInterval = setTimeout(() => {
            if (currentCoursId) {
                saveCurrentCours();
                // Mettre à jour la date de modification affichée
                lastModified.textContent = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            }
        }, 5000);
    }
    
    function cancelEdit() {
        if (!currentCoursId) return;
        
        const coursItem = cours.find(c => c.id == currentCoursId);
        if (coursItem) {
            loadCoursIntoEditor(coursItem);
        }
        
        showNotification('Modifications annulées', 'info');
    }
    
    function saveAllCours() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;
        
        const allCours = JSON.parse(localStorage.getItem('cours')) || {};
        allCours[currentUser.email] = cours;
        localStorage.setItem('cours', JSON.stringify(allCours));
    }
    
    function displayCoursList() {
        if (cours.length === 0) {
            coursList.innerHTML = `
                <div class="empty-cours">
                    <i class="fas fa-book-open"></i>
                    <p>Aucun cours enregistré</p>
                    <button class="btn-secondary" id="firstCoursBtn" style="margin-top: 15px;">
                        Créer mon premier cours
                    </button>
                </div>
            `;
            
            // Ré-attacher l'événement
            document.getElementById('firstCoursBtn')?.addEventListener('click', createNewCours);
            return;
        }
        
        // Filtrer les cours
        let filteredCours = cours;
        
        // Par matière
        if (currentMatiere !== 'all') {
            filteredCours = filteredCours.filter(c => c.matiere === currentMatiere);
        }
        
        // Par recherche
        if (searchQuery) {
            filteredCours = filteredCours.filter(c => 
                c.title.toLowerCase().includes(searchQuery) || 
                getMatiereName(c.matiere).toLowerCase().includes(searchQuery)
            );
        }
        
        if (filteredCours.length === 0) {
            coursList.innerHTML = `
                <div class="empty-cours">
                    <i class="fas fa-search"></i>
                    <p>Aucun cours trouvé</p>
                    <button class="btn-secondary" onclick="currentMatiere='all'; searchCours.value=''; displayCoursList();" style="margin-top: 15px;">
                        Réinitialiser les filtres
                    </button>
                </div>
            `;
            return;
        }
        
        // Afficher la liste
        let html = '';
        
        filteredCours.forEach(coursItem => {
            const date = new Date(coursItem.lastModified);
            const dateFormatted = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
            const isActive = coursItem.id == currentCoursId;
            
            html += `
                <div class="cours-item ${isActive ? 'active' : ''}" data-id="${coursItem.id}">
                    <div class="cours-item-title">
                        <span>${coursItem.title || 'Sans titre'}</span>
                        ${coursItem.favorite ? '<i class="fas fa-star" style="color: #ffc107;"></i>' : ''}
                    </div>
                    <div class="cours-item-meta">
                        <span>${getMatiereName(coursItem.matiere)}</span>
                        <span>${dateFormatted}</span>
                    </div>
                </div>
            `;
        });
        
        coursList.innerHTML = html;
        
        // Ajouter les écouteurs d'événements
        document.querySelectorAll('.cours-item').forEach(item => {
            item.addEventListener('click', function() {
                const coursId = this.dataset.id;
                const coursItem = cours.find(c => c.id == coursId);
                if (coursItem) {
                    loadCoursIntoEditor(coursItem);
                }
            });
        });
    }
    
    function updateCounters() {
        const text = quill.getText();
        const charCountValue = text.length;
        const wordCountValue = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        
        charCount.textContent = charCountValue.toLocaleString('fr-FR');
        wordCount.textContent = wordCountValue.toLocaleString('fr-FR');
    }
    
    function shareCoursViaWhatsApp() {
        if (!currentCoursId) {
            showNotification('Aucun cours à partager', 'warning');
            return;
        }
        
        const coursItem = cours.find(c => c.id == currentCoursId);
        if (!coursItem) return;
        
        // Récupérer le texte brut (sans HTML)
        const plainText = quill.getText().substring(0, 500) + (quill.getText().length > 500 ? '...' : '');
        
        // Créer le message
        const message = `📚 ${coursItem.title}%0A%0A`;
        const matiereInfo = `📖 Matière: ${getMatiereName(coursItem.matiere)}%0A`;
        const dateInfo = `📅 Dernière modification: ${new Date(coursItem.lastModified).toLocaleDateString('fr-FR')}%0A`;
        const contentPreview = `📝 Extrait:%0A${plainText.replace(/\n/g, '%0A')}%0A%0A`;
        const finalMessage = `🔗 Lien vers le cours: ${window.location.origin}/cours.html#${coursItem.id}%0A%0A`;
        const signature = `Partagé via ÉtudiantPro 🎓`;
        
        const fullMessage = message + matiereInfo + dateInfo + contentPreview + finalMessage + signature;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
        
        // Ouvrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Marquer comme partagé
        const coursIndex = cours.findIndex(c => c.id == currentCoursId);
        if (coursIndex !== -1) {
            cours[coursIndex].shared = true;
            saveAllCours();
            updateStats();
        }
        
        showNotification('Cours partagé sur WhatsApp !', 'success');
    }
    
    function updateStats() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;
        
        const allCours = JSON.parse(localStorage.getItem('cours')) || {};
        const userCours = allCours[currentUser.email] || [];
        
        // Total
        totalCours.textContent = userCours.length;
        
        // Récents (7 derniers jours)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const recent = userCours.filter(c => new Date(c.lastModified) > oneWeekAgo);
        recentCours.textContent = recent.length;
        
        // Favoris
        const favorites = userCours.filter(c => c.favorite);
        favoritesCours.textContent = favorites.length;
        
        // Partagés
        const shared = userCours.filter(c => c.shared);
        sharedCours.textContent = shared.length;
    }
    
    function getMatiereName(matiereCode) {
        const matieres = {
            'math': 'Mathématiques',
            'physique': 'Physique',
            'chimie': 'Chimie',
            'biologie': 'Biologie',
            'histoire': 'Histoire',
            'francais': 'Français',
            'anglais': 'Anglais',
            'informatique': 'Informatique',
            'autre': 'Autre'
        };
        return matieres[matiereCode] || 'Non spécifiée';
    }
    
    // Exporter la fonction pour l'utiliser dans l'HTML
    window.createNewCours = createNewCours;
});