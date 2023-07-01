let translations = {
  english: {
    greeting: "Hello, world!",
    startGame: "Start Game",
    instructions: "Instructions",
    highScores: "High Scores",
    options: "Options",
    // ... ajoutez toutes les autres traductions nécessaires ici ...
  },
  french: {
    greeting: "Bonjour, le monde!",
    startGame: "Commencer le Jeu",
    instructions: "Instructions",
    highScores: "Meilleurs Scores",
    options: "Options",
    // ... ajoutez toutes les autres traductions nécessaires ici ...
  },
  spanish: {
    greeting: "¡Hola, mundo!",
    startGame: "Comenzar el juego",
    instructions: "Instrucciones",
    highScores: "Puntuaciones más altas",
    options: "Opciones",
    // ... ajoutez toutes les autres traductions nécessaires ici ...
  }
};

// La langue actuelle (peut être mise à jour par l'utilisateur dans les options)
let currentLanguage = "french";

// Fonction pour mettre à jour la langue du jeu
function updateLanguage() {
  // Obtenez la traduction pour la langue actuelle
  let translation = translations[currentLanguage];

  // Mettez à jour le texte de chaque élément du jeu avec la traduction appropriée
  document.getElementById('start-button').textContent = translation.startGame;
  document.getElementById('instructions-button').textContent = translation.instructions;
  document.getElementById('high-scores-button').textContent = translation.highScores;
  document.getElementById('options-button').textContent = translation.options;
  // ... faites cela pour tous les autres éléments qui doivent être traduits ...
}

// Écouteur d'événements pour mettre à jour la langue lorsque l'utilisateur change la langue dans les options
document.getElementById('language').addEventListener('change', function() {
  // Mettez à jour la langue actuelle
  currentLanguage = this.value;

  // Mettez à jour la langue du jeu
  updateLanguage();
});

// Mettez à jour la langue du jeu lorsque la page se charge pour la première fois
document.addEventListener('DOMContentLoaded', updateLanguage);
