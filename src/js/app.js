import Game from './modules/game';

function refresh(game) {
  const tilesDiv = document.getElementById('tiles');
  while (tilesDiv.firstChild) {
    tilesDiv.removeChild(tilesDiv.firstChild);
  }

  game.board().tiles.forEach(tile => {
    const tileDiv = document.createElement('div');
    tileDiv.innerText = tile.n;
    tileDiv.classList.add("tile" + tile.n);
    tileDiv.style.top = (40 + 3 + tile.y * (80 + 6)) + 'px';
    tileDiv.style.left = (8 + 3 + tile.x * (80 + 6)) + 'px';
    if (tile.status) {
      tileDiv.classList.add(tile.status);
    }
    tilesDiv.appendChild(tileDiv);
  });

  document.getElementById('undo').disabled = !game.isUndoable();
  document.getElementById('redo').disabled = !game.isRedoable();
}

window.onload = function() {
  const game = new Game(refresh);

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

  for(let x = 0; x < 4; x++) {
    for(let y = 0; y < 4; y++) {
      const id = "td" + x + "" + y;
      const td = document.getElementById(id);
      td.addEventListener('animationend', function(){
        td.classList.remove('new');
      });
    }
  }
}

