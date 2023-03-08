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

/***/ "./your-extensions/widgets/Core/indoor-app/indoor-panel/src/extensions/action-layout.ts":
/*!**********************************************************************************************!*\
  !*** ./your-extensions/widgets/Core/indoor-app/indoor-panel/src/extensions/action-layout.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EnumActionKeys\": () => (/* binding */ EnumActionKeys),\n/* harmony export */   \"default\": () => (/* binding */ LayoutReduxStoreExtension)\n/* harmony export */ });\nvar EnumActionKeys;\r\n(function (EnumActionKeys) {\r\n    EnumActionKeys[\"MenuItemAction\"] = \"MenuItem_Action\";\r\n    EnumActionKeys[\"GetDataCategory\"] = \"GetData_Category\";\r\n    EnumActionKeys[\"DataCategoryCurrent\"] = \"DataCategoryCurrent\";\r\n    EnumActionKeys[\"DataCategoryPrevous\"] = \"DataCategoryPrevous\";\r\n    EnumActionKeys[\"PageCategories\"] = \"PageCategories\";\r\n})(EnumActionKeys || (EnumActionKeys = {}));\r\nclass LayoutReduxStoreExtension {\r\n    constructor() {\r\n        this.id = 'layout-local-redux-store-extension';\r\n    }\r\n    getActions() {\r\n        return Object.keys(EnumActionKeys).map(k => EnumActionKeys[k]);\r\n    }\r\n    getReducer() {\r\n        return (localState, action, appState) => {\r\n            switch (action.type) {\r\n                case EnumActionKeys.MenuItemAction:\r\n                    return localState.set('typeLayout', action.val);\r\n                case EnumActionKeys.GetDataCategory:\r\n                    return localState.set('dataCategory', action.val);\r\n                case EnumActionKeys.DataCategoryCurrent:\r\n                    return localState.set('dataCategoryCurrent', action.val);\r\n                case EnumActionKeys.DataCategoryPrevous:\r\n                    return localState.set('dataCategoryPrevous', action.val);\r\n                case EnumActionKeys.PageCategories:\r\n                    return localState.set('pageCategories', action.val);\r\n                default:\r\n                    return localState;\r\n            }\r\n        };\r\n    }\r\n    getInitLocalState() {\r\n        return {\r\n            typeLayout: {\r\n                type: '',\r\n                title: 'Indoor'\r\n            },\r\n            dataCategory: null,\r\n            dataCategoryCurrent: null,\r\n            dataCategoryPrevous: null,\r\n            pageCategories: [\r\n                {\r\n                    type: '',\r\n                    title: 'Indoor',\r\n                    subTitle: '',\r\n                    data: null,\r\n                    level: 0,\r\n                    page: 0\r\n                }\r\n            ]\r\n        };\r\n    }\r\n    getStoreKey() {\r\n        return 'layoutState';\r\n    }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9Db3JlL2luZG9vci1hcHAvaW5kb29yLXBhbmVsL3NyYy9leHRlbnNpb25zL2FjdGlvbi1sYXlvdXQudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBOENBO0FBQUE7QUFDQTtBQXNEQTtBQXBEQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9Db3JlL2luZG9vci1hcHAvaW5kb29yLXBhbmVsL3NyYy9leHRlbnNpb25zL2FjdGlvbi1sYXlvdXQudHM/YWEzOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHRlbnNpb25TcGVjLCBJbW11dGFibGVPYmplY3QsIElNU3RhdGUgfSBmcm9tICdqaW11LWNvcmUnO1xyXG5cclxuZXhwb3J0IGVudW0gRW51bUFjdGlvbktleXMge1xyXG4gICAgTWVudUl0ZW1BY3Rpb24gPSAnTWVudUl0ZW1fQWN0aW9uJyxcclxuICAgIEdldERhdGFDYXRlZ29yeSA9ICdHZXREYXRhX0NhdGVnb3J5JyxcclxuICAgIERhdGFDYXRlZ29yeUN1cnJlbnQgPSAnRGF0YUNhdGVnb3J5Q3VycmVudCcsXHJcbiAgICBEYXRhQ2F0ZWdvcnlQcmV2b3VzID0gJ0RhdGFDYXRlZ29yeVByZXZvdXMnLFxyXG4gICAgUGFnZUNhdGVnb3JpZXMgPSAnUGFnZUNhdGVnb3JpZXMnXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1lbnVJdGVtQWN0aW9uIHtcclxuICAgIHR5cGU6IEVudW1BY3Rpb25LZXlzLk1lbnVJdGVtQWN0aW9uO1xyXG4gICAgdmFsOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdldERhdGFDYXRlZ29yeSB7XHJcbiAgICB0eXBlOiBFbnVtQWN0aW9uS2V5cy5HZXREYXRhQ2F0ZWdvcnk7XHJcbiAgICB2YWw6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUNhdGVnb3J5Q3VycmVudCB7XHJcbiAgICB0eXBlOiBFbnVtQWN0aW9uS2V5cy5EYXRhQ2F0ZWdvcnlDdXJyZW50O1xyXG4gICAgdmFsOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFDYXRlZ29yeVByZXZvdXMge1xyXG4gICAgdHlwZTogRW51bUFjdGlvbktleXMuRGF0YUNhdGVnb3J5UHJldm91cztcclxuICAgIHZhbDogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQYWdlQ2F0ZWdvcmllcyB7XHJcbiAgICB0eXBlOiBFbnVtQWN0aW9uS2V5cy5QYWdlQ2F0ZWdvcmllcztcclxuICAgIHZhbDogYW55O1xyXG59XHJcblxyXG5cclxudHlwZSBBY3Rpb25UeXBlcyA9IElNZW51SXRlbUFjdGlvbiB8IElHZXREYXRhQ2F0ZWdvcnkgfCBJRGF0YUNhdGVnb3J5Q3VycmVudCB8IElEYXRhQ2F0ZWdvcnlQcmV2b3VzIHwgSVBhZ2VDYXRlZ29yaWVzXHJcblxyXG5pbnRlcmZhY2UgTGF5b3V0U3RhdGUge1xyXG4gICAgdHlwZUxheW91dDogc3RyaW5nO1xyXG4gICAgZGF0YUNhdGVnb3J5OiBhbnksXHJcbiAgICBkYXRhQ2F0ZWdvcnlDdXJyZW50OiBhbnksXHJcbiAgICBkYXRhQ2F0ZWdvcnlQcmV2b3VzOiBhbnksXHJcbiAgICBwYWdlQ2F0ZWdvcmllczogYW55XHJcbn1cclxuXHJcbnR5cGUgSU1MYXlvdXRTdGF0ZSA9IEltbXV0YWJsZU9iamVjdDxMYXlvdXRTdGF0ZT47XHJcblxyXG5kZWNsYXJlIG1vZHVsZSAnamltdS1jb3JlL2xpYi90eXBlcy9zdGF0ZScge1xyXG4gICAgaW50ZXJmYWNlIFN0YXRlIHtcclxuICAgICAgICBsYXlvdXRTdGF0ZT86IElNTGF5b3V0U3RhdGVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5b3V0UmVkdXhTdG9yZUV4dGVuc2lvbiBpbXBsZW1lbnRzIGV4dGVuc2lvblNwZWMuUmVkdXhTdG9yZUV4dGVuc2lvbiB7XHJcbiAgICBpZCA9ICdsYXlvdXQtbG9jYWwtcmVkdXgtc3RvcmUtZXh0ZW5zaW9uJztcclxuXHJcbiAgICBnZXRBY3Rpb25zKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhFbnVtQWN0aW9uS2V5cykubWFwKGsgPT4gRW51bUFjdGlvbktleXNba10pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlZHVjZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChsb2NhbFN0YXRlOiBJTUxheW91dFN0YXRlLCBhY3Rpb246IEFjdGlvblR5cGVzLCBhcHBTdGF0ZTogSU1TdGF0ZSk6IElNTGF5b3V0U3RhdGUgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVudW1BY3Rpb25LZXlzLk1lbnVJdGVtQWN0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbFN0YXRlLnNldCgndHlwZUxheW91dCcsIGFjdGlvbi52YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgRW51bUFjdGlvbktleXMuR2V0RGF0YUNhdGVnb3J5OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbFN0YXRlLnNldCgnZGF0YUNhdGVnb3J5JywgYWN0aW9uLnZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBFbnVtQWN0aW9uS2V5cy5EYXRhQ2F0ZWdvcnlDdXJyZW50OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbFN0YXRlLnNldCgnZGF0YUNhdGVnb3J5Q3VycmVudCcsIGFjdGlvbi52YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgRW51bUFjdGlvbktleXMuRGF0YUNhdGVnb3J5UHJldm91czpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxTdGF0ZS5zZXQoJ2RhdGFDYXRlZ29yeVByZXZvdXMnLCBhY3Rpb24udmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIEVudW1BY3Rpb25LZXlzLlBhZ2VDYXRlZ29yaWVzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbFN0YXRlLnNldCgncGFnZUNhdGVnb3JpZXMnLCBhY3Rpb24udmFsKTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsU3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW5pdExvY2FsU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZUxheW91dDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJycsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0luZG9vcidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YUNhdGVnb3J5OiBudWxsLFxyXG4gICAgICAgICAgICBkYXRhQ2F0ZWdvcnlDdXJyZW50OiBudWxsLFxyXG4gICAgICAgICAgICBkYXRhQ2F0ZWdvcnlQcmV2b3VzOiBudWxsLFxyXG4gICAgICAgICAgICBwYWdlQ2F0ZWdvcmllczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnSW5kb29yJyxcclxuICAgICAgICAgICAgICAgICAgICBzdWJUaXRsZTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbDogMCxcclxuICAgICAgICAgICAgICAgICAgICBwYWdlOiAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RvcmVLZXkoKSB7XHJcbiAgICAgICAgcmV0dXJuICdsYXlvdXRTdGF0ZSc7XHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./your-extensions/widgets/Core/indoor-app/indoor-panel/src/extensions/action-layout.ts\n");

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
/******/ 	__webpack_modules__["./your-extensions/widgets/Core/indoor-app/indoor-panel/src/extensions/action-layout.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});