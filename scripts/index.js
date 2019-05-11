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

// Take specified color and translate tetri piece to canvas
Piece.prototype.fill = function(color) {
	const activeTetri = this.activeTetri;
	const tetriSize = activeTetri.length;
	for (let row = 0; row < tetriSize; row++) {
		for (let col = 0; col < tetriSize; col++) {
			if (activeTetri[row][col]) {
				drawSquare(this.y + row, this.x + col, color);
			}
		}
	}
};

// Draw the active tetri
Piece.prototype.draw = function() {
	this.fill(this.color);
};

// Hide the active tetri
Piece.prototype.hide = function() {
	this.fill(configuration.EMPTY);
};

// Movement - down
Piece.prototype.moveDown = function() {
	if (!this.willCollide(0, 1, this.activeTetri)) {
		this.hide();
		this.y += 1;
		this.draw();
	} else {
		this.lock();
		currentPiece = new Piece(...getRandomTetriMonad());
	}
};

// Movement - left
Piece.prototype.moveLeft = function() {
	if (!this.willCollide(-1, 0, this.activeTetri)) {
		this.hide();
		this.x -= 1;
		this.draw();
	}
};

// Movement - right
Piece.prototype.moveRight = function() {
	if (!this.willCollide(1, 0, this.activeTetri)) {
		this.hide();
		this.x += 1;
		this.draw();
	}
};

// Movement - rotate
Piece.prototype.rotate = function() {
	const boardCols = configuration.COLS;
	const nextTetriIdx = (this.tetriN + 1) % this.tetri.length;
	const nextTetri = this.tetri[nextTetriIdx];
	let shift = 0;

	if (this.willCollide(0, 0, nextTetri)) {
		if (this.x > boardCols / 2) {
			// right wall
			shift = -1;
		} else {
			// left wall
			shift = 1;
		}
	}

	if (!this.willCollide(shift, 0, nextTetri)) {
		this.hide();
		this.x += shift;
		this.tetriN = nextTetriIdx;
		this.activeTetri = nextTetri;
		this.draw();
	}
};

Piece.prototype.lock = function() {};

Piece.prototype.willCollide = function(shiftX, shiftY, tetri) {
	const boardCols = configuration.COLS;
	const boardRows = configuration.ROWS;
	const empty = configuration.EMPTY;
	const tetriSize = tetri.length;
	for (let row = 0; row < tetriSize; row++) {
		for (let col = 0; col < tetriSize; col++) {
			if (!tetri[row][col]) {
				continue;
			}
			const newX = col + shiftX + this.x;
			const newY = row + shiftY + this.y;

			if (newX < 0 || newX >= boardCols || newY >= boardRows) {
				return true;
			}

			if (newY < 0) {
				continue;
			}

			if (board[newY][newX] !== empty) {
				return true;
			}
		}
	}
	return false;
};
