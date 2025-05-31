document.getElementById('justification-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userData = JSON.parse(sessionStorage.getItem('etudiantData'));
    const formData = {
        etudiant: userData,
        cours: document.getElementById('course').value,
        date: document.getElementById('date').value,
        heure: document.getElementById('time').value,
        motif: document.getElementById('reason').value,
        details: document.getElementById('details').value,
        statut: 'en_attente'
    };
    
    // Récupérer ou initialiser le tableau de justifications
    let justifications = JSON.parse(localStorage.getItem('justifications')) || [];
    justifications.push(formData);
    localStorage.setItem('justifications', JSON.stringify(justifications));
    
    alert('Justification soumise avec succès!');
    window.location.href = 'p6.html';
});
