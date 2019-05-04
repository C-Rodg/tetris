// 7 Tetri pieces each with their 4 rotations

const S_PIECE = [
	[[0, 1, 1], [1, 1, 0], [0, 0, 0]],
	[[0, 1, 0], [0, 1, 1], [0, 0, 1]],
	[[0, 0, 0], [0, 1, 1], [1, 1, 0]],
	[[1, 0, 0], [1, 1, 0], [0, 1, 0]]
];

const Z_PIECE = [
	[[1, 1, 0], [0, 1, 1], [0, 0, 0]],
	[[0, 0, 1], [0, 1, 1], [0, 1, 0]],
	[[0, 0, 0], [1, 1, 0], [0, 1, 1]],
	[[0, 1, 0], [1, 1, 0], [1, 0, 0]]
];

const J_PIECE = [
	[[0, 1, 0], [0, 1, 1], [1, 1, 0]],
	[[1, 0, 0], [1, 1, 1], [0, 0, 0]],
	[[0, 1, 1], [0, 1, 0], [0, 1, 0]],
	[[0, 0, 0], [1, 1, 1], [0, 0, 1]]
];

const T_PIECE = [
	[[0, 0, 0], [1, 1, 1], [0, 1, 0]],
	[[0, 1, 0], [1, 1, 0], [0, 1, 0]],
	[[0, 1, 0], [1, 1, 1], [0, 0, 0]],
	[[0, 1, 0], [0, 1, 1], [0, 1, 0]]
];

const L_PIECE = [
	[[0, 1, 0], [0, 1, 0], [0, 1, 1]],
	[[0, 0, 0], [1, 1, 1], [1, 0, 0]],
	[[1, 1, 0], [0, 1, 0], [0, 1, 0]],
	[[0, 0, 1], [1, 1, 1], [0, 0, 0]]
];

const I_PIECE = [
	[[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
	[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
	[[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
	[[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]]
];

const BLOCK_PIECE = [[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]];
