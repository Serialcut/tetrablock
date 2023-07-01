let translations = {
  english: {
    greeting: "Hello, world!",
    startGame: "Start Game",
    instructions: "Instructions",
    highScores: "High Scores",
    options: "Options",
    instructionsText: `Tetris: the game where blocks fall like autumn leaves. Stack them up to fill the lines and make them disappear. More lines = more points. If the blocks touch the top, it's game over! 😱

    Controls:

    Left arrow: move left.
    Right arrow: move right.
    Down arrow: quick fall.
    Up arrow: block rotation.
    Tip: Keep the blocks low for more chances to win. And above all, have fun! 😊`,
  },
  french: {
    greeting: "Bonjour, le monde!",
    startGame: "Commencer le Jeu",
    instructions: "Instructions",
    highScores: "Meilleurs Scores",
    options: "Options",
    instructionsText: `Tetris : le jeu où les blocs tombent comme des feuilles d’automne. Empilez-les pour remplir les lignes et les faire disparaître. Plus de lignes = plus de points. Si les blocs touchent le haut, c'est game over! 😱

    Commandes :

    Flèche gauche : bouge à gauche.
    Flèche droite : bouge à droite.
    Flèche vers le bas : chute rapide.
    Flèche vers le haut : rotation du bloc.
    Astuce : Gardez les blocs en bas pour plus de chances de gagner. Et surtout, amusez-vous bien! 😊`,
  },
  spanish: {
    greeting: "¡Hola, mundo!",
    startGame: "Comenzar el juego",
    instructions: "Instrucciones",
    highScores: "Puntuaciones más altas",
    options: "Opciones",
    instructionsText: `Tetris: el juego donde los bloques caen como hojas de otoño. Apílalos para llenar las líneas y hacerlos desaparecer. Más líneas = más puntos. Si los bloques tocan la parte superior, ¡se acaba el juego! 😱

    Controles:

    Flecha izquierda: mover a la izquierda.
    Flecha derecha: mover a la derecha.
    Flecha hacia abajo: caída rápida.
    Flecha hacia arriba: rotación del bloque.
    Consejo: Mantén los bloques bajos para tener más posibilidades de ganar. Y sobre todo, ¡diviértete! 😊`,
  }
};

let currentLanguage = "french";

function updateLanguage() {
  let translation = translations[currentLanguage];

  document.getElementById('start-button').textContent = translation.startGame;
  document.getElementById('start-button').setAttribute('aria-label', translation.startGame);
  document.getElementById('instructions-button').textContent = translation.instructions;
  document.getElementById('instructions-button').setAttribute('aria-label', translation.instructions);
  document.getElementById('high-scores-button').textContent = translation.highScores;
  document.getElementById('high-scores-button').setAttribute('aria-label', translation.highScores);
  document.getElementById('options-button').textContent = translation.options;
  document.getElementById('options-button').setAttribute('aria-label', translation.options);
  document.querySelector('#instructions-container p').innerHTML = translation.instructionsText;
}

document.getElementById('language').addEventListener('change', function() {
  currentLanguage = this.value;
  updateLanguage();
});

document.addEventListener('DOMContentLoaded', updateLanguage);
