// p2.js - Script pour la page de sélection de rôle

document.addEventListener('DOMContentLoaded', () => {
    const roleCards = document.querySelectorAll('.role-card');

    roleCards.forEach(card => {
        // Ajout d'un effet visuel au survol (peut être géré par CSS, mais ici pour l'exemple JS)
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 15px 30px rgba(44, 141, 97, 0.2)';
        });

        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.05)';
        });

        // Ajout d'une boîte de dialogue de confirmation avant la redirection
        card.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche la redirection immédiate du lien

            const targetURL = card.getAttribute('href');
            const roleTitle = card.querySelector('.role-title').textContent;

            // Utilisation d'une boîte de dialogue personnalisée au lieu de confirm()
            // Pour cela, nous allons créer une fonction simple pour afficher un message modal
            showCustomConfirm(`Êtes-vous sûr de vouloir continuer en tant que ${roleTitle} ?`, () => {
                window.location.href = targetURL; // Redirige si l'utilisateur confirme
            });
        });
    });

    // Fonction pour afficher une boîte de dialogue de confirmation personnalisée
    function showCustomConfirm(message, onConfirm) {
        // Créer les éléments de la modal
        const modalOverlay = document.createElement('div');
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            text-align: center;
            max-width: 400px;
            width: 90%;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        messageParagraph.style.marginBottom = '20px';
        messageParagraph.style.fontSize = '1.1rem';
        messageParagraph.style.color = '#333';

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'space-around';

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirmer';
        confirmButton.style.cssText = `
            background: linear-gradient(135deg, #2c8d61, #1a5c3d);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        `;
        confirmButton.addEventListener('click', () => {
            onConfirm();
            modalOverlay.remove();
        });
        confirmButton.addEventListener('mouseover', () => confirmButton.style.transform = 'translateY(-2px)');
        confirmButton.addEventListener('mouseout', () => confirmButton.style.transform = 'translateY(0)');

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Annuler';
        cancelButton.style.cssText = `
            background: #ccc;
            color: #333;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        `;
        cancelButton.addEventListener('click', () => {
            modalOverlay.remove();
        });
        cancelButton.addEventListener('mouseover', () => cancelButton.style.background = '#bbb');
        cancelButton.addEventListener('mouseout', () => cancelButton.style.background = '#ccc');

        buttonContainer.appendChild(confirmButton);
        buttonContainer.appendChild(cancelButton);
        modalContent.appendChild(messageParagraph);
        modalContent.appendChild(buttonContainer);
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
    }
});
