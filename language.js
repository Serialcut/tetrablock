"use strict";
/* jshint browser: true */

let translations = {
  english: {
    greeting: "Hello, world!",
    startGame: "Start Game",
    instructions: "Instructions",
    highScores: "High Scores",
    options: "Options",
    grid: "Grid:",
    none: "None",
    standard: "Standard",
    partial: "Partial",
    vertical: "Vertical",
    full: "Full",
    ghost: "Ghost:",
    themeColor: "Theme Color:",
    default: "Default",
    blue: "Blue",
    red: "Red",
    green: "Green",
    purple: "Purple",
    fallSpeed: "Block Fall Speed:",
    sound: "Sound:",
    visualEffects: "Visual Effects:",
    language: "Language:",
    french: "French",
    english: "English",
    spanish: "Spanish",
    close: "Back",
    instructionsText:
      "Tetris: the game where blocks fall like autumn leaves. Stack them up to fill the lines and make them disappear. More lines = more points. If the blocks touch the top, it's game over! 😱",
    controls:
      "Controls:\n" +
      "Left arrow: move left.\n" +
      "Right arrow: move right.\n" +
      "Down arrow: quick fall.\n" +
      "Up arrow: block rotation.\n" +
      "Tip: Keep the blocks low for more chances to win. And above all, have fun! 😊",
  },
  french: {
    greeting: "Bonjour, le monde !",
    startGame: "Commencer le jeu",
    instructions: "Instructions",
    highScores: "Meilleurs scores",
    options: "Options",
    grid: "Grille :",
    none: "Aucun",
    standard: "Standard",
    partial: "Partielle",
    vertical: "Verticale",
    full: "Pleine",
    ghost: "Fantôme :",
    themeColor: "Couleur du thème :",
    default: "Par défaut",
    blue: "Bleu",
    red: "Rouge",
    green: "Vert",
    purple: "Violet",
    fallSpeed: "Vitesse de chute des blocs :",
    sound: "Son :",
    visualEffects: "Effets visuels :",
    language: "Langue :",
    french: "Français",
    english: "Anglais",
    spanish: "Espagnol",
    close: "Retour",
    instructionsText:
      "Tetris : le jeu où les blocs tombent comme des feuilles d'automne. Empilez-les pour remplir les lignes et les faire disparaître. Plus de lignes = plus de points. Si les blocs touchent le haut, c'est game over ! 😱",
    controls:
      "Contrôles :\n" +
      "Flèche gauche : déplacer à gauche.\n" +
      "Flèche droite : déplacer à droite.\n" +
      "Flèche vers le bas : chute rapide.\n" +
      "Flèche vers le haut : rotation du bloc.\n" +
      "Astuce : Gardez les blocs en bas pour avoir plus de chances de gagner. Et surtout, amusez-vous bien ! 😊",
  },
  spanish: {
    greeting: "¡Hola, mundo!",
    startGame: "Comenzar el juego",
    instructions: "Instrucciones",
    highScores: "Las mejores puntuaciones",
    options: "Opciones",
    grid: "Rejilla:",
    none: "Ninguno",
    standard: "Estándar",
    partial: "Parcial",
    vertical: "Vertical",
    full: "Completa",
    ghost: "Fantasma:",
    themeColor: "Color de tema:",
    default: "Por defecto",
    blue: "Azul",
    red: "Rojo",
    green: "Verde",
    purple: "Morado",
    fallSpeed: "Velocidad de caída de los bloques:",
    sound: "Sonido:",
    visualEffects: "Efectos visuales:",
    language: "Idioma:",
    french: "Francés",
    english: "Inglés",
    spanish: "Español",
    close: "Volver",
    instructionsText:
      "Tetris: el juego donde los bloques caen como hojas de otoño. Apílalos para llenar las líneas y hacerlas desaparecer. Más líneas = más puntos. Si los bloques tocan la parte superior, ¡es el fin del juego! 😱",
    controls:
      "Controles:\n" +
      "Flecha izquierda: mover a la izquierda.\n" +
      "Flecha derecha: mover a la derecha.\n" +
      "Flecha hacia abajo: caída rápida.\n" +
      "Flecha hacia arriba: rotación del bloque.\n" +
      "Consejo: Mantén los bloques bajos para tener más oportunidades de ganar. Y sobre todo, ¡diviértete! 😊",
  },
};

let currentLanguage = "french";

function updateLanguage() {
  let translation = translations[currentLanguage];

  document.getElementById("start-button").textContent = translation.startGame;
  document
    .getElementById("start-button")
    .setAttribute("aria-label", translation.startGame);
  document.getElementById("instructions-button").textContent =
    translation.instructions;
  document
    .getElementById("instructions-button")
    .setAttribute("aria-label", translation.instructions);
  document.getElementById("high-scores-button").textContent =
    translation.highScores;
  document
    .getElementById("high-scores-button")
    .setAttribute("aria-label", translation.highScores);
  document.getElementById("options-button").textContent = translation.options;
  document
    .getElementById("options-button")
    .setAttribute("aria-label", translation.options);
  document.querySelector("#instructions-text").innerHTML =
    translation.instructionsText;
  document.querySelector('label[for="grid"]').textContent = translation.grid;
  document.querySelector('option[value="none"]').textContent = translation.none;
  document.querySelector('label[for="ghost"]').textContent = translation.ghost;
  document.querySelector('label[for="theme-color"]').textContent =
    translation.themeColor;
  document.querySelector('option[value="default"]').textContent =
    translation.default;
  document.querySelector('label[for="block-speed"]').textContent =
    translation.fallSpeed;
  document.querySelector('label[for="sound"]').textContent = translation.sound;
  document.querySelector('label[for="visual-effects"]').textContent =
    translation.visualEffects;
  document.querySelector('label[for="language"]').textContent =
    translation.language;
}

document.getElementById("language").addEventListener("change", function () {
  currentLanguage = this.value;
  updateLanguage();
});

document.addEventListener("DOMContentLoaded", updateLanguage);
