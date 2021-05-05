import Game from './modules/game';

const game = new Game();

function refresh() {
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

  document.getElementById('undo').disabled = !game.isUndoable();
  document.getElementById('redo').disabled = !game.isRedoable();
}

window.onload = function() {
  document.getElementById('undo').onclick = function() { game.undo(); };
  document.getElementById('redo').onclick = function() { game.redo(); };

  const gameDiv = document.getElementById("game-div"); 
  gameDiv.addEventListener("touchstart", function(e) {
    game.ontouchstart(e);
    e.preventDefault();
  }, { passive: false });
  gameDiv.addEventListener("touchmove", function(e) {
    game.ontouchmove(e);
    e.preventDefault();
  }, { passive: false });
  gameDiv.addEventListener("touchend", function(e) {
    game.ontouchend(e);
  });

  game.initialize(refresh);
}

