/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
System.register(["jimu-core","jimu-ui/advanced/setting-components","jimu-ui"], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
	var __WEBPACK_EXTERNAL_MODULE_jimu_core__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_ui__ = {};
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_core__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_ui__, "__esModule", { value: true });
	return {
		setters: [
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_core__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_ui__[key] = module[key];
				});
			}
		],
		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./jimu-core/lib/set-public-path.ts":
/*!******************************************!*\
  !*** ./jimu-core/lib/set-public-path.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\r\n * Webpack will replace __webpack_public_path__ with __webpack_require__.p to set the public path dynamically.\r\n * The reason why we can't set the publicPath in webpack config is: we change the publicPath when download.\r\n * */\r\n// eslint-disable-next-line\r\n// @ts-ignore\r\n__webpack_require__.p = window.jimuConfig.baseUrl;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qaW11LWNvcmUvbGliL3NldC1wdWJsaWMtcGF0aC50cy5qcyIsIm1hcHBpbmdzIjoiQUFBQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vamltdS1jb3JlL2xpYi9zZXQtcHVibGljLXBhdGgudHM/OGQyYyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogV2VicGFjayB3aWxsIHJlcGxhY2UgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gd2l0aCBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgdG8gc2V0IHRoZSBwdWJsaWMgcGF0aCBkeW5hbWljYWxseS5cclxuICogVGhlIHJlYXNvbiB3aHkgd2UgY2FuJ3Qgc2V0IHRoZSBwdWJsaWNQYXRoIGluIHdlYnBhY2sgY29uZmlnIGlzOiB3ZSBjaGFuZ2UgdGhlIHB1YmxpY1BhdGggd2hlbiBkb3dubG9hZC5cclxuICogKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbi8vIEB0cy1pZ25vcmVcclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSB3aW5kb3cuamltdUNvbmZpZy5iYXNlVXJsXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./jimu-core/lib/set-public-path.ts\n");

/***/ }),

/***/ "./your-extensions/widgets/Core/multi-language/src/setting/setting.tsx":
/*!*****************************************************************************!*\
  !*** ./your-extensions/widgets/Core/multi-language/src/setting/setting.tsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n/* harmony import */ var jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-ui/advanced/setting-components */ \"jimu-ui/advanced/setting-components\");\n/* harmony import */ var jimu_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jimu-ui */ \"jimu-ui\");\n\r\n\r\n\r\nconst { useState, useEffect } = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React;\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {\r\n    const [lan, setLan] = useState('');\r\n    useEffect(() => {\r\n        let config = Object.assign({}, props.config);\r\n        if (!config.languageDefault) {\r\n            setLan('en');\r\n            config.languageDefault = 'en';\r\n        }\r\n        else {\r\n            setLan(config.languageDefault);\r\n        }\r\n        props.onSettingChange({\r\n            id: props.id,\r\n            config\r\n        });\r\n    }, []);\r\n    const handleSelected = (e, item) => {\r\n        let config = Object.assign({}, props.config);\r\n        setLan(item.props.value);\r\n        config.languageDefault = item.props.value;\r\n        props.onSettingChange({\r\n            id: props.id,\r\n            config\r\n        });\r\n    };\r\n    return (jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", null,\r\n        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingSection, null,\r\n            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, null,\r\n                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { style: {\r\n                        display: 'flex',\r\n                        flexDirection: 'column',\r\n                        width: '100%'\r\n                    } },\r\n                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"label\", { style: {\r\n                            justifyContent: 'left'\r\n                        } }),\r\n                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_2__.Select, { value: lan, onChange: (e, item) => handleSelected(e, item) },\r\n                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(Option, { value: \"vi\" }, \"Vietnamese\"),\r\n                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(Option, { value: \"en\" }, \"English\")))))));\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9Db3JlL211bHRpLWxhbmd1YWdlL3NyYy9zZXR0aW5nL3NldHRpbmcudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBSUE7QUFHQTtBQVNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL3lvdXItZXh0ZW5zaW9ucy93aWRnZXRzL0NvcmUvbXVsdGktbGFuZ3VhZ2Uvc3JjL3NldHRpbmcvc2V0dGluZy50c3g/NTY0YSJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgUmVhY3QsIGpzeCB9IGZyb20gXCJqaW11LWNvcmVcIjtcclxuaW1wb3J0IHsgQWxsV2lkZ2V0U2V0dGluZ1Byb3BzIH0gZnJvbSBcImppbXUtZm9yLWJ1aWxkZXJcIjtcclxuaW1wb3J0IHsgSU1Db25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IEppbXVNYXBWaWV3U2VsZWN0b3IsIFNldHRpbmdSb3csIFNldHRpbmdTZWN0aW9uIH0gZnJvbSBcImppbXUtdWkvYWR2YW5jZWQvc2V0dGluZy1jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IFNlbGVjdCB9IGZyb20gJ2ppbXUtdWknXHJcblxyXG5jb25zdCB7dXNlU3RhdGUsIHVzZUVmZmVjdH0gPSBSZWFjdDtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzOiBBbGxXaWRnZXRTZXR0aW5nUHJvcHM8SU1Db25maWc+KSB7XHJcbiAgICBjb25zdCBbbGFuLCBzZXRMYW5dID0gdXNlU3RhdGUoJycpO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvbmZpZzogYW55ID0gey4uLnByb3BzLmNvbmZpZ307XHJcbiAgICAgICAgaWYgKCFjb25maWcubGFuZ3VhZ2VEZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIHNldExhbignZW4nKTtcclxuICAgICAgICAgICAgY29uZmlnLmxhbmd1YWdlRGVmYXVsdCA9ICdlbic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0TGFuKGNvbmZpZy5sYW5ndWFnZURlZmF1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4gICAgICAgICAgICBpZDogcHJvcHMuaWQsXHJcbiAgICAgICAgICAgIGNvbmZpZ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgW10pXHJcblxyXG4gICAgXHJcbmNvbnN0IGhhbmRsZVNlbGVjdGVkID0gKGUsIGl0ZW0pID0+IHtcclxuICAgIGxldCBjb25maWc6IGFueSA9IHsuLi5wcm9wcy5jb25maWd9O1xyXG4gICAgc2V0TGFuKGl0ZW0ucHJvcHMudmFsdWUpO1xyXG4gICAgY29uZmlnLmxhbmd1YWdlRGVmYXVsdCA9IGl0ZW0ucHJvcHMudmFsdWU7XHJcbiAgICBwcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4gICAgICAgIGlkOiBwcm9wcy5pZCxcclxuICAgICAgICBjb25maWdcclxuICAgIH0pO1xyXG59XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8U2V0dGluZ1NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8U2V0dGluZ1Jvdz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgc3R5bGU9e3sgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2xlZnQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bGFufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlLCBpdGVtKSA9PiBoYW5kbGVTZWxlY3RlZChlLCBpdGVtKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE9wdGlvbiB2YWx1ZT1cInZpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmlldG5hbWVzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9PcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8T3B0aW9uIHZhbHVlPVwiZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZ2xpc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvT3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvU2V0dGluZ1Jvdz5cclxuICAgICAgICAgICAgPC9TZXR0aW5nU2VjdGlvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./your-extensions/widgets/Core/multi-language/src/setting/setting.tsx\n");

/***/ }),

/***/ "jimu-core":
/*!****************************!*\
  !*** external "jimu-core" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_core__;

/***/ }),

/***/ "jimu-ui":
/*!**************************!*\
  !*** external "jimu-ui" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_ui__;

/***/ }),

/***/ "jimu-ui/advanced/setting-components":
/*!******************************************************!*\
  !*** external "jimu-ui/advanced/setting-components" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__;

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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./jimu-core/lib/set-public-path.ts");
/******/ 	var __webpack_exports__ = __webpack_require__("./your-extensions/widgets/Core/multi-language/src/setting/setting.tsx");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});