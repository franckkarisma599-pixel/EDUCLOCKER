// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Vérifier si l'utilisateur est connecté pour certaines pages
    const currentUser = localStorage.getItem('currentUser');
    const protectedPages = ['dashboard.html', 'profile.html', 'documents.html', 'quiz.html', 'reminders.html'];
    
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !currentUser) {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        window.location.href = 'login.html';
    }
    
    // Afficher le nom de l'utilisateur connecté
    if (currentUser) {
        const user = JSON.parse(currentUser);
        const userElements = document.querySelectorAll('.user-name');
        
        userElements.forEach(element => {
            element.textContent = user.fullName;
        });
        
        // Ajouter le lien de déconnexion
        const navLinksContainer = document.querySelector('.nav-links');
        if (navLinksContainer && !document.querySelector('.logout-link')) {
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.className = 'logout-link';
            logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Déconnexion';
            logoutLink.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
            navLinksContainer.appendChild(logoutLink);
        }
    }
});

// Fonction pour afficher les notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Fermer la notification
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Ajouter des styles pour les notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-info {
        border-left: 4px solid #4361ee;
    }
    
    .notification-success {
        border-left: 4px solid #4bb543;
    }
    
    .notification-warning {
        border-left: 4px solid #ff9e00;
    }
    
    .notification-error {
        border-left: 4px solid #f72585;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        font-size: 1rem;
        margin-left: 15px;
    }
`;

document.head.appendChild(notificationStyles);