/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/game */ \"./src/js/modules/game.js\");\n/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_game__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction refresh(game) {\n  const tilesDiv = document.getElementById('tiles');\n  while (tilesDiv.firstChild) {\n    tilesDiv.removeChild(tilesDiv.firstChild);\n  }\n\n  game.board().tiles.forEach(tile => {\n    const tileDiv = document.createElement('div');\n    tileDiv.innerText = tile.n;\n    tileDiv.classList.add(\"tile\" + tile.n);\n    tileDiv.style.top = (40 + 3 + tile.y * (80 + 6)) + 'px';\n    tileDiv.style.left = (8 + 3 + tile.x * (80 + 6)) + 'px';\n    if (tile.status) {\n      tileDiv.classList.add(tile.status);\n    }\n    tilesDiv.appendChild(tileDiv);\n  });\n\n  document.getElementById('undo').disabled = !game.isUndoable();\n  document.getElementById('redo').disabled = !game.isRedoable();\n}\n\nwindow.onload = function() {\n  const game = new (_modules_game__WEBPACK_IMPORTED_MODULE_0___default())(refresh);\n\n  document.getElementById('undo').onclick = function() { game.undo(); };\n  document.getElementById('redo').onclick = function() { game.redo(); };\n\n  const gameDiv = document.getElementById(\"game-div\"); \n  gameDiv.addEventListener(\"touchstart\", function(e) {\n    game.ontouchstart(e);\n    e.preventDefault();\n  }, { passive: false });\n  gameDiv.addEventListener(\"touchmove\", function(e) {\n    game.ontouchmove(e);\n    e.preventDefault();\n  }, { passive: false });\n  gameDiv.addEventListener(\"touchend\", function(e) {\n    game.ontouchend(e);\n  });\n\n  for(let x = 0; x < 4; x++) {\n    for(let y = 0; y < 4; y++) {\n      const id = \"td\" + x + \"\" + y;\n      const td = document.getElementById(id);\n      td.addEventListener('animationend', function(){\n        td.classList.remove('new');\n      });\n    }\n  }\n}\n\n\n\n//# sourceURL=webpack://10/./src/js/app.js?");

/***/ }),

/***/ "./src/js/modules/board.js":
/*!*********************************!*\
  !*** ./src/js/modules/board.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Tile = __webpack_require__(/*! ./tile */ \"./src/js/modules/tile.js\");\n\nclass Board {\n  constructor() {\n    this.tiles = [];\n  }\n\n  static initialize() {\n    return new Board().appendRandomTile().appendRandomTile();\n  }\n\n  toMatrix() {\n    let matrix = [\n      [null, null, null, null],\n      [null, null, null, null],\n      [null, null, null, null],\n      [null, null, null, null]\n    ];\n    this.tiles.forEach(tile => {\n      matrix[tile.y][tile.x] = tile.n;\n    });\n    return matrix;\n  }\n\n  random() {\n    return Math.floor(Math.random() * 10 / 9);\n  }\n\n  appendRandomTile() {\n    const board = new Board();\n\n    let emptyPoints = [];\n    for (let x = 0; x < 4; x++) {\n      for (let y = 0; y < 4; y++) {\n        if (!this.tiles.some(tile => tile.x == x && tile.y == y)) {\n          emptyPoints.push([x, y]);\n        }\n      }\n    }\n\n    const point = emptyPoints[Math.floor(Math.random() * emptyPoints.length)];\n    const tile = new Tile(point[0], point[1], this.random(), 'new');\n\n    board.tiles = this.tiles.concat(tile);\n\n    return board;\n  }\n\n  rotate(m = 1) {\n    const board = new Board();\n    board.tiles = this.tiles.map(tile => tile.rotate(m));\n    return board;\n  }\n\n  moveRowLeft(row) {\n    let moved = [];\n\n    row = row.filter(n => n != null);\n\n    let last = null;\n    row.forEach(n => {\n      if (last == null) {\n        last = n;\n      } else {\n        if (n == last) {\n          moved.push(last + 1);\n          last = null;\n        } else {\n          moved.push(last);\n          last = n;\n        }\n      }\n    });\n\n    if (last != null) {\n      moved.push(last);\n    }\n\n    return moved;\n  }\n\n  moveLeft() {\n    const board = new Board();\n    let y = 0;\n    this.toMatrix().forEach(row => {\n      let x = 0;\n      this.moveRowLeft(row).forEach(n => {\n        board.tiles.push(new Tile(x, y, n));\n        x++;\n      });\n      y++;\n    });\n    return board;\n  }\n\n  move(m) { // m = 0:left, 1:down, 2:right, 3:up\n    return this.rotate(-m).moveLeft().rotate(m);\n  }\n\n  isMovable(m) {\n    const moved = this.move(m);\n    return moved.toMatrix().toString() != this.toMatrix().toString();\n  }\n\n  next(m) {\n    if (this.isMovable(m)) {\n      return this.move(m).appendRandomTile();\n    }\n    return this;\n  }\n}\n \nmodule.exports = Board;\n\n\n//# sourceURL=webpack://10/./src/js/modules/board.js?");

/***/ }),

/***/ "./src/js/modules/game.js":
/*!********************************!*\
  !*** ./src/js/modules/game.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/js/modules/board.js\");\n\nclass Game {\n  constructor(callback = null) {\n    const board = Board.initialize();\n    this.boards = [board];\n    this.index = 0;\n\n    this.ontouch = false;\n    this.startPoint = null;\n    this.movePoint = null;\n    this.touchDirection = null;\n    this.callback = callback;\n\n    this.refresh();\n\n    return this;\n  }\n\n  refresh() {\n    if (this.callback) {\n      this.callback(this);\n    }\n  }\n\n  board() {\n    return this.boards[this.index];\n  }\n\n  isUndoable() {\n    return 0 < this.index;\n  }\n\n  isRedoable() {\n    return this.index < this.boards.length - 1;\n  }\n\n  undo() {\n    if (this.isUndoable()) {\n      this.index--;\n      this.refresh();\n    }\n    return this;\n  }\n\n  redo() {\n    if (this.isRedoable()) {\n      this.index++;\n      this.refresh();\n    }\n    return this;\n  }\n\n  isMovable(m) {\n    return this.board().isMovable(m);\n  }\n\n  next(m) {\n    if (this.isMovable(m)) {\n      const board = this.board().next(m);\n      this.boards = this.boards.slice(0, this.index + 1);\n      this.boards.push(board);\n      this.index++;;\n      this.refresh();\n    }\n  }\n\n  direction(startPoint, movePoint) {\n    const dx = movePoint.x - startPoint.x;\n    const dy = movePoint.y - startPoint.y;\n    if (Math.abs(dy) < Math.abs(dx)) {\n      if (0 < dx) {\n        return 2; // right\n      } else {\n        return 0; // left\n      }\n    } else {\n      if (0 < dy) {\n        return 1; // down\n      } else {\n        return 3; // up\n      }\n    }\n  }\n\n  distance(startPoint, movePoint) {\n    const dx = movePoint.x - startPoint.x;\n    const dy = movePoint.y - startPoint.y;\n    return Math.sqrt(dx * dx + dy * dy);\n  }\n\n  ontouchstart(e) {\n    let x = e.touches[0].clientX;\n    let y = e.touches[0].clientY;\n    this.startPoint = {x: x, y: y};\n    this.ontouch = true;\n  }\n\n  ontouchmove(e) {\n    if (!this.ontouch) {\n      return;\n    }\n\n    let x = e.touches[0].clientX;\n    let y = e.touches[0].clientY;\n    this.movePoint = {x: x, y: y};\n\n    const dir = this.direction(this.startPoint, this.movePoint);\n    const dist = this.distance(this.startPoint, this.movePoint);\n\n    if (this.touchDirection != null && dir != this.touchDirection) { // change touchDirection\n      this.ontouch = false;\n      this.startPoint = null;\n      this.movePoint = null;\n      this.touchDirection = null;\n      return;\n    }\n\n    this.touchDirection = dir;\n\n    if (70 < dist) { // move some distance\n      this.next(dir);\n      this.ontouch = false;\n      this.startPoint = null;\n      this.movePoint = null;\n      this.touchDirection = null;\n    }\n  }\n\n  ontouchend(e) {\n    this.ontouch = false;\n    this.startPoint = null;\n    this.movePoint = null;\n    this.touchDirection = null;\n  }\n}\n \nmodule.exports = Game;\n\n\n//# sourceURL=webpack://10/./src/js/modules/game.js?");

/***/ }),

/***/ "./src/js/modules/tile.js":
/*!********************************!*\
  !*** ./src/js/modules/tile.js ***!
  \********************************/
/***/ ((module) => {

eval("class Tile {\n  constructor(x, y, n, status = null) {\n    this.x = x;\n    this.y = y;\n    this.n = n;\n    this.status = status;\n  }\n\n  toString() {\n    if (this.status) {\n      return this.x + \",\" + this.y + \",\" + this.n + \",\" + this.status;\n    }\n    return this.x + \",\" + this.y + \",\" + this.n;\n  }\n\n  rotate(m = 1) {\n    m = (m + 4) % 4;\n\n    if (m > 1) {\n      return this.rotate().rotate(m - 1);\n    }\n\n    if (m == 1) {\n      const x = this.y;\n      const y = 3 - this.x;\n      return new Tile(x, y, this.n, this.status);\n    }\n\n    return this; // m == 0\n  }\n}\n \nmodule.exports = Tile;\n\n\n//# sourceURL=webpack://10/./src/js/modules/tile.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/app.js");
/******/ 	
/******/ })()
;