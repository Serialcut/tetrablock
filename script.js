/*jshint esversion: 6 */
/* jshint browser: true */
let gameSettings = {
	grid: "standard",
	ghost: false,
	themeColor: "default",
	blockSpeed: 5,
	sound: true,
	visualEffects: true,
	language: "french",
};
// Initialisation des variables score et lines à 0
let score = 0;
let lines = 0;
// Fonction qui génère un nombre aléatoire entre un minimum et un maximum inclus
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
// Fonction qui génère une séquence de noms de tétraminos (formes des blocs du jeu Tetris)
function generateSequence() {
	const sequence = ["I", "J", "L", "O", "S", "T", "Z"]; // Tous les types de tétraminos
	const tetrominoSequence = [];
	while (sequence.length) {
		const rand = getRandomInt(0, sequence.length - 1); // On génère un index aléatoire
		const name = sequence.splice(rand, 1)[0]; // On retire le tétramino à cet index de la séquence et on le récupère
		tetrominoSequence.push(name); // On ajoute ce tétramino à la séquence de tétraminos
	}
	return tetrominoSequence;
}
// Fonction qui retourne le prochain tétramino à afficher sur le terrain de jeu
function getNextTetromino() {
	if (tetrominoSequence.length === 0) {
		tetrominoSequence = generateSequence(); // Si la séquence est vide, on en génère une nouvelle
	}
	const name = tetrominoSequence.pop(); // On retire le prochain tétramino de la séquence
	const matrix = tetrominos[name]; // On récupère la matrice du tétramino correspondant
	// On calcule la position initiale du tétramino sur le terrain de jeu
	const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);
	const row = name === "I" ? -1 : -2;
	return {
		name: name, // Nom du tétramino
		matrix: matrix, // Matrice du tétramino
		row: row, // Position en ligne du tétramino
		col: col, // Position en colonne du tétramino
	};
}
// Fonction qui fait pivoter une matrice (utilisée pour la rotation des tétraminos)
function rotate(matrix) {
	const N = matrix.length - 1;
	const result = Array.from({
			length: N + 1
		}, () => Array(N + 1)
		.fill(0));
	for (let i = 0; i <= N; i++) {
		for (let j = 0; j <= N; j++) {
			result[j][N - i] = matrix[i][j]; // On remplit la nouvelle matrice en pivotant celle d'origine
		}
	}
	return result;
}
// Fonction pour vérifier si une cellule donnée est à l'intérieur du terrain de jeu
function isInsidePlayfield(cellCol, cellRow, matrixRowLength, matrixColLength) {
	// Si la cellule est en dehors du terrain de jeu, on retourne false
	return !(cellCol < 0 || cellCol >= matrixColLength || cellRow >= matrixRowLength);
}
// Fonction pour vérifier si une cellule donnée est vide
function isCellEmpty(cellRow, cellCol) {
	// Si la cellule est vide, on retourne true
	return !playfield[cellRow][cellCol];
}
// Fonction pour vérifier si le mouvement d'un tetramino est valide
function isValidMove(matrix, cellRow, cellCol) {
	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			if (matrix[row][col]) {
				// Si la cellule n'est pas dans le terrain de jeu ou si elle n'est pas vide, le mouvement n'est pas valide
				if (!isInsidePlayfield(cellCol + col, cellRow + row, playfield.length, playfield[0].length) || !isCellEmpty(cellRow + row, cellCol + col)) {
					return false;
				}
			}
		}
	}
	// Si toutes les cellules sont valides, le mouvement est valide
	return true;
}
// Fonction pour placer un tétramino sur le terrain de jeu
function placeTetromino() {
	for (let row = 0; row < tetromino.matrix.length; row++) {
		for (let col = 0; col < tetromino.matrix[row].length; col++) {
			if (tetromino.matrix[row][col]) {
				// Si le tétramino dépasse le haut du terrain de jeu, la partie est terminée
				if (tetromino.row + row < 0) {
					return showGameOver();
				}
				// On place le tétramino sur le terrain de jeu
				playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
			}
		}
	}
	// On vérifie si une ligne est complète
	for (let row = playfield.length - 1; row >= 0; row--) {
		if (playfield[row].every((cell) => !!cell)) {
			// Si une ligne est complète, on augmente le score et on déplace toutes les lignes du dessus vers le bas
			score++;
			document.getElementById("score-content")
				.textContent = score;
			lines++;
			document.getElementById("time-content")
				.textContent = lines;
			for (let r = row; r >= 0; r--) {
				for (let c = 0; c < playfield[r].length; c++) {
					playfield[r][c] = playfield[r - 1][c];
				}
			}
		}
	}
	// On récupère le prochain tétramino
	tetromino = getNextTetromino();
}

function showGameOver() {
	cancelAnimationFrame(rAF); // Arrêter l'animation
	gameOver = true;
	// Créer une fenêtre modale dynamique
	const modal = document.createElement('div');
	modal.id = 'game-over-modal';
	modal.style.position = 'fixed';
	modal.style.top = '50%';
	modal.style.left = '50%';
	modal.style.transform = 'translate(-50%, -50%)';
	modal.style.background = 'rgba(0, 0, 0, 0.8)';
	modal.style.color = 'white';
	modal.style.padding = '20px';
	modal.style.borderRadius = '10px';
	modal.style.textAlign = 'center';
	modal.style.zIndex = '1000'; // Assurez-vous qu'il apparaît au-dessus de tout
	// Contenu de la modale
	modal.innerHTML = `
    <h1>GAME OVER!</h1>
    <p>Score: ${score}</p>
    <button id="restart-button" style="padding: 10px 20px; border: none; border-radius: 5px; background: #5A65F1; color: white; font-size: 16px; cursor: pointer;">
      Rejouer
    </button>
  `;
	// Ajouter la modale au corps du document
	document.body.appendChild(modal);
	// Ajouter un événement pour redémarrer le jeu
	document.getElementById('restart-button')
		.addEventListener('click', () => {
			document.body.removeChild(modal); // Retirer la modale
			startNewGame(); // Redémarrer le jeu
		});
}
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
// On définit la taille des cases et on prépare le terrain de jeu et la séquence de tétraminos
const grid = 32;
let tetrominoSequence = [];
let playfield = [];
// On prépare le terrain de jeu
for (let row = -2; row < 20; row++) {
	playfield[row] = [];
	for (let col = 0; col < 10; col++) {
		playfield[row][col] = 0;
	}
}
// On définit les différentes formes de tétraminos
const tetrominoShapes = {
	I: "0/1111/0/0",
	J: "100/111/0",
	L: "001/111/0",
	O: "11/11",
	S: "011/110/0",
	Z: "110/011/0",
	T: "010/111/0",
};

function createMatrix(shape) {
	return shape.split("/")
		.map((row) => [...row].map(Number));
}
const tetrominos = Object.fromEntries(Object.entries(tetrominoShapes)
	.map(([name, shape]) => [
		name,
		createMatrix(shape),
	]));
// On définit les couleurs des différents tétraminos
const colors = {
	I: "cyan",
	O: "yellow",
	T: "purple",
	S: "green",
	Z: "red",
	J: "blue",
	L: "orange",
};
// On initialise quelques variables
let count = 0;
let tetromino = getNextTetromino();
let rAF = null;
let gameOver = false;
//////////////////////////////////////
/////////////////////////////////////
// Fonction principale du jeu, exécutée en boucle
function drawGrid() {
	console.log("drawGrid est appelée");
	context.strokeStyle = "white"; // changez cela pour la couleur de votre choix;
	if (gridOption === "none") {
		// Ne dessine rien
	}
	else if (gridOption === "standard") {
		// Dessine une grille standard
		for (let x = 0; x < canvas.width; x += grid) {
			context.beginPath();
			context.moveTo(x, 0);
			context.lineTo(x, canvas.height);
			context.stroke();
		}
		for (let y = 0; y < canvas.height; y += grid) {
			context.beginPath();
			context.moveTo(0, y);
			context.lineTo(canvas.width, y);
			context.stroke();
		}
	}
	else if (gridOption === "vertical") {
		// Dessine seulement des lignes verticales
		for (let x = 0; x < canvas.width; x += grid) {
			context.beginPath();
			context.moveTo(x, 0);
			context.lineTo(x, canvas.height);
			context.stroke();
		}
	}
	else if (gridOption === "horizontal") {
		// Dessine seulement des lignes horizontales
		for (let y = 0; y < canvas.height; y += grid) {
			context.beginPath();
			context.moveTo(0, y);
			context.lineTo(canvas.width, y);
			context.stroke();
		}
	}
}
// Gestion de l'option Ghost Mode
document.getElementById("ghost")
	.addEventListener("change", function() {
		gameSettings.ghost = this.checked; // Met à jour l'état du mode fantôme
		console.log(`Mode fantôme : ${gameSettings.ghost ? "activé" : "désactivé"}`);
	});
// Fonction pour cloner le tétramino
function cloneTetromino(tetromino) {
	return {
		matrix: tetromino.matrix.map(row => row.slice()),
		row: tetromino.row,
		col: tetromino.col,
		name: tetromino.name
	};
}
// Fonction pour dessiner les blocs fantômes
function drawGhostTetromino() {
	if (!gameSettings.ghost) return; // Si le mode fantôme est désactivé, arrêter ici
	const ghost = cloneTetromino(tetromino);
	// Descend le tétramino à la position valide la plus basse
	while (isValidMove(ghost.matrix, ghost.row + 1, ghost.col)) {
		ghost.row++;
	}
	context.fillStyle = "rgba(255, 255, 255, 0.3)"; // Couleur translucide pour le fantôme
	context.strokeStyle = "rgba(255, 255, 255, 0.5)"; // Bordure translucide
	context.lineWidth = 1;
	// Dessine chaque cellule du tétramino fantôme
	for (let row = 0; row < ghost.matrix.length; row++) {
		for (let col = 0; col < ghost.matrix[row].length; col++) {
			if (ghost.matrix[row][col]) {
				context.fillRect(
					(ghost.col + col) * grid,
					(ghost.row + row) * grid, grid - 1, grid - 1);
				context.strokeRect(
					(ghost.col + col) * grid,
					(ghost.row + row) * grid, grid - 1, grid - 1);
			}
		}
	}
}

function loop() {
	// On demande la prochaine image d'animation
	rAF = requestAnimationFrame(loop);
	// On efface le canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	// On appelle la fonction drawGrid à chaque image
	drawGrid();
	// On dessine les tétraminos déjà placés sur le terrain de jeu
	for (let row = 0; row < 20; row++) {
		for (let col = 0; col < 10; col++) {
			if (playfield[row][col]) {
				const name = playfield[row][col];
				context.fillStyle = colors[name];
				context.fillRect(col * grid, row * grid, grid - 1, grid - 1);
			}
		}
	}
	// On gère la descente et le dessin du tétramino actif
	if (tetromino) {
		if (++count > 35 - Math.floor(score / 10)) {
			tetromino.row++;
			count = 0;
			if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
				tetromino.row--;
				placeTetromino();
			}
		}
		// Dessine le fantôme (si le mode est activé)
		drawGhostTetromino();
		// Dessine le tétramino actif
		context.fillStyle = colors[tetromino.name];
		context.strokeStyle = "black"; // couleur de la bordure
		context.lineWidth = 3; // épaisseur de la bordure
		for (let row = 0; row < tetromino.matrix.length; row++) {
			for (let col = 0; col < tetromino.matrix[row].length; col++) {
				if (tetromino.matrix[row][col]) {
					context.fillRect(
						(tetromino.col + col) * grid,
						(tetromino.row + row) * grid, grid, grid);
					// Dessinez la bordure du bloc
					context.strokeRect(
						(tetromino.col + col) * grid,
						(tetromino.row + row) * grid, grid, grid);
				}
			}
		}
	}
}
// Événements de clavier
document.addEventListener("keydown", function(e) {
	if (gameOver) return;
	// Gauche et droite
	if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
		const col = e.key === "ArrowLeft" ? tetromino.col - 1 : tetromino.col + 1;
		if (isValidMove(tetromino.matrix, tetromino.row, col)) {
			tetromino.col = col;
		}
	}
	// Haut (rotation)
	if (e.key === "ArrowUp") {
		const matrix = rotate(tetromino.matrix);
		if (isValidMove(matrix, tetromino.row, tetromino.col)) {
			tetromino.matrix = matrix;
		}
	}
	// Bas (accélère la descente)
	if (e.key === "ArrowDown") {
		const row = tetromino.row + 1;
		if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
			tetromino.row = row - 1;
			placeTetromino();
			return;
		}
		tetromino.row = row;
	}
});
// Événements de boutons de contrôle
document.getElementById("deplacer-gauche")
	.addEventListener("click", function() {
		if (!gameOver && isValidMove(tetromino.matrix, tetromino.row, tetromino.col - 1)) {
			tetromino.col--;
		}
	});
document.getElementById("deplacer-droite")
	.addEventListener("click", function() {
		if (!gameOver && isValidMove(tetromino.matrix, tetromino.row, tetromino.col + 1)) {
			tetromino.col++;
		}
	});
document.getElementById("tourner-gauche")
	.addEventListener("click", function() {
		if (!gameOver) {
			const matrix = rotate(rotate(rotate(tetromino.matrix)));
			if (isValidMove(matrix, tetromino.row, tetromino.col)) {
				tetromino.matrix = matrix;
			}
		}
	});
document.getElementById("tourner-droite")
	.addEventListener("click", function() {
		if (!gameOver) {
			const matrix = rotate(tetromino.matrix);
			if (isValidMove(matrix, tetromino.row, tetromino.col)) {
				tetromino.matrix = matrix;
			}
		}
	});
// Gestion de la grille sélectionnée
const gridSelect = document.getElementById("grid");
let gridOption = "none"; // Option par défaut pour la grille
gridSelect.addEventListener("change", function(e) {
	gridOption = e.target.value; // Met à jour la grille en fonction de la sélection
});
// Événement du bouton de démarrage
document.getElementById("start-button")
	.addEventListener("click", function() {
		// On ajoute la classe pour indiquer que le jeu a commencé
		document.getElementById("game-container")
			.classList.add("game-started");
		// On cache le menu et on affiche le jeu
		document.getElementById("menu")
			.style.display = "none";
		document.getElementById("game-canvas")
			.style.display = "block";
		// On vérifie que le navigateur supporte requestAnimationFrame
		if (!window.requestAnimationFrame) {
			window.alert("Désolé, votre navigateur ne supporte pas requestAnimationFrame.");
			return;
		}
		rAF = requestAnimationFrame(loop);
	});
document.addEventListener("DOMContentLoaded", () => {
	// Fonction pour faire descendre un bloc
	function moveBlockDown() {
		// Code pour faire descendre un bloc
	}
	// Interval pour déplacer le bloc vers le bas
	let moveBlockInterval = setInterval(moveBlockDown, 1000 / gameSettings.blockSpeed);
	document.getElementById("grid")
		.addEventListener("change", function() {
			gameSettings.grid = this.value;
		});
	document.getElementById("theme-color")
		.addEventListener("change", function() {
			gameSettings.themeColor = this.value;
		});
	// Écouteur d'événements pour mettre à jour la vitesse des blocs
	document.getElementById("block-speed")
		.addEventListener("change", function() {
			gameSettings.blockSpeed = this.value;
			// Mettre à jour l'intervalle
			clearInterval(moveBlockInterval);
			moveBlockInterval = setInterval(moveBlockDown, 1000 / gameSettings.blockSpeed);
		});
	document.getElementById("sound")
		.addEventListener("change", function() {
			gameSettings.sound = this.checked;
		});
	document.getElementById("visual-effects")
		.addEventListener("change", function() {
			gameSettings.visualEffects = this.checked;
		});
	document.getElementById("language")
		.addEventListener("change", function() {
			gameSettings.language = this.value;
		});
	let blockSpeedSelect = document.getElementById("block-speed");
	let gridSelect = document.getElementById("grid");
	blockSpeedSelect.addEventListener("change", function() {
		let selectedBlockSpeed = blockSpeedSelect.value;
		console.log("Vitesse de chute des blocs sélectionnée : " + selectedBlockSpeed);
	});
	gridSelect.addEventListener("change", function() {
		let selectedGrid = gridSelect.value;
		console.log("Grille sélectionnée : " + selectedGrid);
	});
	let menu = document.getElementById("menu");
	let menuItems = Array.from(menu.getElementsByClassName("menu-item"));
	let containers = Array.from(document.getElementsByClassName("container"));
	menuItems.forEach((item) => {
		item.addEventListener("click", function() {
			menuItems.forEach((i) => i.classList.remove("active"));
			this.classList.add("active");
			const targetContainer = document.getElementById(this.dataset.target);
			containers.forEach((container) => (container.style.display = "none"));
			targetContainer.style.display = "block";
		});
	});

	function showElement(buttonId, targetContainerId, targetClass) {
		let targetContainer = document.getElementById(targetContainerId);
		document.getElementById(buttonId)
			.addEventListener("click", function() {
				targetContainer.classList.add(targetClass);
				menu.style.display = "none";
				targetContainer.style.display = "block";
			});
	}

	function hideElement(buttonId, targetContainerId, targetClass) {
		let targetContainer = document.getElementById(targetContainerId);
		document.getElementById(buttonId)
			.addEventListener("click", function() {
				targetContainer.classList.remove(targetClass);
				targetContainer.style.display = "none";
				menu.style.display = "flex";
			});
	}
	showElement("instructions-button", "instructions-container", "instructions-started");
	hideElement("close-instructions-button", "instructions-container", "instructions-started");
	showElement("high-scores-button", "score-container", "score-started");
	hideElement("close-score-button", "score-container", "score-started");
	showElement("options-button", "options-container", "options-started");
	hideElement("close-options-button", "options-container", "options-started");
	let menuMusic = document.getElementById("menu-music");
	menuMusic.play();
	menuMusic.pause();
	menuMusic.currentTime = 0;
	let soundCheckbox = document.getElementById("sound");
	soundCheckbox.addEventListener("change", function() {
		console.log("Checkbox state changed: ", this.checked); // Ajout de cette ligne pour le débogage
		if (this.checked) {
			menuMusic.play();
		}
		else {
			menuMusic.pause();
			menuMusic.currentTime = 0;
		}
	});
	// Récupérer la référence de la fenêtre modale et du bouton de démarrage
	const modal = document.getElementById("modal");
	// Fonctions pour chaque action du menu
	function startGame() {
		closeModal();
		// Ajoutez ici le code pour démarrer votre jeu
		console.log("Game Started");
	}

	function showInstructions() {
		closeModal();
		// Ajoutez ici le code pour afficher les instructions
		console.log("Showing Instructions");
	}

	function showScores() {
		closeModal();
		// Ajoutez ici le code pour afficher les meilleurs scores
		console.log("Showing Scores");
	}

	function showOptions() {
		closeModal();
		// Ajoutez ici le code pour afficher les options
		console.log("Showing Options");
	}
	// Fonction pour afficher la fenêtre modale
	function showModal() {
		modal.style.display = "flex";
	}
	// Fonction pour masquer la fenêtre modale
	function closeModal() {
		modal.style.display = "none";
	}
	// Attacher un gestionnaire d'événement à chaque bouton
	document.getElementById("start-button")
		.addEventListener("click", startGame);
	document.getElementById("instructions-button")
		.addEventListener("click", showInstructions);
	document.getElementById("high-scores-button")
		.addEventListener("click", showScores);
	document.getElementById("options-button")
		.addEventListener("click", showOptions);
	// Appeler la fonction showModal pour afficher la fenêtre modale au chargement de la page
	window.addEventListener("load", showModal);
});
// Récupérer tous les boutons de retour
const backButtons = document.getElementsByClassName("back-button");
// Parcourir tous les boutons de retour et ajouter un gestionnaire d'événement
for (const element of backButtons) {
	element.addEventListener("click", showMainMenu);
}
// Fonction pour afficher le menu principal
function showMainMenu() {
	document.getElementById("menu")
		.style.display = "flex";
	document.getElementById("instructions-container")
		.style.display = "none";
	document.getElementById("score-container")
		.style.display = "none";
	document.getElementById("options-container")
		.style.display = "none";
	// Afficher la fenêtre modale
	modal.style.display = "flex";
}
// Récupérer le bouton "Retour" dans chaque menu
let menuBackButton = document.getElementById("menu-back-button");
// Ajouter un événement de clic au bouton "Retour" dans chaque menu
menuBackButton.addEventListener("click", function() {
	showMainMenu();
});
