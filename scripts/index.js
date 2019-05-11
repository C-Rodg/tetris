// DOM
const playPauseBtn = document.getElementById('button-pausePlay');
const canvas = document.getElementById('canvas-tetris');
const ctx = canvas.getContext('2d');

// Game status object
const gameStatus = {
	lastDropTime: null,
	gameOver: false,
	score: 0
};

// Configuration
const configuration = {
	EMPTY: 'WHITE',
	ROWS: 20,
	COLS: 10,
	squareSize: 20 // TODO: generate based off of window size
};
const board = [];
let currentPiece = null;

// Helper - loop over the board
function loopBoard(callback) {
	const rows = configuration.ROWS;
	const cols = configuration.COLS;
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			callback(board, row, col);
		}
	}
}

// Initialize a blank board
function initializeBoard() {
	// Callback function to run on each row-col
	const emptyPiece = configuration.EMPTY;
	const setAsEmpty = (board, row, col) => {
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
function drawSquare(board, row, col) {
	const color = board[row][col];
	const squareSize = configuration.squareSize;
	ctx.fillStyle = color;
	ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
	ctx.strokeStyle = 'BLACK';
	ctx.strokeRect(col * squareSize, row * squareSize, squareSize, squareSize);
}

initializeBoard();
drawCurrentBoard();

// TODO:
// Create piece class
// Start dropping pieces
// Add in edge detection
// Add in collision detection
// Add in complete row detection
// Inject rendering engine for responsive game board

// Piece class: holds current position and all rotations of tetri
function Piece(tetri, color) {
	this.tetri = tetri;
	this.color = color;
	this.tetriN = 0;
	this.activeTetri = this.tetri[this.tetriN];
	this.x = 3;
	this.y = -2;
}

Piece.prototype.moveDown = function() {};

Piece.prototype.moveLeft = function() {};

Piece.prototype.moveRight = function() {};

Piece.prototype.rotate = function() {};

Piece.prototype.lock = function() {};

Piece.prototype.willCollide = function() {};
