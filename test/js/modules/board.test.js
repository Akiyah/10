const Board = require('../../../src/js/modules/board');

test('move left', () => {
  const board = new Board();

  expect(board.move("left")).toBe("move:left");
});
