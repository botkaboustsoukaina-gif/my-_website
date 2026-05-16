// ============================================
// ZONESPORT — script.js
// Fichier JavaScript commun aux 3 pages HTML
// ============================================

// ============================================
// 1. PANIER — Ajouter un produit au panier
// Utilisé dans produits.html via les boutons
// ============================================

/**
 * Affiche une notification temporaire quand l'utilisateur
 * clique sur "Ajouter au panier"
 * @param {string} nomProduit - Le nom du produit ajouté
 */
function ajouterPanier(nomProduit) {
  // Crée une notification flottante
  const notif = document.createElement('div');

  // Style de la notification (toast)
  notif.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #111;
    color: #fff;
    padding: 14px 24px;
    border-radius: 8px;
    font-family: Inter, Arial, sans-serif;
    font-size: 0.95rem;
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
    z-index: 9999;
    animation: slideIn 0.3s ease;
    border-left: 4px solid #e63946;
  `;

  // Message affiché dans la notification
  notif.textContent = `✓ "${nomProduit}" ajouté au panier !`;

  // Ajoute la notification au bas de la page
  document.body.appendChild(notif);

  // Supprime la notification après 2.5 secondes
  setTimeout(() => {
    notif.style.opacity = '0';
    notif.style.transition = 'opacity 0.4s';
    setTimeout(() => document.body.removeChild(notif), 400);
  }, 2500);
}


// ============================================
// 2. FORMULAIRE DE CONTACT — Validation
// Utilisé dans contact.html
// ============================================

/**
 * Valide et simule l'envoi du formulaire de contact
 * @param {Event} event - L'événement de soumission du formulaire
 */
function envoyerMessage(event) {
  // Empêche le rechargement de la page (comportement par défaut du formulaire)
  event.preventDefault();

  // Récupération des valeurs des champs
  const nom     = document.getElementById('nom').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Zone d'affichage du message de retour
  const retour  = document.getElementById('messageRetour');

  // ---------- Validation des champs ----------

  // Vérifie que tous les champs sont remplis
  if (!nom || !email || !message) {
    retour.style.color = '#e63946';
    retour.textContent = '⚠️ Veuillez remplir tous les champs obligatoires.';
    return; // Arrête l'exécution si un champ est vide
  }

  // Vérifie le format de l'email avec une expression régulière simple
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    retour.style.color = '#e63946';
    retour.textContent = '⚠️ Veuillez entrer une adresse email valide.';
    return;
  }

  // ---------- Simulation de l'envoi réussi ----------
  retour.style.color = '#2a9d2a';
  retour.textContent = `✓ Merci ${nom} ! Votre message a bien été envoyé.`;

  // Vide le formulaire après envoi
  document.getElementById('formulaireContact').reset();
}

/**
 * Réinitialise le formulaire de contact
 * (appelé par le bouton "Annuler")
 */
function annulerFormulaire() {
  // Récupère le formulaire et le vide
  const form = document.getElementById('formulaireContact');
  if (form) {
    form.reset();
  }

  // Efface aussi le message de retour s'il existe
  const retour = document.getElementById('messageRetour');
  if (retour) {
    retour.textContent = '';
  }
}


// ============================================
// 3. ANIMATION CSS — Injection de keyframes
// Pour la notification "toast" du panier
// ============================================

// Ajoute l'animation CSS directement via JavaScript
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);


// ============================================
// 4. NAVIGATION ACTIVE — Mise en évidence
// du lien de la page courante dans le menu
// ============================================

// Récupère tous les liens du menu <nav>
const liensNav = document.querySelectorAll('nav a');

// Pour chaque lien, compare son href avec l'URL actuelle
liensNav.forEach(lien => {
  // Récupère juste le nom du fichier (ex: "produits.html")
  const href = lien.getAttribute('href');

  // Si le lien correspond à la page actuelle → on le met en évidence
  if (window.location.pathname.endsWith(href)) {
    lien.style.color = '#e63946';         // Rouge accent
    lien.style.borderBottom = '2px solid #e63946';
    lien.style.paddingBottom = '4px';
  }
});
