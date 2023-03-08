/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
System.register(["jimu-core","esri/views/MapView","esri/geometry/Extent","jimu-arcgis"], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
	var __WEBPACK_EXTERNAL_MODULE_jimu_core__ = {};
	var __WEBPACK_EXTERNAL_MODULE_esri_views_MapView__ = {};
	var __WEBPACK_EXTERNAL_MODULE_esri_geometry_Extent__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_arcgis__ = {};
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_core__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_esri_views_MapView__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_esri_geometry_Extent__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_arcgis__, "__esModule", { value: true });
	return {
		setters: [
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_core__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_esri_views_MapView__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_esri_geometry_Extent__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_arcgis__[key] = module[key];
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

/***/ "./your-extensions/widgets/Core/map-view/src/runtime/widget.tsx":
/*!**********************************************************************!*\
  !*** ./your-extensions/widgets/Core/map-view/src/runtime/widget.tsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Widget)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n/* harmony import */ var esri_views_MapView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! esri/views/MapView */ \"esri/views/MapView\");\n/* harmony import */ var esri_geometry_Extent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! esri/geometry/Extent */ \"esri/geometry/Extent\");\n/* harmony import */ var jimu_arcgis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jimu-arcgis */ \"jimu-arcgis\");\n/**\r\n  Licensing\r\n\r\n  Copyright 2022 Esri\r\n\r\n  Licensed under the Apache License, Version 2.0 (the \"License\"); You\r\n  may not use this file except in compliance with the License. You may\r\n  obtain a copy of the License at\r\n  http://www.apache.org/licenses/LICENSE-2.0\r\n\r\n  Unless required by applicable law or agreed to in writing, software\r\n  distributed under the License is distributed on an \"AS IS\" BASIS,\r\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or\r\n  implied. See the License for the specific language governing\r\n  permissions and limitations under the License.\r\n\r\n  A copy of the license is available in the repository's\r\n  LICENSE file.\r\n*/\r\n\r\n\r\n\r\n\r\nclass Widget extends jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.PureComponent {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.mapContainer = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createRef();\r\n        this.mvManager = jimu_arcgis__WEBPACK_IMPORTED_MODULE_3__.MapViewManager.getInstance();\r\n        this.onDsCreated = (webmapDs) => {\r\n            var _a;\r\n            if (!webmapDs) {\r\n                return;\r\n            }\r\n            if (!this.mvManager.getJimuMapViewById(this.props.id)) {\r\n                const options = {\r\n                    map: webmapDs.map,\r\n                    container: this.mapContainer.current\r\n                };\r\n                if ((_a = this.props.queryObject) === null || _a === void 0 ? void 0 : _a[this.props.id]) {\r\n                    const extentStr = this.props.queryObject[this.props.id].substr('extent='.length);\r\n                    let extent;\r\n                    try {\r\n                        extent = new esri_geometry_Extent__WEBPACK_IMPORTED_MODULE_2__[\"default\"](JSON.parse(extentStr));\r\n                    }\r\n                    catch (err) {\r\n                        console.error('Bad extent URL parameter.');\r\n                    }\r\n                    if (extent) {\r\n                        options.extent = extent;\r\n                    }\r\n                }\r\n                this.mvManager.createJimuMapView({\r\n                    mapWidgetId: this.props.id,\r\n                    view: new esri_views_MapView__WEBPACK_IMPORTED_MODULE_1__[\"default\"](options),\r\n                    dataSourceId: webmapDs.id,\r\n                    isActive: true\r\n                }).then(jimuMapView => {\r\n                    if (!this.extentWatch) {\r\n                        this.extentWatch = jimuMapView.view.watch('extent', (extent) => {\r\n                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.jimuHistory.changeQueryObject({\r\n                                [this.props.id]: `extent=${JSON.stringify(extent.toJSON())}`\r\n                            });\r\n                        });\r\n                    }\r\n                });\r\n            }\r\n        };\r\n        this.mapNode = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { className: \"widget-map\", style: { width: '100%', height: '100%' }, ref: this.mapContainer });\r\n    }\r\n    render() {\r\n        if (!this.props.useDataSources || this.props.useDataSources.length === 0) {\r\n            return 'Select a webmap in the settings panel';\r\n        }\r\n        return jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_core__WEBPACK_IMPORTED_MODULE_0__.DataSourceComponent, { useDataSource: this.props.useDataSources[0], onDataSourceCreated: this.onDsCreated }, this.mapNode);\r\n    }\r\n}\r\nWidget.mapExtraStateProps = (state) => {\r\n    return {\r\n        queryObject: state.queryObject\r\n    };\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9Db3JlL21hcC12aWV3L3NyYy9ydW50aW1lL3dpZGdldC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFPQTtBQUFBOztBQUNBO0FBS0E7QUFRQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBVUE7QUFSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7O0FBdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvQ29yZS9tYXAtdmlldy9zcmMvcnVudGltZS93aWRnZXQudHN4P2I2ZTUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAgTGljZW5zaW5nXHJcblxyXG4gIENvcHlyaWdodCAyMDIyIEVzcmlcclxuXHJcbiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgWW91XHJcbiAgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcclxuICBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG4gIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yXHJcbiAgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nXHJcbiAgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG5cclxuICBBIGNvcHkgb2YgdGhlIGxpY2Vuc2UgaXMgYXZhaWxhYmxlIGluIHRoZSByZXBvc2l0b3J5J3NcclxuICBMSUNFTlNFIGZpbGUuXHJcbiovXHJcbmltcG9ydCB7IFJlYWN0LCBqaW11SGlzdG9yeSwgRGF0YVNvdXJjZUNvbXBvbmVudCwgQWxsV2lkZ2V0UHJvcHMsIElNU3RhdGUsIElNVXJsUGFyYW1ldGVycyB9IGZyb20gJ2ppbXUtY29yZSc7XHJcblxyXG5pbXBvcnQgTWFwVmlldyBmcm9tIFwiZXNyaS92aWV3cy9NYXBWaWV3XCI7XHJcbmltcG9ydCBXZWJNYXAgZnJvbSBcImVzcmkvV2ViTWFwXCI7XHJcbmltcG9ydCBFeHRlbnQgZnJvbSBcImVzcmkvZ2VvbWV0cnkvRXh0ZW50XCI7XHJcblxyXG5pbXBvcnQgeyBNYXBWaWV3TWFuYWdlciwgV2ViTWFwRGF0YVNvdXJjZSB9IGZyb20gJ2ppbXUtYXJjZ2lzJztcclxuXHJcbmludGVyZmFjZSBFeHRyYVByb3BzIHtcclxuICBxdWVyeU9iamVjdDogSU1VcmxQYXJhbWV0ZXJzO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lkZ2V0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxBbGxXaWRnZXRQcm9wczx7fT4gJiBFeHRyYVByb3BzLCB7fT57XHJcbiAgbWFwQ29udGFpbmVyID0gUmVhY3QuY3JlYXRlUmVmPEhUTUxEaXZFbGVtZW50PigpO1xyXG4gIG1hcFZpZXc6IE1hcFZpZXc7XHJcbiAgd2ViTWFwOiBXZWJNYXA7XHJcbiAgZXh0ZW50V2F0Y2g6IF9fZXNyaS5XYXRjaEhhbmRsZTtcclxuXHJcbiAgbXZNYW5hZ2VyOiBNYXBWaWV3TWFuYWdlciA9IE1hcFZpZXdNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcblxyXG4gIHN0YXRpYyBtYXBFeHRyYVN0YXRlUHJvcHMgPSAoc3RhdGU6IElNU3RhdGUpOiBFeHRyYVByb3BzID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHF1ZXJ5T2JqZWN0OiBzdGF0ZS5xdWVyeU9iamVjdFxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG9uRHNDcmVhdGVkID0gKHdlYm1hcERzOiBXZWJNYXBEYXRhU291cmNlKSA9PiB7XHJcbiAgICBpZiAoIXdlYm1hcERzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMubXZNYW5hZ2VyLmdldEppbXVNYXBWaWV3QnlJZCh0aGlzLnByb3BzLmlkKSkge1xyXG4gICAgICBjb25zdCBvcHRpb25zOiBfX2VzcmkuTWFwVmlld1Byb3BlcnRpZXMgPSB7XHJcbiAgICAgICAgbWFwOiB3ZWJtYXBEcy5tYXAsXHJcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLm1hcENvbnRhaW5lci5jdXJyZW50XHJcbiAgICAgIH07XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLnF1ZXJ5T2JqZWN0Py5bdGhpcy5wcm9wcy5pZF0pIHtcclxuICAgICAgICBjb25zdCBleHRlbnRTdHIgPSB0aGlzLnByb3BzLnF1ZXJ5T2JqZWN0W3RoaXMucHJvcHMuaWRdLnN1YnN0cignZXh0ZW50PScubGVuZ3RoKTtcclxuICAgICAgICBsZXQgZXh0ZW50O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBleHRlbnQgPSBuZXcgRXh0ZW50KEpTT04ucGFyc2UoZXh0ZW50U3RyKSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdCYWQgZXh0ZW50IFVSTCBwYXJhbWV0ZXIuJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChleHRlbnQpIHtcclxuICAgICAgICAgIG9wdGlvbnMuZXh0ZW50ID0gZXh0ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLm12TWFuYWdlci5jcmVhdGVKaW11TWFwVmlldyh7XHJcbiAgICAgICAgbWFwV2lkZ2V0SWQ6IHRoaXMucHJvcHMuaWQsXHJcbiAgICAgICAgdmlldzogbmV3IE1hcFZpZXcob3B0aW9ucyksXHJcbiAgICAgICAgZGF0YVNvdXJjZUlkOiB3ZWJtYXBEcy5pZCxcclxuICAgICAgICBpc0FjdGl2ZTogdHJ1ZVxyXG4gICAgICB9KS50aGVuKGppbXVNYXBWaWV3ID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuZXh0ZW50V2F0Y2gpIHtcclxuICAgICAgICAgIHRoaXMuZXh0ZW50V2F0Y2ggPSBqaW11TWFwVmlldy52aWV3LndhdGNoKCdleHRlbnQnLCAoZXh0ZW50OiBfX2VzcmkuRXh0ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGppbXVIaXN0b3J5LmNoYW5nZVF1ZXJ5T2JqZWN0KHtcclxuICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pZF06IGBleHRlbnQ9JHtKU09OLnN0cmluZ2lmeShleHRlbnQudG9KU09OKCkpfWBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtYXBOb2RlID0gPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtbWFwXCIgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScgfX0gcmVmPXt0aGlzLm1hcENvbnRhaW5lcn0+PC9kaXY+O1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMucHJvcHMudXNlRGF0YVNvdXJjZXMgfHwgdGhpcy5wcm9wcy51c2VEYXRhU291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuICdTZWxlY3QgYSB3ZWJtYXAgaW4gdGhlIHNldHRpbmdzIHBhbmVsJztcclxuICAgIH1cclxuICAgIHJldHVybiA8RGF0YVNvdXJjZUNvbXBvbmVudCB1c2VEYXRhU291cmNlPXt0aGlzLnByb3BzLnVzZURhdGFTb3VyY2VzWzBdfSBvbkRhdGFTb3VyY2VDcmVhdGVkPXt0aGlzLm9uRHNDcmVhdGVkfT5cclxuICAgICAge3RoaXMubWFwTm9kZX1cclxuICAgIDwvRGF0YVNvdXJjZUNvbXBvbmVudD47XHJcbiAgfVxyXG59XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./your-extensions/widgets/Core/map-view/src/runtime/widget.tsx\n");

/***/ }),

/***/ "esri/geometry/Extent":
/*!***************************************!*\
  !*** external "esri/geometry/Extent" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_esri_geometry_Extent__;

/***/ }),

/***/ "esri/views/MapView":
/*!*************************************!*\
  !*** external "esri/views/MapView" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_esri_views_MapView__;

/***/ }),

/***/ "jimu-arcgis":
/*!******************************!*\
  !*** external "jimu-arcgis" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_arcgis__;

/***/ }),

/***/ "jimu-core":
/*!****************************!*\
  !*** external "jimu-core" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_core__;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./your-extensions/widgets/Core/map-view/src/runtime/widget.tsx");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});