const Board = require('../../../src/js/modules/board');
const Tile = require('../../../src/js/modules/tile');

test('constructor', () => {
  const board = new Board();

  expect(board.tiles.length).toBe(0);
});

test('initialize', () => {
  const board = Board.initialize();

  expect(board.tiles.length).toBe(2);
});

describe('#toMatrix', () => {
  test('emptty', () => {
    const board = new Board();

    expect(board.toMatrix()).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ]);
  });

  test('1 tile', () => {
    const board = new Board();
    board.tiles.push(new Tile(1, 2, 5));

    expect(board.toMatrix()).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null,    5, null, null],
      [null, null, null, null]
    ]);
  });

  test('16 tiles', () => {
    const board = new Board();
    board.tiles = [
      new Tile(0, 0, 0),
      new Tile(1, 0, 1),
      new Tile(2, 0, 2),
      new Tile(3, 0, 3),
      new Tile(0, 1, 4),
      new Tile(1, 1, 5),
      new Tile(2, 1, 6),
      new Tile(3, 1, 7),
      new Tile(0, 2, 8),
      new Tile(1, 2, 9),
      new Tile(2, 2, 10),
      new Tile(3, 2, 11),
      new Tile(0, 3, 12),
      new Tile(1, 3, 13),
      new Tile(2, 3, 14),
      new Tile(3, 3, 15)
    ];

    expect(board.toMatrix()).toEqual([
      [ 0,  1,  2,  3],
      [ 4,  5,  6,  7],
      [ 8,  9, 10, 11],
      [12, 13, 14, 15]
    ]);
  });
});

test('#random', () => {
  const board = new Board();
  let ns = [];

  for (let i = 0; i < 1000; i++) {
    ns.push(board.random());
  } 

  expect(ns.every(n => n == 0 || n == 1)).toBeTruthy();
  expect(ns.filter(n => n == 0).length > 890).toBeTruthy();
  expect(ns.filter(n => n == 1).length < 110).toBeTruthy();
});


describe('#appendRandomTile', () => {
  test('empty', () => {
    const lastBoard = new Board();
    const board = lastBoard.appendRandomTile();

    expect(board.tiles.length).toBe(1);
    expect(board.tiles[0].n == 0 || board.tiles[0].n == 1).toBeTruthy();
  });

  test('exists 1 tile', () => {
    const lastBoard = new Board();
    lastBoard.tiles.push(new Tile(1, 2, 5));
    const board = lastBoard.appendRandomTile();

    expect(board.tiles.length).toBe(2);
    expect(board.tiles[1].n == 0 || board.tiles[1].n == 1).toBeTruthy();
    expect(board.tiles[1].x == 1 && board.tiles[1].y == 2).toBeFalsy();
  });

  test('exist 15 tiles', () => {
    const lastBoard = new Board();
    lastBoard.tiles = [
      new Tile(0, 0, 0),
      new Tile(1, 0, 1),
      new Tile(2, 0, 2),
      new Tile(3, 0, 3),
      new Tile(0, 1, 4),
      new Tile(1, 1, 5),
      new Tile(2, 1, 6),
      new Tile(3, 1, 7),
      new Tile(0, 2, 8),
      new Tile(1, 2, 9),
      new Tile(2, 2, 10),
      new Tile(3, 2, 11),
      new Tile(0, 3, 12),
      new Tile(1, 3, 13),
      new Tile(2, 3, 14)
    ];
    const board = lastBoard.appendRandomTile();

    expect(board.tiles.length).toBe(16);
    expect(board.tiles[15].n == 0 || board.tiles[15].n == 1).toBeTruthy();
    expect(board.tiles[15].x == 3 && board.tiles[15].y == 3).toBeTruthy();
  });
});

describe('#rorate', () => {
  test('1 tile', () => {
    const board = new Board();
    board.tiles.push(new Tile(1, 2, 5));

    expect(board.rotate().toMatrix()).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, null,    5, null],
      [null, null, null, null]
    ]);
  });

  test('16 tiles', () => {
    const board = new Board();
    board.tiles = [
      new Tile(0, 0, 0),
      new Tile(1, 0, 1),
      new Tile(2, 0, 2),
      new Tile(3, 0, 3),
      new Tile(0, 1, 4),
      new Tile(1, 1, 5),
      new Tile(2, 1, 6),
      new Tile(3, 1, 7),
      new Tile(0, 2, 8),
      new Tile(1, 2, 9),
      new Tile(2, 2, 10),
      new Tile(3, 2, 11),
      new Tile(0, 3, 12),
      new Tile(1, 3, 13),
      new Tile(2, 3, 14),
      new Tile(3, 3, 15)
    ];

    expect(board.toMatrix()).toEqual([ // before
      [ 0,  1,  2,  3],
      [ 4,  5,  6,  7],
      [ 8,  9, 10, 11],
      [12, 13, 14, 15]
    ]);

    expect(board.rotate().toMatrix()).toEqual([
      [ 3,  7, 11, 15],
      [ 2,  6, 10, 14],
      [ 1,  5,  9, 13],
      [ 0,  4,  8, 12]
    ]);
  });

  test('with argument', () => {
    const board = new Board();
    board.tiles.push(new Tile(1, 2, 5));

    expect(board.rotate(0).toMatrix()).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null,    5, null, null],
      [null, null, null, null]
    ]);

    expect(board.rotate(2).toMatrix()).toEqual([
      [null, null, null, null],
      [null, null,    5, null],
      [null, null, null, null],
      [null, null, null, null]
    ]);

    expect(board.rotate(-1).toMatrix()).toEqual([
      [null, null, null, null],
      [null,    5, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ]);
  });
});

describe('#moveRowLeft', () => {
  test('1 tile', () => {
    const board = new Board();

    expect(board.moveRowLeft([null,    5, null, null])).toEqual([5]);
    expect(board.moveRowLeft([null, null, null,    0])).toEqual([0]);
    expect(board.moveRowLeft([   1, null,    1, null])).toEqual([2]);
    expect(board.moveRowLeft([null,    2,    2,    2])).toEqual([3, 2]);
    expect(board.moveRowLeft([   3,    3,    3,    3])).toEqual([4, 4]);
  });

  test('more tiles', () => {
    const board = new Board();

    board.tiles.push(new Tile(3, 0, 0));

    board.tiles.push(new Tile(0, 1, 1));
    board.tiles.push(new Tile(2, 1, 1));

    board.tiles.push(new Tile(1, 2, 2));
    board.tiles.push(new Tile(2, 2, 2));
    board.tiles.push(new Tile(3, 2, 2));

    board.tiles.push(new Tile(0, 3, 3));
    board.tiles.push(new Tile(1, 3, 3));
    board.tiles.push(new Tile(2, 3, 3));
    board.tiles.push(new Tile(3, 3, 3));

    expect(board.toMatrix()).toEqual([ // before
      [null, null, null,    0],
      [   1, null,    1, null],
      [null,    2,    2,    2],
      [   3,    3,    3,    3]
    ]);

    expect(board.moveLeft().toMatrix()).toEqual([
      [   0, null, null, null],
      [   2, null, null, null],
      [   3,    2, null, null],
      [   4,    4, null, null]
    ]);
  });
});

describe('#moveLeft', () => {
  test('1 tile', () => {
    const board = new Board();
    board.tiles.push(new Tile(1, 2, 5));

    expect(board.moveLeft().toMatrix()).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [   5, null, null, null],
      [null, null, null, null]
    ]);
  });

  test('more tiles', () => {
    const board = new Board();

    board.tiles.push(new Tile(3, 0, 0));

    board.tiles.push(new Tile(0, 1, 1));
    board.tiles.push(new Tile(2, 1, 1));

    board.tiles.push(new Tile(1, 2, 2));
    board.tiles.push(new Tile(2, 2, 2));
    board.tiles.push(new Tile(3, 2, 2));

    board.tiles.push(new Tile(0, 3, 3));
    board.tiles.push(new Tile(1, 3, 3));
    board.tiles.push(new Tile(2, 3, 3));
    board.tiles.push(new Tile(3, 3, 3));

    expect(board.toMatrix()).toEqual([ // before
      [null, null, null,    0],
      [   1, null,    1, null],
      [null,    2,    2,    2],
      [   3,    3,    3,    3]
    ]);

    expect(board.moveLeft().toMatrix()).toEqual([
      [   0, null, null, null],
      [   2, null, null, null],
      [   3,    2, null, null],
      [   4,    4, null, null]
    ]);
  });
});

describe('#move', () => {
  test('1 tile', () => {
    const board = new Board();
    board.tiles.push(new Tile(1, 2, 5));

    expect(board.move(0).toMatrix()).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [   5, null, null, null],
      [null, null, null, null]
    ]);

    expect(board.move(1).toMatrix()).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null,    5, null, null]
    ]);

    expect(board.move(2).toMatrix()).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null,    5],
      [null, null, null, null]
    ]);

    expect(board.move(3).toMatrix()).toEqual([
      [null,    5, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ]);
  });

  test('more tiles', () => {
    const board = new Board();

    board.tiles.push(new Tile(3, 0, 0));

    board.tiles.push(new Tile(0, 1, 1));
    board.tiles.push(new Tile(2, 1, 1));

    board.tiles.push(new Tile(1, 2, 2));
    board.tiles.push(new Tile(2, 2, 2));
    board.tiles.push(new Tile(3, 2, 2));

    board.tiles.push(new Tile(0, 3, 3));
    board.tiles.push(new Tile(1, 3, 3));
    board.tiles.push(new Tile(2, 3, 3));
    board.tiles.push(new Tile(3, 3, 3));

    expect(board.toMatrix()).toEqual([ // before
      [null, null, null,    0],
      [   1, null,    1, null],
      [null,    2,    2,    2],
      [   3,    3,    3,    3]
    ]);

    expect(board.move(0).toMatrix()).toEqual([
      [   0, null, null, null],
      [   2, null, null, null],
      [   3,    2, null, null],
      [   4,    4, null, null]
    ]);
  });
});

test('#isMovable', () => {
  const board = new Board();
  board.tiles.push(new Tile(0, 0, 0));
  board.tiles.push(new Tile(0, 1, 1));
  board.tiles.push(new Tile(0, 2, 2));
  board.tiles.push(new Tile(0, 3, 3));
  board.tiles.push(new Tile(1, 3, 4));
  board.tiles.push(new Tile(2, 3, 5));
  board.tiles.push(new Tile(3, 3, 6));

  expect(board.toMatrix()).toEqual([ // before
    [   0, null, null, null],
    [   1, null, null, null],
    [   2, null, null, null],
    [   3,    4,    5,    6]
  ]);

  expect(board.isMovable(0)).toBeFalsy();
  expect(board.isMovable(1)).toBeFalsy();
  expect(board.isMovable(2)).toBeTruthy();
  expect(board.isMovable(3)).toBeTruthy();
});

describe('#next', () => {
  const lastBoard = new Board();
  lastBoard.tiles.push(new Tile(1, 3, 5));

  expect(lastBoard.toMatrix()).toEqual([ // before
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null,    5, null, null]
  ]);

  test('movable', () => {
    const board = lastBoard.next(0);

    expect(board.tiles.length).toBe(2);
    expect(board.tiles[0].toString()).toBe("0,3,5");
  });

  test('not movable', () => {
    const board = lastBoard.next(1);

    expect(board.tiles.length).toBe(1);
    expect(board.tiles[0].toString()).toBe("1,3,5");
  });
});
