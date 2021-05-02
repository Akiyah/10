class Board {
  constructor() {
    this.tiles = [];
  }

  toMap() {
    let map = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];
    this.tiles.forEach(tile => {
      map[tile.y][tile.x] = tile.n;
    });
    return map;
  }

  appendRandomTile() {
    this.tiles.push("tile");
  }

  move(direction) {
    return "move:" + direction;
  }
}
 
module.exports = Board;
