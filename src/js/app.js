import Game from './modules/game';

const game = new Game();

function show() {
  for(let x = 0; x < 4; x++) {
    for(let y = 0; y < 4; y++) {
      const id = "td" + x + "" + y;
      const td = document.getElementById(id);
      td.innerText = "";
      td.classList = [];
    }
  }
  game.board().tiles.forEach(tile => {
    const id = "td" + tile.x + "" + tile.y;
    const td = document.getElementById(id);
    td.innerText = tile.n;
    td.classList.add("tile" + tile.n);
  });

  document.getElementById('button0').disabled = !game.isMovable(0);
  document.getElementById('button1').disabled = !game.isMovable(1);
  document.getElementById('button2').disabled = !game.isMovable(2);
  document.getElementById('button3').disabled = !game.isMovable(3);

  document.getElementById('undo').disabled = !game.isUndoable();
  document.getElementById('redo').disabled = !game.isRedoable();
}

window.onload = function() {
  document.getElementById("button0").onclick = function() { game.next(0); show(); };
  document.getElementById("button1").onclick = function() { game.next(1); show(); };
  document.getElementById("button2").onclick = function() { game.next(2); show(); };
  document.getElementById("button3").onclick = function() { game.next(3); show(); };

  document.getElementById('undo').onclick = function() { game.undo(); show(); };
  document.getElementById('redo').onclick = function() { game.redo(); show(); };

  show();
}
