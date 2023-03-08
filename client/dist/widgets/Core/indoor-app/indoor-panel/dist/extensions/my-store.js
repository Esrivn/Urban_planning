/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
System.register([], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {


	return {

		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./your-extensions/widgets/Core/indoor-app/indoor-panel/src/extensions/my-store.ts":
/*!*****************************************************************************************!*\
  !*** ./your-extensions/widgets/Core/indoor-app/indoor-panel/src/extensions/my-store.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MyActionKeys\": () => (/* binding */ MyActionKeys),\n/* harmony export */   \"default\": () => (/* binding */ MyReduxStoreExtension)\n/* harmony export */ });\nvar MyActionKeys;\r\n(function (MyActionKeys) {\r\n    MyActionKeys[\"MyAction1\"] = \"MY_ACTION_1\";\r\n    MyActionKeys[\"MyAction2\"] = \"MY_ACTION_2\";\r\n    MyActionKeys[\"MyAction3\"] = \"MY_ACTION_3\";\r\n})(MyActionKeys || (MyActionKeys = {}));\r\nclass MyReduxStoreExtension {\r\n    constructor() {\r\n        this.id = 'my-local-redux-store-extension';\r\n    }\r\n    getActions() {\r\n        return Object.keys(MyActionKeys).map(k => MyActionKeys[k]);\r\n    }\r\n    getInitLocalState() {\r\n        return {\r\n            a: null,\r\n            b: null\r\n        };\r\n    }\r\n    getReducer() {\r\n        return (localState, action, appState) => {\r\n            switch (action.type) {\r\n                case MyActionKeys.MyAction1:\r\n                    return localState.set('a', action.val);\r\n                case MyActionKeys.MyAction2:\r\n                    return localState.set('b', action.val);\r\n                case MyActionKeys.MyAction3:\r\n                    return localState.set('c', action.val);\r\n                default:\r\n                    return localState;\r\n            }\r\n        };\r\n    }\r\n    getStoreKey() {\r\n        return 'myState';\r\n    }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9Db3JlL2luZG9vci1hcHAvaW5kb29yLXBhbmVsL3NyYy9leHRlbnNpb25zL215LXN0b3JlLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZ0NBO0FBQUE7QUFDQTtBQStCQTtBQTdCQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvQ29yZS9pbmRvb3ItYXBwL2luZG9vci1wYW5lbC9zcmMvZXh0ZW5zaW9ucy9teS1zdG9yZS50cz83ZjQ1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4dGVuc2lvblNwZWMsIEltbXV0YWJsZU9iamVjdCwgSU1TdGF0ZSB9IGZyb20gJ2ppbXUtY29yZSc7XHJcblxyXG5leHBvcnQgZW51bSBNeUFjdGlvbktleXMge1xyXG4gIE15QWN0aW9uMSA9ICdNWV9BQ1RJT05fMScsXHJcbiAgTXlBY3Rpb24yID0gJ01ZX0FDVElPTl8yJyxcclxuICBNeUFjdGlvbjMgPSAnTVlfQUNUSU9OXzMnLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbjEge1xyXG4gIHR5cGU6IE15QWN0aW9uS2V5cy5NeUFjdGlvbjE7XHJcbiAgdmFsOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uMiB7XHJcbiAgdHlwZTogTXlBY3Rpb25LZXlzLk15QWN0aW9uMjtcclxuICB2YWw6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBY3Rpb24zIHtcclxuICB0eXBlOiBNeUFjdGlvbktleXMuTXlBY3Rpb24zO1xyXG4gIHZhbDogc3RyaW5nO1xyXG59XHJcblxyXG50eXBlIEFjdGlvblR5cGVzID0gQWN0aW9uMSB8IEFjdGlvbjIgfCBBY3Rpb24zO1xyXG5cclxuaW50ZXJmYWNlIE15U3RhdGUge1xyXG4gIGE6IHN0cmluZztcclxuICBiOiBzdHJpbmc7XHJcbiAgYzogc3RyaW5nO1xyXG59XHJcbnR5cGUgSU1NeVN0YXRlID0gSW1tdXRhYmxlT2JqZWN0PE15U3RhdGU+O1xyXG5cclxuZGVjbGFyZSBtb2R1bGUgJ2ppbXUtY29yZS9saWIvdHlwZXMvc3RhdGUnIHtcclxuICBpbnRlcmZhY2UgU3RhdGUge1xyXG4gICAgbXlTdGF0ZT86IElNTXlTdGF0ZVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlSZWR1eFN0b3JlRXh0ZW5zaW9uIGltcGxlbWVudHMgZXh0ZW5zaW9uU3BlYy5SZWR1eFN0b3JlRXh0ZW5zaW9uIHtcclxuICBpZCA9ICdteS1sb2NhbC1yZWR1eC1zdG9yZS1leHRlbnNpb24nO1xyXG5cclxuICBnZXRBY3Rpb25zKCkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKE15QWN0aW9uS2V5cykubWFwKGsgPT4gTXlBY3Rpb25LZXlzW2tdKTtcclxuICB9XHJcblxyXG4gIGdldEluaXRMb2NhbFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYTogbnVsbCxcclxuICAgICAgYjogbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0UmVkdWNlcigpIHtcclxuICAgIHJldHVybiAobG9jYWxTdGF0ZTogSU1NeVN0YXRlLCBhY3Rpb246IEFjdGlvblR5cGVzLCBhcHBTdGF0ZTogSU1TdGF0ZSk6IElNTXlTdGF0ZSA9PiB7XHJcbiAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIE15QWN0aW9uS2V5cy5NeUFjdGlvbjE6XHJcbiAgICAgICAgICByZXR1cm4gbG9jYWxTdGF0ZS5zZXQoJ2EnLCBhY3Rpb24udmFsKTtcclxuICAgICAgICBjYXNlIE15QWN0aW9uS2V5cy5NeUFjdGlvbjI6XHJcbiAgICAgICAgICByZXR1cm4gbG9jYWxTdGF0ZS5zZXQoJ2InLCBhY3Rpb24udmFsKTtcclxuICAgICAgICBjYXNlIE15QWN0aW9uS2V5cy5NeUFjdGlvbjM6XHJcbiAgICAgICAgICByZXR1cm4gbG9jYWxTdGF0ZS5zZXQoJ2MnLCBhY3Rpb24udmFsKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgcmV0dXJuIGxvY2FsU3RhdGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFN0b3JlS2V5KCkge1xyXG4gICAgcmV0dXJuICdteVN0YXRlJztcclxuICB9XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./your-extensions/widgets/Core/indoor-app/indoor-panel/src/extensions/my-store.ts\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./your-extensions/widgets/Core/indoor-app/indoor-panel/src/extensions/my-store.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});