// p5.js - Script pour la page d'authentification Administration 

document.addEventListener('DOMContentLoaded', () => {
    console.log("Script p5.js chargé pour la page d'authentification Administration.");

    // Note: The original p5.html provided does not have tabs for login/register.
    // If you add a registration form for admins later, you can uncomment and use
    // the switchTab function and adjust form IDs accordingly.
    /*
    window.switchTab = function(tab) {
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const loginFormContainer = document.getElementById('login-form');
        const registerFormContainer = document.getElementById('register-form');

        if (tab === 'login') {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginFormContainer.style.display = 'block';
            registerFormContainer.style.display = 'none';
        } else {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerFormContainer.style.display = 'block';
            loginFormContainer.style.display = 'none';
        }
    };
    */

    const loginForm = document.querySelector('.form-container form'); // Select the form within the form-container
    // const registerForm = document.getElementById('register-form') ? document.getElementById('register-form').querySelector('form') : null;

    // --- Validation de formulaire côté client ---
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required]');

        inputs.forEach(input => {
            // Réinitialiser le style d'erreur
            input.style.borderColor = '#ddd';

            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
                console.error(`Champ requis vide: ${input.id}`);
            }

            // Validation spécifique pour l'email (si applicable pour l'admin)
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.style.borderColor = 'red';
                    console.error(`Format d'email invalide: ${input.id}`);
                }
            }
        });

        // Validation de la correspondance des mots de passe pour l'inscription (si un formulaire d'inscription est ajouté)
        /*
        if (form.id === 'register-form') {
            const password = document.getElementById('register-password');
            const confirmPassword = document.getElementById('register-confirm-password');

            if (password && confirmPassword && password.value !== confirmPassword.value) {
                isValid = false;
                confirmPassword.style.borderColor = 'red';
                showCustomAlert('Les mots de passe ne correspondent pas.');
                console.error('Les mots de passe ne correspondent pas.');
            }
        }
        */

        // Validation spécifique pour le code de sécurité de l'administrateur
        const adminCodeInput = document.getElementById('admin-code');
        if (adminCodeInput && adminCodeInput.value.length !== 6) {
            isValid = false;
            adminCodeInput.style.borderColor = 'red';
            showCustomAlert('Le code de sécurité doit contenir 6 chiffres.');
            console.error('Code de sécurité invalide: doit contenir 6 chiffres.');
        }

        return isValid;
    }

    // Écouteur d'événement pour la soumission du formulaire de connexion
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            if (!validateForm(loginForm)) {
                event.preventDefault(); // Empêche la soumission du formulaire si invalide
                showCustomAlert('Veuillez remplir tous les champs obligatoires et corriger les erreurs pour la connexion.');
            } else {
                console.log('Formulaire de connexion admin soumis avec succès (validation client OK).');
            }
        });
    }

    // Écouteur d'événement pour la soumission du formulaire d'inscription (si un formulaire est ajouté)
    /*
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            if (!validateForm(registerForm)) {
                event.preventDefault(); // Empêche la soumission du formulaire si invalide
                showCustomAlert('Veuillez remplir tous les champs obligatoires et corriger les erreurs pour l\'inscription.');
            } else {
                console.log('Formulaire d\'inscription admin soumis avec succès (validation client OK).');
            }
        });
    }
    */

    // --- Basculement de la visibilité du mot de passe ---
    function setupPasswordToggle(passwordInputId) {
        const passwordInput = document.getElementById(passwordInputId);
        if (passwordInput) {
            const togglePassword = document.createElement('span');
            togglePassword.innerHTML = '👁️'; // Icône œil
            togglePassword.style.cssText = `
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
                font-size: 1.2rem;
                color: #666;
            `;

            const parent = passwordInput.parentNode;
            if (parent) {
                parent.style.position = 'relative';
                parent.appendChild(togglePassword);
            }

            togglePassword.addEventListener('click', function() {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    togglePassword.innerHTML = '🙈'; // Icône œil barré
                } else {
                    passwordInput.type = 'password';
                    togglePassword.innerHTML = '👁️';
                }
            });
        }
    }

    // Appliquer le basculement de mot de passe aux champs concernés
    setupPasswordToggle('admin-password');
    setupPasswordToggle('admin-code'); // Appliquer aussi au code de sécurité
    // setupPasswordToggle('register-password'); // Uncomment if registration form is added
    // setupPasswordToggle('register-confirm-password'); // Uncomment if registration form is added


    // Fonction pour afficher une boîte de dialogue d'alerte personnalisée
    function showCustomAlert(message) {
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
            max-width: 350px;
            width: 90%;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        messageParagraph.style.marginBottom = '20px';
        messageParagraph.style.fontSize = '1.1rem';
        messageParagraph.style.color = '#333';

        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.style.cssText = `
            background: linear-gradient(135deg, #2c8d61, #1a5c3d);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        `;
        okButton.addEventListener('click', () => {
            modalOverlay.remove();
        });
        okButton.addEventListener('mouseover', () => okButton.style.transform = 'translateY(-2px)');
        okButton.addEventListener('mouseout', () => okButton.style.transform = 'translateY(0)');

        modalContent.appendChild(messageParagraph);
        modalContent.appendChild(okButton);
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
    }
});
