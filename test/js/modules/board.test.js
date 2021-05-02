const Board = require('../../../src/js/modules/board');
const Tile = require('../../../src/js/modules/tile');

test('constructor', () => {
  const board = new Board();

  expect(board.tiles.length).toBe(0);
});

describe('#toMap', () => {
  test('emptty', () => {
    const board = new Board();
    const map = board.toMap()
    expect(map).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ]);
  });

  test('1 tile', () => {
    const board = new Board();
    const tile = new Tile(1, 2, 5);
    board.tiles.push(tile);
    const map = board.toMap()
    expect(map).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null,    5, null, null],
      [null, null, null, null]
    ]);
  });

  test('16 tiles', () => {
    const board = new Board();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const tile = new Tile(i, j, i + j * 4);
        board.tiles.push(tile);
      }  
    }
    const map = board.toMap()
    expect(map).toEqual([
      [ 0,  1,  2,  3],
      [ 4,  5,  6,  7],
      [ 8,  9, 10, 11],
      [12, 13, 14, 15]
    ]);
  });
});

test('#appendRandomTile', () => {
  const board = new Board();
  board.appendRandomTile();

  expect(board.tiles.length).toBe(1);
});

test('#move', () => {
  const board = new Board();

  expect(board.move("left")).toBe("move:left");
});
