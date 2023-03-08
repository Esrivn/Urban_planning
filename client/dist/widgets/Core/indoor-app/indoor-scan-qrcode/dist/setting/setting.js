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

/***/ "./your-extensions/widgets/Core/indoor-app/indoor-scan-qrcode/src/setting/setting.tsx":
/*!********************************************************************************************!*\
  !*** ./your-extensions/widgets/Core/indoor-app/indoor-scan-qrcode/src/setting/setting.tsx ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n/* harmony import */ var jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-ui/advanced/setting-components */ \"jimu-ui/advanced/setting-components\");\n/* harmony import */ var jimu_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jimu-ui */ \"jimu-ui\");\n\r\n\r\n\r\nconst { useState, useEffect } = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React;\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {\r\n    const [urlAppViewer, setUrlAppViewer] = useState(null);\r\n    const onMapWidgetSelected = (useMapWidgetIds) => {\r\n        props.onSettingChange({\r\n            id: props.id,\r\n            useMapWidgetIds: useMapWidgetIds\r\n        });\r\n    };\r\n    useEffect(() => {\r\n        setUrlAppViewer(props.config.urlAppViewer);\r\n    }, []);\r\n    const handleOnChangeUrlAppViewer = (val) => {\r\n        setUrlAppViewer(val);\r\n        let config = Object.assign({}, props.config);\r\n        config.urlAppViewer = val;\r\n        props.onSettingChange({\r\n            id: props.id,\r\n            config\r\n        });\r\n    };\r\n    return (jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", null,\r\n        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingSection, null,\r\n            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, null,\r\n                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.JimuMapViewSelector, { onSelect: onMapWidgetSelected, useMapWidgetIds: props.useMapWidgetIds })),\r\n            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, null,\r\n                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { style: {\r\n                        display: 'flex',\r\n                        flexDirection: 'column',\r\n                        width: '100%'\r\n                    } },\r\n                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"label\", { style: {\r\n                            justifyContent: 'left'\r\n                        } }, \"Indoor view url\"),\r\n                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_2__.TextInput, { value: urlAppViewer, onChange: (evt) => handleOnChangeUrlAppViewer(evt.target.value), style: { height: '26px' }, placeholder: \"Nh\\u1EADp url...\" }))))));\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9Db3JlL2luZG9vci1hcHAvaW5kb29yLXNjYW4tcXJjb2RlL3NyYy9zZXR0aW5nL3NldHRpbmcudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUdBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBV0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvQ29yZS9pbmRvb3ItYXBwL2luZG9vci1zY2FuLXFyY29kZS9zcmMvc2V0dGluZy9zZXR0aW5nLnRzeD9mYjVhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWN0LCBqc3ggfSBmcm9tIFwiamltdS1jb3JlXCI7XHJcbmltcG9ydCB7IEFsbFdpZGdldFNldHRpbmdQcm9wcyB9IGZyb20gXCJqaW11LWZvci1idWlsZGVyXCI7XHJcbmltcG9ydCB7IElNQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBKaW11TWFwVmlld1NlbGVjdG9yLCBTZXR0aW5nUm93LCBTZXR0aW5nU2VjdGlvbiB9IGZyb20gXCJqaW11LXVpL2FkdmFuY2VkL3NldHRpbmctY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tIFwiamltdS11aVwiO1xyXG5cclxuY29uc3Qge3VzZVN0YXRlLCB1c2VFZmZlY3R9ID0gUmVhY3Q7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHM6IEFsbFdpZGdldFNldHRpbmdQcm9wczxJTUNvbmZpZz4pIHtcclxuICAgIGNvbnN0IFt1cmxBcHBWaWV3ZXIsIHNldFVybEFwcFZpZXdlcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuICAgIGNvbnN0IG9uTWFwV2lkZ2V0U2VsZWN0ZWQgPSAodXNlTWFwV2lkZ2V0SWRzOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgIHByb3BzLm9uU2V0dGluZ0NoYW5nZSh7XHJcbiAgICAgICAgICAgIGlkOiBwcm9wcy5pZCxcclxuICAgICAgICAgICAgdXNlTWFwV2lkZ2V0SWRzOiB1c2VNYXBXaWRnZXRJZHNcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBzZXRVcmxBcHBWaWV3ZXIocHJvcHMuY29uZmlnLnVybEFwcFZpZXdlcik7XHJcbiAgICB9LCBbXSlcclxuXHJcbiAgICBjb25zdCBoYW5kbGVPbkNoYW5nZVVybEFwcFZpZXdlciA9ICh2YWw6IHN0cmluZykgID0+IHtcclxuICAgICAgICBzZXRVcmxBcHBWaWV3ZXIodmFsKTtcclxuICAgICAgICBsZXQgY29uZmlnOiBhbnkgPSB7Li4ucHJvcHMuY29uZmlnfTtcclxuICAgICAgICBjb25maWcudXJsQXBwVmlld2VyID0gdmFsO1xyXG4gICAgICAgIHByb3BzLm9uU2V0dGluZ0NoYW5nZSh7XHJcbiAgICAgICAgICAgIGlkOiBwcm9wcy5pZCxcclxuICAgICAgICAgICAgY29uZmlnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8U2V0dGluZ1NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8U2V0dGluZ1Jvdz5cclxuICAgICAgICAgICAgICAgICAgICA8SmltdU1hcFZpZXdTZWxlY3RvciBvblNlbGVjdD17b25NYXBXaWRnZXRTZWxlY3RlZH0gdXNlTWFwV2lkZ2V0SWRzPXtwcm9wcy51c2VNYXBXaWRnZXRJZHN9IC8+XHJcbiAgICAgICAgICAgICAgICA8L1NldHRpbmdSb3c+XHJcblxyXG4gICAgICAgICAgICAgICAgPFNldHRpbmdSb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIHN0eWxlPXt7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdsZWZ0J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbmRvb3IgdmlldyB1cmxcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3VybEFwcFZpZXdlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZ0OiBhbnkpID0+IGhhbmRsZU9uQ2hhbmdlVXJsQXBwVmlld2VyKGV2dC50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgaGVpZ2h0OiAnMjZweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTmjhuq1wIHVybC4uLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L1NldHRpbmdSb3c+XHJcbiAgICAgICAgICAgIDwvU2V0dGluZ1NlY3Rpb24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./your-extensions/widgets/Core/indoor-app/indoor-scan-qrcode/src/setting/setting.tsx\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./your-extensions/widgets/Core/indoor-app/indoor-scan-qrcode/src/setting/setting.tsx");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});