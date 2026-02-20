// Gestion des rappels
document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const remindersList = document.getElementById('remindersList');
    const reminderForm = document.getElementById('reminderForm');
    const formTitle = document.getElementById('formTitle');
    const submitBtnText = document.getElementById('submitBtnText');
    const cancelBtn = document.getElementById('cancelBtn');
    const addReminderBtn = document.getElementById('addReminderBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const reminderTypeSelect = document.getElementById('reminderType');
    const whatsappGroup = document.getElementById('whatsappGroup');
    const generateWhatsAppBtn = document.getElementById('generateWhatsAppBtn');
    const whatsappLinkContainer = document.getElementById('whatsappLinkContainer');
    const whatsappLink = document.getElementById('whatsappLink');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    
    // Variables
    let currentFilter = 'all';
    let isEditing = false;
    let currentReminderId = null;
    
    // Initialiser la date à aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('reminderDate').value = today;
    
    // Initialiser l'heure à maintenant + 1 heure
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const timeString = now.toTimeString().slice(0, 5);
    document.getElementById('reminderTime').value = timeString;
    
    // Charger les rappels
    loadReminders();
    updateStats();
    
    // Gérer les filtres
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Appliquer le filtre
            currentFilter = this.dataset.filter;
            loadReminders();
        });
    });
    
    // Afficher/masquer le champ WhatsApp selon le type
    reminderTypeSelect.addEventListener('change', function() {
        const type = this.value;
        if (type === 'revision' || type === 'exam') {
            whatsappGroup.style.display = 'block';
        } else {
            whatsappGroup.style.display = 'none';
            document.getElementById('reminderWhatsApp').checked = false;
        }
    });
    
    // Ajouter un nouveau rappel
    addReminderBtn.addEventListener('click', function() {
        resetForm();
        isEditing = false;
        formTitle.textContent = 'Nouveau rappel';
        submitBtnText.textContent = 'Créer le rappel';
    });
    
    // Annuler l'édition
    cancelBtn.addEventListener('click', resetForm);
    
    // Soumettre le formulaire
    reminderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const reminderData = {
            id: isEditing ? currentReminderId : Date.now().toString(),
            title: document.getElementById('reminderTitle').value,
            description: document.getElementById('reminderDescription').value,
            type: document.getElementById('reminderType').value,
            date: document.getElementById('reminderDate').value,
            time: document.getElementById('reminderTime').value,
            priority: document.getElementById('reminderPriority').value,
            repeat: document.getElementById('reminderRepeat').value,
            notification: document.getElementById('reminderNotification').checked,
            whatsapp: document.getElementById('reminderWhatsApp').checked,
            status: 'upcoming',
            createdAt: new Date().toISOString(),
            completed: false
        };
        
        // Valider la date
        const reminderDateTime = new Date(`${reminderData.date}T${reminderData.time}`);
        if (reminderDateTime < new Date()) {
            alert('La date et l\'heure du rappel doivent être dans le futur !');
            return;
        }
        
        // Sauvegarder le rappel
        saveReminder(reminderData);
        
        // Réinitialiser le formulaire
        resetForm();
        
        // Recharger la liste
        loadReminders();
        updateStats();
        
        // Afficher une notification
        showNotification(`Rappel ${isEditing ? 'modifié' : 'créé'} avec succès !`, 'success');
    });
    
    // Générer un lien WhatsApp
    generateWhatsAppBtn.addEventListener('click', function() {
        const reminders = getReminders();
        const upcomingReminders = reminders.filter(r => r.status === 'upcoming');
        
        if (upcomingReminders.length === 0) {
            alert('Aucun rappel à venir à partager !');
            return;
        }
        
        // Créer le message WhatsApp
        let message = "Mes rappels d'étude :%0A%0A";
        
        upcomingReminders.forEach((reminder, index) => {
            const date = new Date(`${reminder.date}T${reminder.time}`);
            const formattedDate = date.toLocaleDateString('fr-FR');
            const formattedTime = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            
            message += `${index + 1}. ${reminder.title}%0A`;
            message += `📅 ${formattedDate} à ${formattedTime}%0A`;
            if (reminder.description) {
                message += `📝 ${reminder.description}%0A`;
            }
            message += `📚 Type: ${getTypeLabel(reminder.type)}%0A%0A`;
        });
        
        message += "Partagé via ÉtudiantPro 🎓";
        
        // Générer le lien WhatsApp
        const whatsappUrl = `https://wa.me/?text=${message}`;
        whatsappLink.value = whatsappUrl;
        whatsappLinkContainer.style.display = 'block';
    });
    
    // Copier le lien
    copyLinkBtn.addEventListener('click', function() {
        whatsappLink.select();
        document.execCommand('copy');
        showNotification('Lien copié dans le presse-papier !', 'success');
    });
    
    // Fonctions utilitaires
    function loadReminders() {
        const reminders = getReminders();
        
        // Filtrer les rappels
        let filteredReminders = reminders;
        
        if (currentFilter !== 'all') {
            if (currentFilter === 'upcoming' || currentFilter === 'completed' || currentFilter === 'missed') {
                filteredReminders = reminders.filter(r => r.status === currentFilter);
            } else {
                filteredReminders = reminders.filter(r => r.type === currentFilter);
            }
        }
        
        // Trier par date (les plus proches en premier)
        filteredReminders.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
        });
        
        // Afficher les rappels
        displayReminders(filteredReminders);
    }
    
    function displayReminders(reminders) {
        if (reminders.length === 0) {
            remindersList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bell-slash"></i>
                    <h3>Aucun rappel trouvé</h3>
                    <p>Créez votre premier rappel en cliquant sur "Ajouter un rappel"</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        
        reminders.forEach(reminder => {
            const date = new Date(`${reminder.date}T${reminder.time}`);
            const formattedDate = date.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            const formattedTime = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            
            // Déterminer l'icône selon le type
            let icon = 'fas fa-bell';
            if (reminder.type === 'revision') icon = 'fas fa-book';
            if (reminder.type === 'exam') icon = 'fas fa-graduation-cap';
            if (reminder.type === 'homework') icon = 'fas fa-tasks';
            if (reminder.type === 'meeting') icon = 'fas fa-users';
            
            // Déterminer le statut
            let statusClass = '';
            let statusText = '';
            
            if (reminder.status === 'upcoming') {
                statusClass = 'status-upcoming';
                statusText = 'À venir';
            } else if (reminder.status === 'completed') {
                statusClass = 'status-completed';
                statusText = 'Complété';
            } else {
                statusClass = 'status-missed';
                statusText = 'Manqué';
            }
            
            html += `
                <div class="reminder-item" data-id="${reminder.id}">
                    <div class="reminder-info">
                        <div class="reminder-title">
                            <i class="${icon}"></i>
                            ${reminder.title}
                            <span class="reminder-status ${statusClass}">${statusText}</span>
                        </div>
                        <div class="reminder-desc">${reminder.description || ''}</div>
                        <div class="reminder-meta">
                            <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                            <span><i class="fas fa-clock"></i> ${formattedTime}</span>
                            <span><i class="fas fa-tag"></i> ${getTypeLabel(reminder.type)}</span>
                            <span><i class="fas fa-flag"></i> ${getPriorityLabel(reminder.priority)}</span>
                        </div>
                    </div>
                    <div class="reminder-actions">
                        ${reminder.status === 'upcoming' ? `
                            <button class="action-btn complete-btn" title="Marquer comme complété">
                                <i class="fas fa-check"></i>
                            </button>
                        ` : ''}
                        <button class="action-btn edit-btn" title="Modifier">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" title="Supprimer">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        remindersList.innerHTML = html;
        
        // Ajouter les écouteurs d'événements
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const reminderId = this.closest('.reminder-item').dataset.id;
                markAsCompleted(reminderId);
            });
        });
        
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const reminderId = this.closest('.reminder-item').dataset.id;
                editReminder(reminderId);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const reminderId = this.closest('.reminder-item').dataset.id;
                deleteReminder(reminderId);
            });
        });
    }
    
    function editReminder(id) {
        const reminders = getReminders();
        const reminder = reminders.find(r => r.id === id);
        
        if (!reminder) return;
        
        // Remplir le formulaire
        document.getElementById('reminderId').value = reminder.id;
        document.getElementById('reminderTitle').value = reminder.title;
        document.getElementById('reminderDescription').value = reminder.description || '';
        document.getElementById('reminderType').value = reminder.type;
        document.getElementById('reminderDate').value = reminder.date;
        document.getElementById('reminderTime').value = reminder.time;
        document.getElementById('reminderPriority').value = reminder.priority;
        document.getElementById('reminderRepeat').value = reminder.repeat;
        document.getElementById('reminderNotification').checked = reminder.notification;
        document.getElementById('reminderWhatsApp').checked = reminder.whatsapp || false;
        
        // Afficher/masquer WhatsApp
        if (reminder.type === 'revision' || reminder.type === 'exam') {
            whatsappGroup.style.display = 'block';
        } else {
            whatsappGroup.style.display = 'none';
        }
        
        // Mettre à jour l'interface
        isEditing = true;
        currentReminderId = id;
        formTitle.textContent = 'Modifier le rappel';
        submitBtnText.textContent = 'Mettre à jour';
    }
    
    function markAsCompleted(id) {
        const reminders = getReminders();
        const reminderIndex = reminders.findIndex(r => r.id === id);
        
        if (reminderIndex === -1) return;
        
        reminders[reminderIndex].status = 'completed';
        reminders[reminderIndex].completed = true;
        
        saveAllReminders(reminders);
        loadReminders();
        updateStats();
        
        showNotification('Rappel marqué comme complété !', 'success');
    }
    
    function deleteReminder(id) {
        if (!confirm('Voulez-vous vraiment supprimer ce rappel ?')) {
            return;
        }
        
        const reminders = getReminders();
        const filteredReminders = reminders.filter(r => r.id !== id);
        
        saveAllReminders(filteredReminders);
        loadReminders();
        updateStats();
        
        showNotification('Rappel supprimé avec succès !', 'success');
    }
    
    function saveReminder(reminderData) {
        const reminders = getReminders();
        
        if (isEditing) {
            // Modifier un rappel existant
            const reminderIndex = reminders.findIndex(r => r.id === reminderData.id);
            if (reminderIndex !== -1) {
                reminders[reminderIndex] = reminderData;
            }
        } else {
            // Ajouter un nouveau rappel
            reminders.push(reminderData);
        }
        
        saveAllReminders(reminders);
    }
    
    function getReminders() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return [];
        
        const allReminders = JSON.parse(localStorage.getItem('reminders')) || {};
        return allReminders[currentUser.email] || [];
    }
    
    function saveAllReminders(reminders) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;
        
        const allReminders = JSON.parse(localStorage.getItem('reminders')) || {};
        allReminders[currentUser.email] = reminders;
        localStorage.setItem('reminders', JSON.stringify(allReminders));
    }
    
    function resetForm() {
        reminderForm.reset();
        isEditing = false;
        currentReminderId = null;
        
        // Réinitialiser les valeurs par défaut
        document.getElementById('reminderDate').value = today;
        document.getElementById('reminderTime').value = timeString;
        document.getElementById('reminderType').value = '';
        document.getElementById('reminderPriority').value = 'medium';
        document.getElementById('reminderRepeat').value = 'none';
        document.getElementById('reminderNotification').checked = false;
        document.getElementById('reminderWhatsApp').checked = false;
        whatsappGroup.style.display = 'none';
        
        // Mettre à jour l'interface
        formTitle.textContent = 'Nouveau rappel';
        submitBtnText.textContent = 'Créer le rappel';
    }
    
    function updateStats() {
        const reminders = getReminders();
        
        const upcomingCount = reminders.filter(r => r.status === 'upcoming').length;
        const completedCount = reminders.filter(r => r.status === 'completed').length;
        const missedCount = reminders.filter(r => r.status === 'missed').length;
        
        document.getElementById('upcomingCount').textContent = upcomingCount;
        document.getElementById('completedCount').textContent = completedCount;
        document.getElementById('missedCount').textContent = missedCount;
    }
    
    function getTypeLabel(type) {
        const types = {
            'revision': 'Révision',
            'exam': 'Examen',
            'homework': 'Devoir',
            'meeting': 'Réunion',
            'other': 'Autre'
        };
        return types[type] || 'Autre';
    }
    
    function getPriorityLabel(priority) {
        const priorities = {
            'low': 'Basse',
            'medium': 'Moyenne',
            'high': 'Haute'
        };
        return priorities[priority] || 'Moyenne';
    }
    
    // Vérifier les rappels passés (à exécuter périodiquement)
    function checkPastReminders() {
        const reminders = getReminders();
        const now = new Date();
        let updated = false;
        
        reminders.forEach(reminder => {
            if (reminder.status === 'upcoming' && !reminder.completed) {
                const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
                
                if (reminderDateTime < now) {
                    reminder.status = 'missed';
                    updated = true;
                }
            }
        });
        
        if (updated) {
            saveAllReminders(reminders);
            loadReminders();
            updateStats();
        }
    }
    
    // Vérifier les rappels toutes les minutes
    setInterval(checkPastReminders, 60000);
    
    // Vérifier maintenant aussi
    checkPastReminders();
});