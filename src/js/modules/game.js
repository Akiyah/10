const Board = require("./board");

class Game {
  constructor() {
    const board = Board.initialize();
    this.boards = [board];
    this.index = 0;
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
  }
}
 
module.exports = Game;
