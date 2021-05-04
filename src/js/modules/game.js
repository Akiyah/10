const Board = require("./board");

class Game {
  constructor(callback = null) {
    const board = Board.initialize();
    this.boards = [board];
    this.index = 0;

    this.ontouch = false;
    this.startPoint = null;
    this.movePoint = null;
    this.touchDirection = null;
    this.callback = callback;
  }

  board() {
    return this.boards[this.index];
  }

  isUndoable() {
    return 0 < this.index;
  }

  isRedoable() {
    return this.index < this.boards.length - 1;
  }

  undo() {
    if (this.isUndoable()) {
      this.index--;
    }
    return this;
  }

  redo() {
    if (this.isRedoable()) {
      this.index++;
    }
    return this;
  }

  isMovable(m) {
    return this.board().isMovable(m);
  }

  next(m) {
    if (this.isMovable(m)) {
      const board = this.board().next(m);
      this.boards = this.boards.slice(0, this.index + 1);
      this.boards.push(board);
      this.index++;;
    }
    if (this.callback) {
      this.callback();
    }
  }

  direction(startPoint, movePoint) {
    const dx = movePoint.x - startPoint.x;
    const dy = movePoint.y - startPoint.y;
    if (Math.abs(dy) < Math.abs(dx)) {
      if (0 < dx) {
        return 2; // right
      } else {
        return 0; // left
      }
    } else {
      if (0 < dy) {
        return 1; // down
      } else {
        return 3; // up
      }
    }
  }

  distance(startPoint, movePoint) {
    const dx = movePoint.x - startPoint.x;
    const dy = movePoint.y - startPoint.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  ontouchstart(e) {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    this.startPoint = {x: x, y: y};
    this.ontouch = true;
  }

  ontouchmove(e) {
    if (!this.ontouch) {
      return;
    }

    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    this.movePoint = {x: x, y: y};

    const dir = this.direction(this.startPoint, this.movePoint);
    const dist = this.distance(this.startPoint, this.movePoint);

    console.log("dir : " + dir);
    console.log("dist : " + dist);

    if (this.touchDirection != null && dir != this.touchDirection) { // change touchDirection
      this.ontouch = false;
      this.startPoint = null;
      this.movePoint = null;
      this.touchDirection = null;
    }

    this.touchDirection = dir;

    if (100 < dist) { // move some distance
      this.next(dir);
      this.ontouch = false;
      this.startPoint = null;
      this.movePoint = null;
      this.touchDirection = null;
    }
  }

  ontouchend(e) {
    this.ontouch = false;
    this.startPoint = null;
    this.movePoint = null;
    this.touchDirection = null;
  }
}
 
module.exports = Game;
