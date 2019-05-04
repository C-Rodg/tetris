// Libraries
import React, { Component } from 'react';

class Board extends Component {
	EMPTY = 'white';
	NUM_ROWS = 20;
	NUM_COLS = 10;
	SQUARE_SIZE = 0;
	ctx = null;
	board = [];
	dropDate = null;
	currentPiece = null;

	constructor(props) {
		super(props);
		this.boardWrapperRef = React.createRef();
		this.boardRef = React.createRef();
	}

	componentDidUpdate(prevProps, prevState) {
		// Calculate board dimensions on game start
		if (!prevProps.gameStarted && this.props.gameStarted) {
			this.calculateSquareDimensions();
			this.generateBoardArray();
			this.drawBoard();
			this.startGame();
			// TODO: TESTING
			window.CTX = this.ctx;
		}
	}

	// Start the game
	startGame = () => {
		this.dropDate = Date.now();
		this.drop();
	};

	drop = () => {
		const now = Date.now();
		const delta = now - this.dropDate;
		if (delta > 1000) {
			// p.moveDown
			this.dropDate = Date.now();
		}
		// if game !== over
		requestAnimationFrame(this.drop);
	};

	// Generate 2d array for board and set to empty
	generateBoardArray = () => {
		const b = this.board;
		const rows = this.NUM_ROWS;
		const cols = this.NUM_COLS;
		const empty = this.EMPTY;
		for (let r = 0; r < rows; r++) {
			b[r] = [];

			for (let c = 0; c < cols; c++) {
				b[r][c] = empty;
			}
		}
	};

	// Fill the board with empty blocks
	drawBoard = () => {
		const b = this.board;
		const rows = this.NUM_ROWS;
		const cols = this.NUM_COLS;

		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				this.drawSquare(c, r, b[r][c]);
			}
		}
	};

	// Determine the board size based off of the window size
	calculateSquareDimensions = () => {
		if (!this.boardRef.current || !this.boardWrapperRef.current) {
			return;
		}
		this.ctx = this.boardRef.current.getContext('2d');
		const boardWrapper = this.boardWrapperRef.current;
		const bwWidth = boardWrapper.clientWidth;
		const bwHeight = boardWrapper.clientHeight;
		const board = this.boardRef.current;

		if (bwWidth < bwHeight) {
			let computedHeight = bwWidth * 2;
			if (computedHeight > bwHeight) {
				computedHeight = bwHeight;
			}
			board.height = computedHeight - 40;
			board.width = computedHeight / 2 - 20;
		} else {
			board.height = bwHeight - 40;
			board.width = bwHeight / 2 - 20;
		}
		this.SQUARE_SIZE = Math.floor(Math.floor(board.width) / this.NUM_COLS);
	};

	// Function to draw a square to the board - should this instead be on the Piece prototype?
	drawSquare = (x, y, color) => {
		const squareSize = this.SQUARE_SIZE;
		const ctx = this.ctx;
		ctx.fillStyle = color;
		ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
		ctx.strokeStyle = 'black';
		ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
	};

	// Collision detection function
	checkCollisions = (x, y, piece) => {
		const b = this.board;
		const numRows = this.NUM_ROWS;
		const numCols = this.NUM_COLS;
		const empty = this.EMPTY;
		const activeTetri = piece.activeTetri;
		for (let r = 0; r < activeTetri.length; r++) {
			for (let c = 0; c < activeTetri.length; c++) {
				if (!activeTetri[r][c]) {
					continue;
				}
				const newX = piece.x + c + x;
				const newY = piece.y + r + y;
				if (newX < 0 || newX >= numCols || newY >= numRows) {
					return true;
				}

				if (newY < 0) {
					continue;
				}

				if (b[newY][newX] !== empty) {
					return true;
				}
			}
		}

		return false;
	};

	render() {
		return (
			<div className="Board" ref={this.boardWrapperRef}>
				{this.props.gameStarted && <canvas ref={this.boardRef} />}
			</div>
		);
	}
}

// **** ---- GAME LOOP **** //
// 1.) Get Piece and place at top of board
// 2.) Tick 1 second
// 3.) Can piece move down?
// -- yes? shift down and repeat
// -- no?  then...
// -- --- place piece on board at position
// -- --- are any rows filled? clear out if yes
// -- --- generate new piece

export default Board;
