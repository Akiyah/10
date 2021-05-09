const Tile = require("./tile");

class Board {
  constructor() {
    this.tiles = [];
  }

  static initialize() {
    return new Board().appendRandomTile().appendRandomTile();
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

  random() {
    return Math.floor(Math.random() * 10 / 9);
  }

  appendRandomTile() {
    const board = new Board();

    let emptyPoints = [];
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (!this.tiles.some(tile => tile.x == x && tile.y == y)) {
          emptyPoints.push([x, y]);
        }
      }
    }

    const point = emptyPoints[Math.floor(Math.random() * emptyPoints.length)];
    const tile = new Tile(point[0], point[1], this.random(), 'new');

    board.tiles = this.tiles.concat(tile);

    return board;
  }

  rotate(m = 1) {
    const board = new Board();
    board.tiles = this.tiles.map(tile => tile.rotate(m));
    return board;
  }

  moveRowLeft(row) {
    let moved = [];

    row = row.filter(n => n != null);

    let last = null;
    row.forEach(n => {
      if (last == null) {
        last = n;
      } else {
        if (n == last) {
          moved.push(last + 1);
          last = null;
        } else {
          moved.push(last);
          last = n;
        }
      }
    });

    if (last != null) {
      moved.push(last);
    }

    return moved;
  }

  moveLeft() {
    const board = new Board();
    let y = 0;
    this.toMatrix().forEach(row => {
      let x = 0;
      this.moveRowLeft(row).forEach(n => {
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

  isMovable(m) {
    const moved = this.move(m);
    return moved.toMatrix().toString() != this.toMatrix().toString();
  }

  next(m) {
    if (this.isMovable(m)) {
      return this.move(m).appendRandomTile();
    }
    return this;
  }
}
 
module.exports = Board;
