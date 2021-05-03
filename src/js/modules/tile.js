class Tile {
  constructor(x, y, n) {
    this.x = x;
    this.y = y;
    this.n = n;
  }

  toString() {
    return this.x + "," + this.y + "," + this.n;
  }

  rotate() {
    let x = this.y;
    let y = 3 - this.x;
    let n = this.n;
    return new Tile(x, y, n);
  }
}
 
module.exports = Tile;
