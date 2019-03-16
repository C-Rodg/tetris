import React, { Component } from 'react';

// Components
import GridItem from './GridItem';

// Board
const boardRows = 20;
const boardCols = 10;
const generateEmptyBoard = () =>
	new Array(boardRows).fill(new Array(boardCols).fill(0));

// Pieces
// TODO: Generate pieces
// TODO: Handle piece rotation
const numberOfPieces = 5;
const getPiece = () =>
	pieceGenerator[Math.floor(Math.random() * numberOfPieces - 1)];

// piece_Square
// [0, 1, 1, 0, 0]
// [0, 1, 1, 0, 0]
// [0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0]
const piece_Square = () => {
	return [
		[0, 1, 1, 0, 0],
		[0, 1, 1, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0]
	];
};

// piece_L
// [0, 0, 1, 0, 0]
// [0, 0, 1, 0, 0]
// [0, 0, 1, 1, 0]
// [0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0]
const piece_L = () => {
	return [
		[0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 1, 1, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0]
	];
};

// piece_Vertical
// [0, 0, 1, 0, 0]
// [0, 0, 1, 0, 0]
// [0, 0, 1, 0, 0]
// [0, 0, 1, 0, 0]
// [0, 0, 0, 0, 0]
const piece_Vertical = () => {
	return [
		[0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0]
	];
};

// piece_ZigZag
// [0, 0, 1, 1, 0]
// [0, 1, 1, 0, 0]
// [0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0]
const piece_ZigZag = () => {
	return [
		[0, 0, 1, 1, 0],
		[0, 1, 1, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0]
	];
};

// piece_Cross
// [0, 0, 1, 0, 0]
// [0, 1, 1, 1, 0]
// [0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0]
const piece_Cross = () => {
	return [
		[0, 0, 1, 0, 0],
		[0, 1, 1, 1, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0]
	];
};

const pieceGenerator = {
	0: piece_Square,
	1: piece_L,
	2: piece_Vertical,
	3: piece_ZigZag,
	4: piece_Cross,
	getPiece
};

class Board extends Component {
	state = {
		grid: generateEmptyBoard()
	};

	renderBoardItems = () => {
		const { grid } = this.state;
		return grid.map(row => {
			return row.map((item, i) => {
				return <GridItem key={`${row}-${i}`} filled={!!item} />;
			});
		});
	};

	render() {
		console.log(this.state.grid);
		return <div className="Board">{this.renderBoardItems()}</div>;
	}
}

// Thoughts... do I need react?
// Move to using canvas instead of divs...

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

//[[ 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0]]
