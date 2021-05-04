const Game = require('../../../src/js/modules/game');
const Board = require('../../../src/js/modules/board');
const Tile = require('../../../src/js/modules/tile');

test('constructor', () => {
  const game = new Game();

  expect(game.boards.length).toBe(1);
  expect(game.index).toBe(0);
});

describe('#board', () => {
  const game = new Game();
  game.boards = ["board0", "board1", "board2"];

  test('index = 0', () => {
    game.index = 0;
    expect(game.board()).toBe("board0");
  });

  test('index = 1', () => {
    game.index = 1;
    expect(game.board()).toBe("board1");
  });

  test('index = 2', () => {
    game.index = 2;
    expect(game.board()).toBe("board2");
  });
});


describe('#isUndoable/#isRedoable', () => {
  const game = new Game();
  game.boards = ["board0", "board1", "board2"];

  test('index = 0', () => {
    game.index = 0;
    expect(game.isUndoable()).toBeFalsy();
    expect(game.isRedoable()).toBeTruthy();
  });

  test('index = 1', () => {
    game.index = 1;
    expect(game.isUndoable()).toBeTruthy();
    expect(game.isRedoable()).toBeTruthy();
  });

  test('index = 2', () => {
    game.index = 2;
    expect(game.isUndoable()).toBeTruthy();
    expect(game.isRedoable()).toBeFalsy();
  });
});

describe('#undo/#redo', () => {
  const game = new Game();
  game.boards = ["board0", "board1", "board2"];

  beforeEach(() => {
    game.index = 1;
  });

  test('#undo', () => {
    game.undo();
    expect(game.index).toBe(0);
    expect(game.board()).toBe("board0");
  });

  test('#redo', () => {
    game.redo();
    expect(game.index).toBe(2);
    expect(game.board()).toBe("board2");
  });
});

test('#isMovable', () => {
  const game = new Game();
  const board = new Board();
  board.tiles = [new Tile(1,3,5)];
  game.boards = [board];
  game.index = 0;

  expect(game.isMovable(0)).toBeTruthy();
  expect(game.isMovable(1)).toBeFalsy();
  expect(game.isMovable(2)).toBeTruthy();
  expect(game.isMovable(3)).toBeTruthy();
});

describe('#next', () => {
  test('create new board', () => {
    const game = new Game();
    const board = new Board();
    board.tiles = [new Tile(1,2,5)];
    game.boards = [board];
    game.index = 0;

    game.next(0);
    expect(game.index).toBe(1);
    expect(game.boards.length).toBe(2);
    expect(game.board().tiles.length).toBe(2);

    game.next(2);
    expect(game.index).toBe(2);
    expect(game.boards.length).toBe(3);
    expect(game.board().tiles.length).toBe(3);
  });

  test('remove redo history', () => {
    const game = new Game();
    const board = new Board();
    board.tiles = [new Tile(1,2,5)];
    game.boards = [board, "board", "board"];
    game.index = 0;

    // before
    expect(game.index).toBe(0);
    expect(game.boards.length).toBe(3);
    expect(game.board().tiles.length).toBe(1);

    game.next(0);
    expect(game.index).toBe(1);
    expect(game.boards.length).toBe(2);
    expect(game.board().tiles.length).toBe(2);
  });
});
