const Tile = require('../../../src/js/modules/tile');

test('constructor', () => {
  const tile = new Tile(1, 2, 5);

  expect(tile.x).toBe(1);
  expect(tile.y).toBe(2);
  expect(tile.n).toBe(5);
});
