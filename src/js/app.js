import Board from './modules/board';
import Tile from './modules/tile';

let board = Board.initialize();

function show() {
  for(let x = 0; x < 4; x++) {
    for(let y = 0; y < 4; y++) {
      const id = "td" + x + "" + y;
      const td = document.getElementById(id);
      td.innerText = "";
      td.classList = [];
    }
  }
  board.tiles.forEach(tile => {
    const id = "td" + tile.x + "" + tile.y;
    const td = document.getElementById(id);
    td.innerText = tile.n;
    td.classList.add("tile" + tile.n);
  });
}

function next(m) {
  board = board.next(m);
  show();
}

window.onload = function() {
  document.getElementById("button0").onclick = function() { next(0); };
  document.getElementById("button1").onclick = function() { next(1); };
  document.getElementById("button2").onclick = function() { next(2); };
  document.getElementById("button3").onclick = function() { next(3); };

  show();
}
