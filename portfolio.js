// Animation simplifiée pour les sections
document.addEventListener('DOMContentLoaded', () => {
    // Animation au défilement pour tous les éléments de carte
    function animateOnScroll() {
        const elements = document.querySelectorAll('.competence-card, .projet-card, .stage-card, .veille-card, .career-card, .option-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Si l'élément est dans la fenêtre visible (avec une marge)
            if (elementPosition < windowHeight - 100) {
                element.classList.add('apparition');
            }
        });
    }
    
    // Exécuter l'animation au chargement initial
    animateOnScroll();
    
    // Puis sur le défilement
    window.addEventListener('scroll', animateOnScroll);
    
    // Bouton de retour en haut
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animation des liens de navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Compensation pour le header fixe
                    behavior: 'smooth'
                });
            }
            
            // Mettre à jour le lien actif
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Mise à jour automatique du lien actif au défilement
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initialiser au chargement
});