const Game = require('../../../src/js/modules/game');
const Board = require('../../../src/js/modules/board');
const Tile = require('../../../src/js/modules/tile');

describe('constructor', () => {
  test('no callback', () => {
    const game = new Game();

    expect(game.boards.length).toBe(1);
    expect(game.index).toBe(0);
    expect(game.callback).toBe(null);
  }); 

  test('with callback', () => {
    const callback = jest.fn();
    const game = new Game(callback);

    expect(game.boards.length).toBe(1);
    expect(game.index).toBe(0);
    expect(callback.mock.calls.length).toBe(1);
  }); 
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

test('#direction', () => {
  const game = new Game();

  expect(game.direction({x: 100, y: 200}, {x: 100 - 10, y: 200     })).toBe(0); // left
  expect(game.direction({x: 100, y: 200}, {x: 100     , y: 200 + 10})).toBe(1); // down
  expect(game.direction({x: 100, y: 200}, {x: 100 + 10, y: 200     })).toBe(2); // right
  expect(game.direction({x: 100, y: 200}, {x: 100     , y: 200 - 10})).toBe(3); // up

  expect(game.direction({x: 100, y: 200}, {x: 100 - 10, y: 200 -  9})).toBe(0); // left(up)
  expect(game.direction({x: 100, y: 200}, {x: 100 - 10, y: 200 +  9})).toBe(0); // left(down)
  expect(game.direction({x: 100, y: 200}, {x: 100 -  9, y: 200 + 10})).toBe(1); // down(left)
  expect(game.direction({x: 100, y: 200}, {x: 100 +  9, y: 200 + 10})).toBe(1); // down(right)
  expect(game.direction({x: 100, y: 200}, {x: 100 + 10, y: 200 -  9})).toBe(2); // right(up)
  expect(game.direction({x: 100, y: 200}, {x: 100 + 10, y: 200 +  9})).toBe(2); // right(down)
  expect(game.direction({x: 100, y: 200}, {x: 100 -  9, y: 200 - 10})).toBe(3); // up(left)
  expect(game.direction({x: 100, y: 200}, {x: 100 +  9, y: 200 - 10})).toBe(3); // up(right)
});

test('#distance', () => {
  const game = new Game();

  expect(game.distance({x: 100, y: 200}, {x: 100 - 3, y: 200    })).toBe(3);
  expect(game.distance({x: 100, y: 200}, {x: 100    , y: 200 + 4})).toBe(4);
  expect(game.distance({x: 100, y: 200}, {x: 100 + 3, y: 200 - 4})).toBe(5);
});

describe('#ontouchstart/#ontouchmove/#ontouchend', () => {
  test('ontouchstart -> ontouchmove -> ontouchend', () => {
    const game = new Game();

    expect(game.ontouch).toBe(false);
    expect(game.startPoint).toEqual(null);
    expect(game.movePoint).toEqual(null);
    expect(game.touchDirection).toBe(null);

    game.ontouchstart({touches: [{clientX: 100, clientY: 200}]});

    expect(game.ontouch).toBe(true);
    expect(game.startPoint).toEqual({x: 100, y: 200});
    expect(game.movePoint).toEqual(null);
    expect(game.touchDirection).toBe(null);

    game.ontouchmove({touches: [{clientX: 120, clientY: 205}]});

    expect(game.ontouch).toBe(true);
    expect(game.startPoint).toEqual({x: 100, y: 200});
    expect(game.movePoint).toEqual({x: 120, y: 205});
    expect(game.touchDirection).toBe(2); // right

    game.ontouchmove({touches: [{clientX: 140, clientY: 210}]});

    expect(game.ontouch).toBe(true);
    expect(game.startPoint).toEqual({x: 100, y: 200});
    expect(game.movePoint).toEqual({x: 140, y: 210});
    expect(game.touchDirection).toBe(2); // right

    game.ontouchend();

    expect(game.ontouch).toBe(false);
    expect(game.startPoint).toEqual(null);
    expect(game.movePoint).toEqual(null);
    expect(game.touchDirection).toBe(null);
  });
});
