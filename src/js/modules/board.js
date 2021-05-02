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

  move(direction) {
    return "move:" + direction;
  }
}
 
module.exports = Board;
