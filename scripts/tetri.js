// Globally available function to call to create pieces
const getRandomTetriMonad = (function() {
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
		[[0, 1, 0], [0, 1, 0], [1, 1, 0]],
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

	const O_PIECE = [[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]];

	const TETRI = [
		[S_PIECE, 'green'],
		[Z_PIECE, 'blue'],
		[I_PIECE, 'cyan'],
		[O_PIECE, 'purple'],
		[L_PIECE, 'orange'],
		[T_PIECE, 'red'],
		[J_PIECE, 'yellow']
	];

	const getRandom = () => {
		const randomInt = Math.floor(Math.random() * TETRI.length);
		return TETRI[randomInt];
	};

	return getRandom;
})();
