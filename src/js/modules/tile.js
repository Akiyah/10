class Tile {
  constructor(x, y, n) {
    this.x = x;
    this.y = y;
    this.n = n;
  }

  toString() {
    return this.x + "," + this.y + "," + this.n;
  }

  rotate(m = 1) {
    m = (m + 4) % 4;

    if (m > 1) {
      return this.rotate().rotate(m - 1);
    }

    if (m == 1) {
      const x = this.y;
      const y = 3 - this.x;
      const n = this.n;
      return new Tile(x, y, n);
    }

    return this; // m == 0
  }
}
 
module.exports = Tile;
