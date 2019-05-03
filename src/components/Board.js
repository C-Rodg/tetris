import React, { Component } from 'react';

// Components
import GridItem from './GridItem';

// Board
const boardRows = 20;
const boardCols = 10;
const generateEmptyBoard = () =>
	new Array(boardRows).fill(new Array(boardCols).fill(0));

// Tetri objects for each rotation
const S_PIECE = [
	[[0, 1, 1], [1, 1, 0], [0, 0, 0]],

	[[0, 1, 0], [0, 1, 1], [0, 0, 1]],

	[[0, 0, 0], [0, 1, 1], [1, 1, 0]],

	[[1, 0, 0], [1, 1, 0], [0, 1, 0]]
];

// Piece wrapper class
function Piece(shapes, color) {
	this.color = color;
	this.tetri = shapes;
	this.tetriIndex = 0;
	this.activeTetri = this.tetri[this.tetriIndex];
	this.x = 3;
	this.y = -2;
}

const NUM_COLS = 10;
const NUM_ROWS = 20;

class Board extends Component {
	state = {
		squareWidth: 0,
		squareHeight: 0
	};
	ctx = null;
	constructor(props) {
		super(props);
		this.board = React.createRef();
	}

	componentDidMount() {
		// Set context to 2d
		this.ctx = this.board.current.getContext('2d');
		window.CTX = this.ctx;
		// Calculate dimensions
		this.calculateSquareDimensions();
		console.log(this.ctx);
		this.drawSquare(5, 4, 'red');
	}

	// Get square unit dimensions
	calculateSquareDimensions = () => {
		const board = this.board.current;
		const boardWidth = board.clientWidth;
		const boardHeight = board.clientHeight;
		const squareWidth = Math.floor(boardWidth / NUM_COLS);
		const squareHeight = Math.floor(boardHeight / NUM_ROWS);
		console.log(squareWidth + ' x ' + squareHeight);
		this.setState({
			squareWidth,
			squareHeight
		});
	};

	// Function to draw a square to the board
	drawSquare = (x, y, color) => {
		const { squareHeight, squareWidth } = this.state;
		this.ctx.fillStyle = color;
		this.ctx.fillRect(
			x * squareWidth,
			y * squareHeight,
			squareWidth,
			squareHeight
		);
		this.ctx.strokeStyle = 'black';
		this.ctx.strokeRect(
			x * squareWidth,
			y * squareHeight,
			squareWidth,
			squareHeight
		);
	};

	render() {
		return (
			<div className="Board">
				<canvas ref={this.board} width={200} height={400} />
			</div>
		);
	}
}

// class Board extends Component {
// 	state = {
// 		grid: generateEmptyBoard()
// 	};

// 	renderBoardItems = () => {
// 		const { grid } = this.state;
// 		return grid.map(row => {
// 			return row.map((item, i) => {
// 				return <GridItem key={`${row}-${i}`} filled={!!item} />;
// 			});
// 		});
// 	};

// 	render() {
// 		console.log(this.state.grid);
// 		return <div className="Board">{this.renderBoardItems()}</div>;
// 	}
// }

// Thoughts... do I need react?
// Move to using canvas instead of divs...
// Still want to do this using array collision detection so maybe not..

// **** ---- GAME LOOP **** //
// 1.) Get Piece and place at top of board
// 2.) Tick 1 second
// 3.) Can piece move down?
// -- yes? shift down and repeat
// -- no?  then...
// -- --- place piece on board at position
// -- --- are any rows filled? clear out if yes
// -- --- generate new piece

// **** --- ROTATION **** //

export default Board;

//[[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
