loginForm.addEventListener('submit', function(event) {
    if (validateForm(loginForm)) {
        const enseignantData = {
            nom: "Prof. Ahmed Ben Salah",
            departement: "Informatique",
            modules: "Algorithmique, Base de Données"
        };
        
        sessionStorage.setItem('enseignantData', JSON.stringify(enseignantData));
    }
});
loginForm.addEventListener('submit', function(event) {
    if (validateForm(loginForm)) {
        const enseignantData = {
            nom: "Prof. Ahmed Ben Salah",
            departement: "Informatique",
            modules: "Algorithmique, Base de Données"
        };
        
        sessionStorage.setItem('enseignantData', JSON.stringify(enseignantData));
    }
});