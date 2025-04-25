document.addEventListener('DOMContentLoaded', function () {
  // Récupération des éléments du DOM
  const zoomRange = document.getElementById('zoom-range'); // Le curseur de zoom
  const zoomValue = document.getElementById('zoom-value'); // Affichage de la valeur de zoom
  const body = document.body; // le corps de la page
  const closeButton = document.getElementById('close-options'); // Bouton pour fermer les options d'accessibilité
  const modeRadios = document.querySelectorAll('input[name="mode"]'); // Radios pour le mode d'affichage
  const daltonienOptions = document.getElementById('daltonien-options'); // Options de daltonisme
  const noirEtBlanc = document.getElementById('mode-grayscale'); // Option pour le mode noir et blanc
  const container = document.querySelector(".code-cards-container"); // Conteneur des cartes à code

  let scrollAmount = 0; // Variable pour gérer le défilement automatique
  const scrollSpeed = 0.2; // Vitesse de défilement

  // Fonction de défilement automatique des cartes
  function autoScroll() {
    if (scrollAmount < container.scrollWidth - container.clientWidth) {
      scrollAmount += scrollSpeed;
      container.scrollLeft = scrollAmount; // Défilement horizontal
    } else {
      scrollAmount = 0; // Réinitialise quand on atteint la fin
    }
  }

  // Appel de la fonction de défilement toutes les 30ms
  setInterval(autoScroll, 30);

  // Fermeture des options d'accessibilité lorsque le bouton est cliqué
  document.getElementById('close-accessibility').addEventListener('click', function() {
    document.querySelector('.accessibility-controls').style.display = 'none';
  });

  // Gestion de l'affichage des options de mode (mode daltonien)
  modeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'daltonien') {
        daltonienOptions.style.display = 'block'; // Affiche les options daltonien
      } else {
        daltonienOptions.style.display = 'none'; // Cache les options daltonien
      }
    });
  });

  // Fonction pour gérer le zoom
  zoomRange.addEventListener('input', function () {
    const zoomFactor = zoomRange.value; // Récupère la valeur du curseur
    zoomValue.textContent = zoomFactor + 'x'; // Affiche le facteur de zoom
    body.style.fontSize = zoomFactor + 'em'; // Modifie la taille de la police du corps
  });

  // Gestion des différents modes d'affichage (normal, grayscale, daltonien)
  const modeNormal = document.getElementById('mode-normal');
  const modeGrayscale = document.getElementById('mode-grayscale');
  const modeDaltonien = document.getElementById('mode-daltonien');

  // Mode normal : enlève tous les filtres
  modeNormal.addEventListener('change', function () {
    if (modeNormal.checked) {
      body.classList.remove('grayscale-mode', 'daltonien-deuteranopie', 'daltonien-protanopie', 'daltonien-tritanopie');
    }
  });

  // Mode grayscale : ajoute le filtre noir et blanc
  modeGrayscale.addEventListener('change', function () {
    if (modeGrayscale.checked) {
      body.classList.add('grayscale-mode');
      body.classList.remove('daltonien-deuteranopie', 'daltonien-protanopie', 'daltonien-tritanopie');
    }
  });

  // Mode daltonien : désactive le grayscale et affiche les options
  modeDaltonien.addEventListener('change', function () {
    if (modeDaltonien.checked) {
      body.classList.remove('grayscale-mode');
      noirEtBlanc.checked = false; // Désactive l'option noir et blanc
      daltonienOptions.style.display = 'block'; // Affiche les options de daltonien
    }
  });

  // Gestion des sous-options pour chaque type de daltonisme
  const deuteranopie = document.getElementById('deuteranopie');
  const protanopie = document.getElementById('protanopie');
  const tritanopie = document.getElementById('tritanopie');

  // Deuteranopie : daltonisme vert-rouge
  deuteranopie.addEventListener('change', function () {
    if (deuteranopie.checked) {
      body.classList.add('daltonien-deuteranopie');
      body.classList.remove('daltonien-protanopie', 'daltonien-tritanopie');
    }
  });

  // Protanopie : daltonisme rouge-vert
  protanopie.addEventListener('change', function () {
    if (protanopie.checked) {
      body.classList.add('daltonien-protanopie');
      body.classList.remove('daltonien-deuteranopie', 'daltonien-tritanopie');
    }
  });

  // Tritanopie : daltonisme bleu-jaune
  tritanopie.addEventListener('change', function () {
    if (tritanopie.checked) {
      body.classList.add('daltonien-tritanopie');
      body.classList.remove('daltonien-deuteranopie', 'daltonien-protanopie');
    }
  });

  // Fonction pour fermer les options d'accessibilité
  closeButton.addEventListener('click', function () {
    const accessibilityOptions = document.getElementById('accessibility-options');
    accessibilityOptions.style.display = 'none'; // Cache le conteneur des options d'accessibilité
  });
});

document.getElementById('font-select').addEventListener('change', function () {
  const selectedFont = this.value;
  document.body.classList.remove('font-atkinson', 'font-dyslexic');
  if (selectedFont === 'atkinson') {
    document.body.classList.add('font-atkinson');
  } else if (selectedFont === 'dyslexic') {
    document.body.classList.add('font-dyslexic');
  }
});

// Mes réussites : bien que cela n'était pas attendu dans la consigne, j'ai réalisé un script Javascript afin d'appliquer les différentes options d'accessibilité que j'avais établi dans mes codes CSS et HTML, je trouve que le résultat est plutôt bluffant, ce script fonctionne bien
// Mes échecs : en inspectant le code de ma page, je tombe sur l'erreur suivante que je ne comprends pas " Uncaught TypeError: Cannot read properties of null (reading 'addEventListener') at HTMLDocument.<anonymous> (script.js:110:15)"  
