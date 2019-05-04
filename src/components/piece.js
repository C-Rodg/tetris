// Piece wrapper class
function Piece(shapes, color) {
	this.color = color;
	this.tetri = shapes;
	this.tetriIndex = 0;
	this.activeTetri = this.tetri[this.tetriIndex];
	this.x = 3;
	this.y = -2;
}
