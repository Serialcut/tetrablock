// Appel de la fonction particlesJS sur l'élément ayant l'ID "particles-js"
particlesJS("particles-js", {
  particles: {
    // Définition des paramètres concernant le nombre de particules
    number: {
      value: 88, // Le nombre de particules à afficher
      density: {
        enable: true, // Activation de la densité de particules
        value_area: 700, // Définition de la zone de valeur pour la densité de particules
      },
    },
    // Définition de la couleur des particules
    color: {
      value: ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"], // La couleur des particules en hexadécimal
    },
    // Définition de la forme des particules
    shape: {
      type: "circle", // La forme des particules, ici un cercle
      // Définition du contour des particules
      stroke: {
        width: 0, // L'épaisseur du contour des particules
        color: "#000000", // La couleur du contour des particules en hexadécimal
      },
      // Les paramètres du polygone, utilisés lorsque la forme est un polygone
      polygon: {
        nb_sides: 15, // Le nombre de côtés du polygone
      },
      // Les paramètres de l'image, utilisés lorsque la forme est une image
      image: {
        src: "img/github.svg", // Le chemin source de l'image
        width: 100, // La largeur de l'image
        height: 100, // La hauteur de l'image
      },
    },
    // Définition de l'opacité des particules
    opacity: {
      value: 0.5, // La valeur de l'opacité des particules
      random: false, // La valeur aléatoire de l'opacité des particules
      // Les paramètres d'animation de l'opacité des particules
      anim: {
        enable: false, // Activation de l'animation de l'opacité
        speed: 1.5, // La vitesse de l'animation de l'opacité
        opacity_min: 0.15, // L'opacité minimale lors de l'animation
        sync: false, // Synchronisation de l'animation de l'opacité sur toutes les particules
      },
    },
    // Définition de la taille des particules
    size: {
      value: 2.5, // La taille des particules
      random: true, // La taille aléatoire des particules
      // Les paramètres d'animation de la taille des particules
      anim: {
        enable: true, // Activation de l'animation de la taille
        speed: 2, // La vitesse de l'animation de la taille
        size_min: 0.15, // La taille minimale lors de l'animation
        sync: false, // Synchronisation de l'animation de la taille sur toutes les particules
      },
    },

    line_linked: {
      enable: true, // Activation des lignes liant les particules
      distance: 110, // La distance à laquelle les particules sont liées par une ligne
      color: "#33b1f8", // La couleur de la ligne liant les particules
      opacity: 0.25, // L'opacité de la ligne liant les particules
      width: 1, // L'épaisseur de la ligne liant les particules
    },
    move: {
      enable: true, // Activation du mouvement des particules
      speed: 1.6, // La vitesse de déplacement des particules
      direction: "none", // La direction de déplacement des particules (none, top, top-right, right, bottom-right, bottom, bottom-left, left, top-left)
      random: false, // Mouvement aléatoire des particules
      straight: false, // Mouvement en ligne droite des particules
      out_mode: "out", // Comportement des particules lorsqu'elles atteignent le bord du canvas (out, bounce)
      bounce: false, // Rebond des particules sur les bords
      attract: { enable: false, rotateX: 600, rotateY: 1200 }, // Attraction des particules vers un point
    },
  },
  interactivity: {
    detect_on: "canvas", // Détection de l'interaction sur le canvas entier
    events: {
      onhover: { enable: false, mode: "repulse" }, // Activation du mode de répulsion lors du survol
      onclick: { enable: false, mode: "push" }, // Activation du mode d'ajout de particules lors du clic
      resize: true, // Redimensionnement du canvas lors du redimensionnement de la fenêtre
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } }, // Mode grab (saisie) : les particules à une certaine distance sont liées par une ligne
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, // Mode bulle : les particules à une certaine distance grossissent
      repulse: { distance: 200, duration: 0.4 }, // Mode repulse : les particules à une certaine distance sont repoussées
      push: { particles_nb: 4 }, // Mode push : ajout de particules lors du clic
      remove: { particles_nb: 2 }, // Mode remove : suppression de particules lors du clic
    },
  },
  retina_detect: true, // Détection d'un écran Retina
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initialisation du compteur de particules et des statistiques
//deux barres obliques pour garder ces variables en cas de besin il suffit juste de supprimer les//
//var count_particles, stats, update;
//stats = new Stats(); // Création d'un nouvel objet Stats pour afficher les statistiques
//stats.setMode(0); // Configuration du mode de statistiques (0 pour fps, 1 pour ms, 2 pour mb, 3+ pour des modes personnalisés)
//stats.domElement.style.position = "absolute"; // Positionnement de l'élément de statistiques
//stats.domElement.style.left = "0px"; // Positionnement à gauche de l'élément de statistiques
//stats.domElement.style.top = "0px"; // Positionnement en haut de l'élément de statistiques
// Sélection de l'élément DOM avec la classe "js-count-particles"
//count_particles = document.querySelector(".js-count-particles");
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Définition de la fonction de mise à jour
update = function () {
  // Début de la mesure de performance de Stats
  //stats.begin();

  // Fin de la mesure de performance de Stats
  //stats.end();

  // Vérification de l'existence des particules
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    // Mise à jour du nombre de particules affichées
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }

  // Appel de la fonction update à la prochaine rafraîchissement de l'écran
  requestAnimationFrame(update);
};

// Appel initial de la fonction update
requestAnimationFrame(update);
