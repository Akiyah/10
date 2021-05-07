const Game = require('../../../src/js/modules/game');
const Board = require('../../../src/js/modules/board');
const Tile = require('../../../src/js/modules/tile');

let game;
let board0;
let board1;
let board2;

beforeEach(() => {
  game = new Game();

  board0 = new Board();
  board1 = new Board();
  board2 = new Board();
  game.boards = [board0, board1, board2];
  game.index = 0;
});

describe('constructor', () => {
  test('no callback', () => {
    game = new Game();

    expect(game.boards.length).toBe(1);
    expect(game.index).toBe(0);
    expect(game.callback).toBe(null);
  }); 

  test('with callback', () => {
    const callback = jest.fn();
    game = new Game(callback);

    expect(game.boards.length).toBe(1);
    expect(game.index).toBe(0);
    expect(callback.mock.calls.length).toBe(1);
  }); 
});

describe('#refresh', () => {
  test('no callback', () => {
    game.callback = null;

    game.refresh(); // do nothing
  }); 

  test('with callback', () => {
    game.callback = jest.fn();

    game.refresh();

    expect(game.callback.mock.calls.length).toBe(1);
    expect(game.callback.mock.calls[0][0]).toBe(game);
  }); 
});

describe('#board', () => {
  test('index = 0', () => {
    game.index = 0;
    expect(game.board()).toBe(board0);
  });

  test('index = 1', () => {
    game.index = 1;
    expect(game.board()).toBe(board1);
  });

  test('index = 2', () => {
    game.index = 2;
    expect(game.board()).toBe(board2);
  });
});

describe('#isUndoable/#isRedoable', () => {
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
  beforeEach(() => {
    game.index = 1;
    game.callback = jest.fn();
  });

  test('#undo', () => {
    game.undo();
    expect(game.index).toBe(0);
    expect(game.board()).toBe(board0);
    expect(game.callback.mock.calls.length).toBe(1);
  });

  test('#redo', () => {
    game.redo();
    expect(game.index).toBe(2);
    expect(game.board()).toBe(board2);
    expect(game.callback.mock.calls.length).toBe(1);
  });
});

test('#isMovable', () => {
  board0.tiles = [new Tile(1,3,5)];

  expect(game.isMovable(0)).toBeTruthy();
  expect(game.isMovable(1)).toBeFalsy();
  expect(game.isMovable(2)).toBeTruthy();
  expect(game.isMovable(3)).toBeTruthy();
});

describe('#next', () => {
  beforeEach(() => {
    game.callback = jest.fn();
    board0.tiles = [new Tile(1,2,5)];

    // check
    expect(game.index).toBe(0);
    expect(game.boards.length).toBe(3);
    expect(game.board().tiles.length).toBe(1);
    expect(game.callback.mock.calls.length).toBe(0);
  });

  test('create new board', () => {
    game.next(0);
    expect(game.index).toBe(1);
    expect(game.boards.length).toBe(2);
    expect(game.board().tiles.length).toBe(2);
    expect(game.callback.mock.calls.length).toBe(1);

    game.next(2);
    expect(game.index).toBe(2);
    expect(game.boards.length).toBe(3);
    expect(game.board().tiles.length).toBe(3);
    expect(game.callback.mock.calls.length).toBe(2);
  });

  test('remove redo history', () => {
    game.next(0);
    expect(game.index).toBe(1);
    expect(game.boards.length).toBe(2);
    expect(game.board().tiles.length).toBe(2);
    expect(game.callback.mock.calls.length).toBe(1);
  });
});

test('#direction', () => {
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
  expect(game.distance({x: 100, y: 200}, {x: 100 - 3, y: 200    })).toBe(3);
  expect(game.distance({x: 100, y: 200}, {x: 100    , y: 200 + 4})).toBe(4);
  expect(game.distance({x: 100, y: 200}, {x: 100 + 3, y: 200 - 4})).toBe(5);
});

describe('#ontouchstart/#ontouchmove/#ontouchend', () => {
  beforeEach(() => {
    game.callback = jest.fn();
    board0.tiles = [new Tile(1,2,5)];

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
  });

  test('ontouchstart -> ontouchmove -> ontouchend', () => {
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

    // don't call next
    expect(game.callback.mock.calls.length).toBe(0);
  });

  test('ontouchstart -> ontouchmove -> over 100 distance', () => {
    game.ontouchmove({touches: [{clientX: 200, clientY: 225}]});

    expect(game.ontouch).toBe(false);
    expect(game.startPoint).toEqual(null);
    expect(game.movePoint).toEqual(null);
    expect(game.touchDirection).toBe(null);

    // called next
    expect(game.callback.mock.calls.length).toBe(1);
  });

  test('ontouchstart -> ontouchmove -> change direction', () => {
    game.ontouchmove({touches: [{clientX: 105, clientY: 220}]});

    expect(game.ontouch).toBe(false);
    expect(game.startPoint).toEqual(null);
    expect(game.movePoint).toEqual(null);
    expect(game.touchDirection).toBe(null);

    // don't call next
    expect(game.callback.mock.calls.length).toBe(0);
  });
});
