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
    let emptyPoints = [];
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (!this.tiles.some(tile => tile.x == x && tile.y == y)) {
          emptyPoints.push([x, y]);
        }
      }
    }

    const point = emptyPoints[Math.floor(Math.random() * emptyPoints.length)];
    const n = Math.floor(Math.random() * 2);
    const tile = new Tile(point[0], point[1], n);

    this.tiles.push(tile);
  }

  rotate(m = 1) {
    const board = new Board();
    board.tiles = this.tiles.map(tile => tile.rotate(m));
    return board;
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

  move(m) { // m = 0:left, 1:down, 2:right, 3:up
    return this.rotate(-m).moveLeft().rotate(m);
  }

  next(m) { // m = 0:left, 1:down, 2:right, 3:up
    const board = this.move(m);
    board.appendRandomTile();
    return board;
  }
}
 
module.exports = Board;
