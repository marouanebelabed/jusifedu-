document.addEventListener('DOMContentLoaded', () => {
    // ... (code existant pour les infos utilisateur)
    
    // Charger les justifications en attente
    const justifications = JSON.parse(localStorage.getItem('justifications')) || [];
    const pendingJustifications = justifications.filter(j => j.statut === 'en_attente');
    
    const container = document.querySelector('.justifications-list');
    container.innerHTML = ''; // Vider le conteneur
    
    pendingJustifications.forEach((justif, index) => {
        const card = document.createElement('div');
        card.className = 'justification-card';
        card.innerHTML = `
            <div class="student-info">
                <div class="student-avatar">👨‍🎓</div>
                <div>
                    <h3>${justif.etudiant.nom}</h3>
                    <p>${justif.etudiant.niveau} - Matricule: ${justif.etudiant.matricule}</p>
                </div>
            </div>
            <div class="justification-details">
                <p><strong>Cours:</strong> ${justif.cours} - ${justif.date} (${justif.heure})</p>
                <p><strong>Motif:</strong> ${justif.motif}</p>
                <p><strong>Détails:</strong> ${justif.details}</p>
            </div>
            <div class="justification-actions">
                <button class="accept-btn" data-index="${index}">Accepter</button>
                <button class="reject-btn" data-index="${index}">Refuser</button>
                <button class="view-btn">Voir détails</button>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Gestion des boutons Accepter/Refuser
    document.querySelectorAll('.accept-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            updateJustificationStatus(this.dataset.index, 'acceptee');
        });
    });
    
    document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            updateJustificationStatus(this.dataset.index, 'refusee');
        });
    });
});

function updateJustificationStatus(index, status) {
    const justifications = JSON.parse(localStorage.getItem('justifications'));
    justifications[index].statut = status;
    localStorage.setItem('justifications', JSON.stringify(justifications));
    
    // Mettre à jour l'affichage
    window.location.reload();
}