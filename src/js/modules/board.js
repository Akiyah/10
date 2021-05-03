const Tile = require("./tile");

class Board {
  constructor() {
    this.tiles = [];
  }

  toMatrix() {
    let matrix = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];
    this.tiles.forEach(tile => {
      matrix[tile.y][tile.x] = tile.n;
    });
    return matrix;
  }

  appendRandomTile() {
    let emptyCells = [];
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (!this.tiles.some(tile => { return tile.x == x && tile.y == y; })) {
          emptyCells.push([x, y]);
        }
      }
    }

    const cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const tile = new Tile(cell[0], cell[1], Math.floor(Math.random() * 2));

    this.tiles.push(tile);
  }

  rotate(m = 1) {
    const board = new Board();
    board.tiles = this.tiles.map(tile => { return tile.rotate(m); });
    return board;
  }

  move(m) { // m = 0:left, 1:down, 2:right, 3:up
    return this.rotate(-m).moveLeft().rotate(m);
  }

  moveLeft() {
    const board = new Board();
    let y = 0;
    this.toMatrix().forEach(row => {
      let x = 0;
      row.filter(n => n != null).forEach(n => {
        board.tiles.push(new Tile(x, y, n));
        x++;
      });
      y++;
    });
    return board;
  }
}
 
module.exports = Board;
