// p1.js - Script pour la page d'introduction (index.html)

document.addEventListener('DOMContentLoaded', () => {
    // Message de bienvenue dans la console du navigateur
    console.log("Bienvenue sur la page d'accueil de JustifEdu !");

    // Optionnel: Animation simple pour le titre au chargement de la page
    const headerTitle = document.querySelector('.header h1');
    if (headerTitle) {
        headerTitle.style.opacity = 0;
        headerTitle.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            headerTitle.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            headerTitle.style.opacity = 1;
            headerTitle.style.transform = 'translateY(0)';
        }, 500); // Délai avant l'animation
    }

    // Optionnel: Ajouter un écouteur d'événement pour le bouton "Commencer"
    const startButton = document.querySelector('.start-btn');
    if (startButton) {
        startButton.addEventListener('click', (event) => {
            // Empêche le comportement par défaut du lien pour pouvoir ajouter une logique
            // event.preventDefault();
            console.log("Bouton 'Commencer' cliqué ! Redirection vers la sélection de rôle...");
            // La redirection se fera via l'attribut href du lien, pas besoin de JS ici
        });
    }
});
