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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/board */ \"./src/js/modules/board.js\");\n/* harmony import */ var _modules_board__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_board__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modules_tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tile */ \"./src/js/modules/tile.js\");\n/* harmony import */ var _modules_tile__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_tile__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nlet board = new (_modules_board__WEBPACK_IMPORTED_MODULE_0___default())();\n\nboard.appendRandomTile();\nboard.appendRandomTile();\n\nfunction show() {\n  for(let x = 0; x < 4; x++) {\n    for(let y = 0; y < 4; y++) {\n      const id = \"td\" + x + \"\" + y;\n      const td = document.getElementById(id);\n      td.innerText = \"\";\n    }\n  }\n  board.tiles.forEach(tile => {\n    const id = \"td\" + tile.x + \"\" + tile.y;\n    const td = document.getElementById(id);\n    td.innerText = tile.n;\n  });\n}\n\nfunction next(m) {\n  board = board.next(m);\n  show();\n}\n\nwindow.onload = function() {\n  document.getElementById(\"button0\").onclick = function() { next(0); };\n  document.getElementById(\"button1\").onclick = function() { next(1); };\n  document.getElementById(\"button2\").onclick = function() { next(2); };\n  document.getElementById(\"button3\").onclick = function() { next(3); };\n\n  show();\n}\n\n\n//# sourceURL=webpack://10/./src/js/app.js?");

/***/ }),

/***/ "./src/js/modules/board.js":
/*!*********************************!*\
  !*** ./src/js/modules/board.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Tile = __webpack_require__(/*! ./tile */ \"./src/js/modules/tile.js\");\n\nclass Board {\n  constructor() {\n    this.tiles = [];\n  }\n\n  toMatrix() {\n    let matrix = [\n      [null, null, null, null],\n      [null, null, null, null],\n      [null, null, null, null],\n      [null, null, null, null]\n    ];\n    this.tiles.forEach(tile => {\n      matrix[tile.y][tile.x] = tile.n;\n    });\n    return matrix;\n  }\n\n  appendRandomTile() {\n    let emptyPoints = [];\n    for (let x = 0; x < 4; x++) {\n      for (let y = 0; y < 4; y++) {\n        if (!this.tiles.some(tile => tile.x == x && tile.y == y)) {\n          emptyPoints.push([x, y]);\n        }\n      }\n    }\n\n    const point = emptyPoints[Math.floor(Math.random() * emptyPoints.length)];\n    const n = Math.floor(Math.random() * 2);\n    const tile = new Tile(point[0], point[1], n);\n\n    this.tiles.push(tile);\n  }\n\n  rotate(m = 1) {\n    const board = new Board();\n    board.tiles = this.tiles.map(tile => tile.rotate(m));\n    return board;\n  }\n\n  moveLeft() {\n    const board = new Board();\n    let y = 0;\n    this.toMatrix().forEach(row => {\n      let x = 0;\n      row.filter(n => n != null).forEach(n => {\n        board.tiles.push(new Tile(x, y, n));\n        x++;\n      });\n      y++;\n    });\n    return board;\n  }\n\n  move(m) { // m = 0:left, 1:down, 2:right, 3:up\n    return this.rotate(-m).moveLeft().rotate(m);\n  }\n\n  next(m) { // m = 0:left, 1:down, 2:right, 3:up\n    const board = this.move(m);\n    board.appendRandomTile();\n    return board;\n  }\n}\n \nmodule.exports = Board;\n\n\n//# sourceURL=webpack://10/./src/js/modules/board.js?");

/***/ }),

/***/ "./src/js/modules/tile.js":
/*!********************************!*\
  !*** ./src/js/modules/tile.js ***!
  \********************************/
/***/ ((module) => {

eval("class Tile {\n  constructor(x, y, n) {\n    this.x = x;\n    this.y = y;\n    this.n = n;\n  }\n\n  toString() {\n    return this.x + \",\" + this.y + \",\" + this.n;\n  }\n\n  rotate(m = 1) {\n    m = (m + 4) % 4;\n\n    if (m > 1) {\n      return this.rotate().rotate(m - 1);\n    }\n\n    if (m == 1) {\n      const x = this.y;\n      const y = 3 - this.x;\n      const n = this.n;\n      return new Tile(x, y, n);\n    }\n\n    return this; // m == 0\n  }\n}\n \nmodule.exports = Tile;\n\n\n//# sourceURL=webpack://10/./src/js/modules/tile.js?");

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