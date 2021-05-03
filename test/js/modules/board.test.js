const Board = require('../../../src/js/modules/board');
const Tile = require('../../../src/js/modules/tile');

test('constructor', () => {
  const board = new Board();

  expect(board.tiles.length).toBe(0);
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

describe('#appendRandomTile', () => {
  test('empty', () => {
    const board = new Board();
    board.appendRandomTile();

    expect(board.tiles.length).toBe(1);
    expect(board.tiles[0].n == 0 || board.tiles[0].n == 1).toBeTruthy();
  });

  test('exists 1 tile', () => {
    const board = new Board();
    board.tiles.push(new Tile(1, 2, 5));
    board.appendRandomTile();

    expect(board.tiles.length).toBe(2);
    expect(board.tiles[1].n == 0 || board.tiles[1].n == 1).toBeTruthy();
    expect(board.tiles[1].x == 1 && board.tiles[1].y == 2).toBeFalsy();
  });

  test('exist 15 tiles', () => {
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
      new Tile(2, 3, 14)
    ];
    board.appendRandomTile();

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
      [   1,    1, null, null],
      [   2,    2,    2, null],
      [   3,    3,    3,    3]
    ]);
  });
});
