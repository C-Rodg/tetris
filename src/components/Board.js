// Libraries
import React, { Component } from 'react';

class Board extends Component {
	state = {
		squareSize: 0
	};
	NUM_ROWS = 20;
	NUM_COLS = 10;
	ctx = null;
	constructor(props) {
		super(props);
		this.boardWrapper = React.createRef();
		this.board = React.createRef();
	}

	componentDidMount() {
		// TODO: TESTING
		window.CTX = this.ctx;
	}

	componentDidUpdate(prevProps) {
		// Calculate board dimensions on game start
		if (!prevProps.gameStarted && this.props.gameStarted) {
			this.calculateSquareDimensions();
		}
	}

	// Determine the board size based off of the window size
	calculateSquareDimensions = () => {
		if (!this.board.current || !this.boardWrapper.current) {
			return;
		}
		this.ctx = this.board.current.getContext('2d');
		const boardWrapper = this.boardWrapper.current;
		const bwWidth = boardWrapper.clientWidth;
		const bwHeight = boardWrapper.clientHeight;
		const board = this.board.current;

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
		this.setState({
			squareSize: Math.floor(Math.floor(board.width) / this.NUM_COLS)
		});
	};

	// Function to draw a square to the board - should this instead be on the Piece prototype?
	drawSquare = (x, y, color) => {
		const { squareSize } = this.state;
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
		this.ctx.strokeStyle = 'black';
		this.ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
	};

	render() {
		return (
			<div className="Board" ref={this.boardWrapper}>
				{this.props.gameStarted && <canvas ref={this.board} />}
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
