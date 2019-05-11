// DOM
const canvas = document.getElementById('canvas-tetris');
const ctx = canvas.getContext('2d');

// Configuration
const configuration = {
	EMPTY: 'white',
	ROWS: 20,
	COLS: 10,
	squareSize: 0
};

// TODO:
// Inject rendering engine for responsive game board
