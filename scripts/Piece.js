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

// Movement - to bottom
Piece.prototype.goToBottom = function() {
	while (currentPiece === this) {
		this.moveDown();
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

// Lock pieces in place after moving down and colliding
Piece.prototype.lock = function() {
	const tetriSize = this.activeTetri.length;
	for (let row = 0; row < tetriSize; row++) {
		for (let col = 0; col < tetriSize; col++) {
			if (!this.activeTetri[row][col]) {
				continue;
			}

			if (this.y + row < 0) {
				alert('GAME OVER');
				gameStatus.gameOver = true;
				gameStatus.isPaused = true;
				break;
			}

			board[this.y + row][this.x + col] = this.color;
		}
	}
	const boardRows = configuration.ROWS;
	const boardCols = configuration.COLS;
	const empty = configuration.EMPTY;

	// Check for full rows
	for (let row = 0; row < boardRows; row++) {
		let isFullRow = true;
		for (let col = 0; col < boardCols; col++) {
			if (board[row][col] === empty) {
				isFullRow = false;
				break;
			}
		}

		if (isFullRow) {
			// Shift board down
			for (let newRow = row; newRow > 1; newRow--) {
				for (let newCol = 0; newCol < boardCols; newCol++) {
					board[newRow][newCol] = board[newRow - 1][newCol];
				}
			}

			// Add new top row
			for (let newCol = 0; newCol < boardCols; newCol++) {
				board[0][newCol] = empty;
			}

			// Increment score
			gameStatus.score += 10;
		}
	}

	// Done moving everything, draw to canvas
	drawCurrentBoard();

	// Show score
	domElements.score.innerHTML = gameStatus.score;
};

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
