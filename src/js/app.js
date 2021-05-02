import sum from './modules/sum';
import Board from './modules/board';

console.log(sum(1, 2));

const board = new Board();
console.log(board.move("left"));
