// DOM
const domElements = {
	playPauseBtn: document.getElementById('button-pausePlay'),
	score: document.getElementById('score'),
	canvas: document.getElementById('canvas-tetris')
};
const ctx = domElements.canvas.getContext('2d');

// Game status object
const gameStatus = {
	lastDropTime: null,
	isPaused: true,
	gameOver: false,
	score: 0
};

// Configuration
const configuration = {
	EMPTY: '#beaafb',
	ROWS: 20,
	COLS: 10,
	squareSize: 20, // TODO: generate based off of window size
	gameSpeed: 1000
};
const board = [];
let currentPiece = null;

// Helper - loop over the board
function loopBoard(callback) {
	const rows = configuration.ROWS;
	const cols = configuration.COLS;
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			callback(row, col, board[row][col]);
		}
	}
}

// Initialize a blank board
function initializeBoard() {
	// Callback function to run on each row-col
	const emptyPiece = configuration.EMPTY;
	const setAsEmpty = (row, col, _) => {
		board[row][col] = emptyPiece;
	};

	// Make sure board is empty
	for (let row = 0; row < configuration.ROWS; row++) {
		board[row] = [];
	}

	// Set all [row][cols] to empty
	loopBoard(setAsEmpty);
}

// Draw the board
function drawCurrentBoard() {
	loopBoard(drawSquare);
}

// Draw a square using canvas
function drawSquare(row, col, color) {
	const squareSize = configuration.squareSize;
	ctx.fillStyle = color;
	ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
	ctx.strokeStyle = 'BLACK';
	ctx.strokeRect(col * squareSize, row * squareSize, squareSize, squareSize);
}

initializeBoard();
drawCurrentBoard();

// Handler - Play or Pause game
function startStopGame(ev) {
	if (gameStatus.isPaused) {
		this.blur();
		// Start the game
		if (!gameStatus.lastDropTime) {
			gameStatus.lastDropTime = Date.now();
		}
		if (!currentPiece) {
			currentPiece = new Piece(...getRandomTetriMonad());
		}
		gameStatus.isPaused = false;

		if (gameStatus.gameOver) {
			// Reinitialize board
			initializeBoard();
			drawCurrentBoard();
			gameStatus.gameOver = false;
		}
		domElements.playPauseBtn.textContent = 'Pause';
		startPieceDropping();
	} else {
		// Pause the game
		gameStatus.isPaused = true;
		gameStatus.lastDropTime = null;
		domElements.playPauseBtn.textContent = 'Play';
	}
}

// Handler - keyboard press
function keyboardHandler(ev) {
	if (gameStatus.isPaused) {
		return;
	}
	const keyCode = ev.keyCode;
	switch (keyCode) {
		case 37:
			currentPiece.moveLeft();
			gameStatus.lastDropTime = Date.now();
			break;
		case 39:
			currentPiece.moveRight();
			gameStatus.lastDropTime = Date.now();
			break;
		case 38:
			currentPiece.rotate();
			gameStatus.lastDropTime = Date.now();
			break;
		case 40:
			currentPiece.moveDown();
			break;
		case 32:
			currentPiece.goToBottom();
			break;
	}
}

// Animation - move piece
function startPieceDropping() {
	const now = Date.now();
	const delta = now - gameStatus.lastDropTime;
	if (delta > configuration.gameSpeed) {
		currentPiece.moveDown();
		gameStatus.lastDropTime = Date.now();
	}

	if (!gameStatus.isPaused) {
		requestAnimationFrame(startPieceDropping);
	}
}

// Add event listeners
domElements.playPauseBtn.addEventListener('click', startStopGame, false);
document.addEventListener('keydown', keyboardHandler, false);

// TODO:
// Inject rendering engine for responsive game board
// Style game:
// -- mobile - add onscreen buttons
// -- sidepanel buttons, buttons, settings, and info - game speed
