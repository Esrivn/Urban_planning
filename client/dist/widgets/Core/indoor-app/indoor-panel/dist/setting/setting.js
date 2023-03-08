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

/***/ "./your-extensions/widgets/Core/indoor-app/indoor-panel/src/setting/setting.tsx":
/*!**************************************************************************************!*\
  !*** ./your-extensions/widgets/Core/indoor-app/indoor-panel/src/setting/setting.tsx ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n/* harmony import */ var jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-ui/advanced/setting-components */ \"jimu-ui/advanced/setting-components\");\n/* harmony import */ var jimu_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jimu-ui */ \"jimu-ui\");\n// import {React, FormattedMessage} from 'jimu-core';\r\n// import {AllWidgetSettingProps} from 'jimu-for-builder';\r\n// import {IMConfig} from '../config';\r\n// import defaultI18nMessages from './translations/default';\r\n// import {Input} from '../../../../core-prime';\r\n// export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig>, any>{\r\n//   onP1Change = (evt: React.FormEvent<HTMLInputElement>) => {\r\n//     this.props.onSettingChange({\r\n//       id: this.props.id,\r\n//       config: this.props.config.set('p1', evt.currentTarget.value)\r\n//     });\r\n//   }\r\n//   onP2Change = (evt) => {\r\n//     this.props.onSettingChange({\r\n//       id: this.props.id,\r\n//       config: this.props.config.set('p2', evt.target.value)\r\n//     });\r\n//   }\r\n//   onP3Change = (evt) => {\r\n//     this.props.onSettingChange({\r\n//       id: this.props.id,\r\n//       config: this.props.config.set('test', evt.target.value)\r\n//     });\r\n//   }\r\n//   render(){\r\n//     return <div className=\"widget-setting-demo\">\r\n//       {/* <div><FormattedMessage id=\"p1\" defaultMessage={defaultI18nMessages.p1}/>: <input defaultValue={this.props.config.p1} onChange={this.onP1Change}/></div>\r\n//       <div><FormattedMessage id=\"p2\" defaultMessage={defaultI18nMessages.p2}/>: <input defaultValue={this.props.config.p2} onChange={this.onP2Change}/></div> */}\r\n//       a1: <Input value={this.props.config.p2} onChange={this.onP2Change} />\r\n//       a2: <Input value={this.props.config.test} onChange={this.onP3Change} />\r\n//     </div>\r\n//   }\r\n// }\r\n/** @jsx jsx */\r\n\r\n\r\n\r\nconst { useState, useEffect } = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React;\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {\r\n    const [urlSysCaheWindow, setUrlSysCaheWindow] = useState(null);\r\n    const [urlConfigInit, setUrlConfigInit] = useState(null);\r\n    const [urlMapServer, setUrlMapServer] = useState(null);\r\n    const [urlFeature, setUrlFeature] = useState(null);\r\n    const [urlCategory, setUrlCategory] = useState(null);\r\n    const onMapWidgetSelected = (useMapWidgetIds) => {\r\n        props.onSettingChange({\r\n            id: props.id,\r\n            useMapWidgetIds: useMapWidgetIds\r\n        });\r\n    };\r\n    useEffect(() => {\r\n        console.log(123);\r\n        let services = props.config.services;\r\n        setUrlSysCaheWindow(props.config.SysCacheWindow);\r\n        setUrlConfigInit(props.config.ConfigInit);\r\n        setUrlMapServer(services[0].url);\r\n        setUrlFeature(services[1].url);\r\n        setUrlCategory(services[2].url);\r\n    }, []);\r\n    const handleOnChangeUrlSysCaheWindow = (val) => {\r\n        setUrlSysCaheWindow(val);\r\n        let config = Object.assign({}, props.config);\r\n        config.SysCacheWindow = val;\r\n        props.onSettingChange({\r\n            id: props.id,\r\n            config\r\n        });\r\n    };\r\n    const handleOnChangeUrlConfigInit = (val) => {\r\n        setUrlConfigInit(val);\r\n        let config = Object.assign({}, props.config);\r\n        config.ConfigInit = val;\r\n        props.onSettingChange({\r\n            id: props.id,\r\n            config\r\n        });\r\n    };\r\n    const handleOnChangeUrlMapServer = (val) => {\r\n        setUrlMapServer(val);\r\n        let config = Object.assign({}, props.config);\r\n        config.services[0].url = val;\r\n        props.onSettingChange({\r\n            id: props.id,\r\n            config\r\n        });\r\n    };\r\n    const handleOnChangeUrlFeatureServer = (val) => {\r\n        setUrlFeature(val);\r\n        let config = Object.assign({}, props.config);\r\n        config.services[1].url = val;\r\n        props.onSettingChange({\r\n            id: props.id,\r\n            config\r\n        });\r\n    };\r\n    const handleOnChangeUrlCategory = (val) => {\r\n        setUrlCategory(val);\r\n        let config = Object.assign({}, props.config);\r\n        config.services[2].url = val;\r\n        props.onSettingChange({\r\n            id: props.id,\r\n            config\r\n        });\r\n    };\r\n    return ((0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", null,\r\n        (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingSection, null,\r\n            (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, null,\r\n                (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.JimuMapViewSelector, { onSelect: onMapWidgetSelected, useMapWidgetIds: props.useMapWidgetIds })),\r\n            (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, null,\r\n                (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", { style: {\r\n                        display: 'flex',\r\n                        flexDirection: 'column',\r\n                        width: '100%'\r\n                    } },\r\n                    (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"label\", { style: {\r\n                            justifyContent: 'left'\r\n                        } }, \"Cache window\"),\r\n                    (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui__WEBPACK_IMPORTED_MODULE_2__.TextInput, { value: urlSysCaheWindow, onChange: (evt) => handleOnChangeUrlSysCaheWindow(evt.target.value), style: { height: '26px' }, placeholder: \"Nh\\u1EADp url...\" }))),\r\n            (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, null,\r\n                (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", { style: {\r\n                        display: 'flex',\r\n                        flexDirection: 'column',\r\n                        width: '100%'\r\n                    } },\r\n                    (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"label\", { style: {\r\n                            justifyContent: 'left'\r\n                        } }, \"Config init\"),\r\n                    (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui__WEBPACK_IMPORTED_MODULE_2__.TextInput, { value: urlConfigInit, onChange: (evt) => handleOnChangeUrlConfigInit(evt.target.value), style: { height: '26px' }, placeholder: \"Nh\\u1EADp url...\" }))),\r\n            (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, null,\r\n                (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", { style: {\r\n                        display: 'flex',\r\n                        flexDirection: 'column',\r\n                        width: '100%'\r\n                    } },\r\n                    (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"label\", { style: {\r\n                            justifyContent: 'left'\r\n                        } }, \"MapServer url\"),\r\n                    (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui__WEBPACK_IMPORTED_MODULE_2__.TextInput, { value: urlMapServer, onChange: (evt) => handleOnChangeUrlMapServer(evt.target.value), style: { height: '26px' }, placeholder: \"Nh\\u1EADp url...\" }))),\r\n            (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, null,\r\n                (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", { style: {\r\n                        display: 'flex',\r\n                        flexDirection: 'column',\r\n                        width: '100%'\r\n                    } },\r\n                    (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"label\", { style: {\r\n                            justifyContent: 'left'\r\n                        } }, \"FeatureServer url\"),\r\n                    (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui__WEBPACK_IMPORTED_MODULE_2__.TextInput, { value: urlFeature, onChange: (evt) => handleOnChangeUrlFeatureServer(evt.target.value), style: { height: '26px' }, placeholder: \"Nh\\u1EADp url...\" }))),\r\n            (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, null,\r\n                (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", { style: {\r\n                        display: 'flex',\r\n                        flexDirection: 'column',\r\n                        width: '100%'\r\n                    } },\r\n                    (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"label\", { style: {\r\n                            justifyContent: 'left'\r\n                        } }, \"Category url\"),\r\n                    (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui__WEBPACK_IMPORTED_MODULE_2__.TextInput, { value: urlCategory, onChange: (evt) => handleOnChangeUrlCategory(evt.target.value), style: { height: '26px' }, placeholder: \"Nh\\u1EADp url...\" }))))));\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9Db3JlL2luZG9vci1hcHAvaW5kb29yLXBhbmVsL3NyYy9zZXR0aW5nL3NldHRpbmcudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBU0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFTQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBV0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvQ29yZS9pbmRvb3ItYXBwL2luZG9vci1wYW5lbC9zcmMvc2V0dGluZy9zZXR0aW5nLnRzeD8wNjhjIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyBpbXBvcnQge1JlYWN0LCBGb3JtYXR0ZWRNZXNzYWdlfSBmcm9tICdqaW11LWNvcmUnO1xyXG4vLyBpbXBvcnQge0FsbFdpZGdldFNldHRpbmdQcm9wc30gZnJvbSAnamltdS1mb3ItYnVpbGRlcic7XHJcbi8vIGltcG9ydCB7SU1Db25maWd9IGZyb20gJy4uL2NvbmZpZyc7XHJcbi8vIGltcG9ydCBkZWZhdWx0STE4bk1lc3NhZ2VzIGZyb20gJy4vdHJhbnNsYXRpb25zL2RlZmF1bHQnO1xyXG4vLyBpbXBvcnQge0lucHV0fSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlLXByaW1lJztcclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PEFsbFdpZGdldFNldHRpbmdQcm9wczxJTUNvbmZpZz4sIGFueT57XHJcbi8vICAgb25QMUNoYW5nZSA9IChldnQ6IFJlYWN0LkZvcm1FdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4vLyAgICAgdGhpcy5wcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4vLyAgICAgICBpZDogdGhpcy5wcm9wcy5pZCxcclxuLy8gICAgICAgY29uZmlnOiB0aGlzLnByb3BzLmNvbmZpZy5zZXQoJ3AxJywgZXZ0LmN1cnJlbnRUYXJnZXQudmFsdWUpXHJcbi8vICAgICB9KTtcclxuLy8gICB9XHJcblxyXG4vLyAgIG9uUDJDaGFuZ2UgPSAoZXZ0KSA9PiB7XHJcbi8vICAgICB0aGlzLnByb3BzLm9uU2V0dGluZ0NoYW5nZSh7XHJcbi8vICAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxyXG4vLyAgICAgICBjb25maWc6IHRoaXMucHJvcHMuY29uZmlnLnNldCgncDInLCBldnQudGFyZ2V0LnZhbHVlKVxyXG4vLyAgICAgfSk7XHJcbi8vICAgfVxyXG5cclxuLy8gICBvblAzQ2hhbmdlID0gKGV2dCkgPT4ge1xyXG4vLyAgICAgdGhpcy5wcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4vLyAgICAgICBpZDogdGhpcy5wcm9wcy5pZCxcclxuLy8gICAgICAgY29uZmlnOiB0aGlzLnByb3BzLmNvbmZpZy5zZXQoJ3Rlc3QnLCBldnQudGFyZ2V0LnZhbHVlKVxyXG4vLyAgICAgfSk7XHJcbi8vICAgfVxyXG5cclxuLy8gICByZW5kZXIoKXtcclxuLy8gICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1zZXR0aW5nLWRlbW9cIj5cclxuLy8gICAgICAgey8qIDxkaXY+PEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwMVwiIGRlZmF1bHRNZXNzYWdlPXtkZWZhdWx0STE4bk1lc3NhZ2VzLnAxfS8+OiA8aW5wdXQgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmNvbmZpZy5wMX0gb25DaGFuZ2U9e3RoaXMub25QMUNoYW5nZX0vPjwvZGl2PlxyXG4vLyAgICAgICA8ZGl2PjxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwicDJcIiBkZWZhdWx0TWVzc2FnZT17ZGVmYXVsdEkxOG5NZXNzYWdlcy5wMn0vPjogPGlucHV0IGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5jb25maWcucDJ9IG9uQ2hhbmdlPXt0aGlzLm9uUDJDaGFuZ2V9Lz48L2Rpdj4gKi99XHJcbi8vICAgICAgIGExOiA8SW5wdXQgdmFsdWU9e3RoaXMucHJvcHMuY29uZmlnLnAyfSBvbkNoYW5nZT17dGhpcy5vblAyQ2hhbmdlfSAvPlxyXG4vLyAgICAgICBhMjogPElucHV0IHZhbHVlPXt0aGlzLnByb3BzLmNvbmZpZy50ZXN0fSBvbkNoYW5nZT17dGhpcy5vblAzQ2hhbmdlfSAvPlxyXG4vLyAgICAgPC9kaXY+XHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG5cclxuLyoqIEBqc3gganN4ICovXHJcbmltcG9ydCB7IFJlYWN0LCBqc3ggfSBmcm9tIFwiamltdS1jb3JlXCI7XHJcbmltcG9ydCB7IEFsbFdpZGdldFNldHRpbmdQcm9wcyB9IGZyb20gXCJqaW11LWZvci1idWlsZGVyXCI7XHJcbmltcG9ydCB7IElNQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBKaW11TWFwVmlld1NlbGVjdG9yLCBTZXR0aW5nUm93LCBTZXR0aW5nU2VjdGlvbiB9IGZyb20gXCJqaW11LXVpL2FkdmFuY2VkL3NldHRpbmctY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tICdqaW11LXVpJztcclxuXHJcbmNvbnN0IHt1c2VTdGF0ZSwgdXNlRWZmZWN0fSA9IFJlYWN0O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHM6IEFsbFdpZGdldFNldHRpbmdQcm9wczxJTUNvbmZpZz4pIHtcclxuICAgIGNvbnN0IFt1cmxTeXNDYWhlV2luZG93LCBzZXRVcmxTeXNDYWhlV2luZG93XSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gICAgY29uc3QgW3VybENvbmZpZ0luaXQsIHNldFVybENvbmZpZ0luaXRdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgICBjb25zdCBbdXJsTWFwU2VydmVyLCBzZXRVcmxNYXBTZXJ2ZXJdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgICBjb25zdCBbdXJsRmVhdHVyZSwgc2V0VXJsRmVhdHVyZV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICAgIGNvbnN0IFt1cmxDYXRlZ29yeSwgc2V0VXJsQ2F0ZWdvcnldID0gdXNlU3RhdGUobnVsbCk7XHJcblxyXG4gICAgY29uc3Qgb25NYXBXaWRnZXRTZWxlY3RlZCA9ICh1c2VNYXBXaWRnZXRJZHM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgcHJvcHMub25TZXR0aW5nQ2hhbmdlKHtcclxuICAgICAgICAgICAgaWQ6IHByb3BzLmlkLFxyXG4gICAgICAgICAgICB1c2VNYXBXaWRnZXRJZHM6IHVzZU1hcFdpZGdldElkc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKDEyMyk7XHJcbiAgICAgICAgbGV0IHNlcnZpY2VzID0gcHJvcHMuY29uZmlnLnNlcnZpY2VzO1xyXG4gICAgICAgIHNldFVybFN5c0NhaGVXaW5kb3cocHJvcHMuY29uZmlnLlN5c0NhY2hlV2luZG93KTtcclxuICAgICAgICBzZXRVcmxDb25maWdJbml0KHByb3BzLmNvbmZpZy5Db25maWdJbml0KTtcclxuICAgICAgICBzZXRVcmxNYXBTZXJ2ZXIoc2VydmljZXNbMF0udXJsKTtcclxuICAgICAgICBzZXRVcmxGZWF0dXJlKHNlcnZpY2VzWzFdLnVybCk7XHJcbiAgICAgICAgc2V0VXJsQ2F0ZWdvcnkoc2VydmljZXNbMl0udXJsKTtcclxuICAgIH0sIFtdKVxyXG5cclxuICAgIGNvbnN0IGhhbmRsZU9uQ2hhbmdlVXJsU3lzQ2FoZVdpbmRvdyA9ICh2YWw6IHN0cmluZykgID0+IHtcclxuICAgICAgICBzZXRVcmxTeXNDYWhlV2luZG93KHZhbCk7XHJcbiAgICAgICAgbGV0IGNvbmZpZzogYW55ID0gey4uLnByb3BzLmNvbmZpZ307XHJcbiAgICAgICAgY29uZmlnLlN5c0NhY2hlV2luZG93ID0gdmFsO1xyXG4gICAgICAgIHByb3BzLm9uU2V0dGluZ0NoYW5nZSh7XHJcbiAgICAgICAgICAgIGlkOiBwcm9wcy5pZCxcclxuICAgICAgICAgICAgY29uZmlnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGFuZGxlT25DaGFuZ2VVcmxDb25maWdJbml0ID0gKHZhbDogc3RyaW5nKSAgPT4ge1xyXG4gICAgICAgIHNldFVybENvbmZpZ0luaXQodmFsKTtcclxuICAgICAgICBsZXQgY29uZmlnOiBhbnkgPSB7Li4ucHJvcHMuY29uZmlnfTtcclxuICAgICAgICBjb25maWcuQ29uZmlnSW5pdCA9IHZhbDtcclxuICAgICAgICBwcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4gICAgICAgICAgICBpZDogcHJvcHMuaWQsXHJcbiAgICAgICAgICAgIGNvbmZpZ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhhbmRsZU9uQ2hhbmdlVXJsTWFwU2VydmVyID0gKHZhbDogc3RyaW5nKSAgPT4ge1xyXG4gICAgICAgIHNldFVybE1hcFNlcnZlcih2YWwpO1xyXG4gICAgICAgIGxldCBjb25maWc6IGFueSA9IHsuLi5wcm9wcy5jb25maWd9O1xyXG4gICAgICAgIGNvbmZpZy5zZXJ2aWNlc1swXS51cmwgPSB2YWw7XHJcbiAgICAgICAgcHJvcHMub25TZXR0aW5nQ2hhbmdlKHtcclxuICAgICAgICAgICAgaWQ6IHByb3BzLmlkLFxyXG4gICAgICAgICAgICBjb25maWdcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYW5kbGVPbkNoYW5nZVVybEZlYXR1cmVTZXJ2ZXIgPSAodmFsOiBzdHJpbmcpICA9PiB7XHJcbiAgICAgICAgc2V0VXJsRmVhdHVyZSh2YWwpO1xyXG4gICAgICAgIGxldCBjb25maWc6IGFueSA9IHsuLi5wcm9wcy5jb25maWd9O1xyXG4gICAgICAgIGNvbmZpZy5zZXJ2aWNlc1sxXS51cmwgPSB2YWw7XHJcbiAgICAgICAgcHJvcHMub25TZXR0aW5nQ2hhbmdlKHtcclxuICAgICAgICAgICAgaWQ6IHByb3BzLmlkLFxyXG4gICAgICAgICAgICBjb25maWdcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYW5kbGVPbkNoYW5nZVVybENhdGVnb3J5ID0gKHZhbDogc3RyaW5nKSAgPT4ge1xyXG4gICAgICAgIHNldFVybENhdGVnb3J5KHZhbCk7XHJcbiAgICAgICAgbGV0IGNvbmZpZzogYW55ID0gey4uLnByb3BzLmNvbmZpZ307XHJcbiAgICAgICAgY29uZmlnLnNlcnZpY2VzWzJdLnVybCA9IHZhbDtcclxuICAgICAgICBwcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4gICAgICAgICAgICBpZDogcHJvcHMuaWQsXHJcbiAgICAgICAgICAgIGNvbmZpZ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8U2V0dGluZ1NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8U2V0dGluZ1Jvdz5cclxuICAgICAgICAgICAgICAgICAgICA8SmltdU1hcFZpZXdTZWxlY3RvciBvblNlbGVjdD17b25NYXBXaWRnZXRTZWxlY3RlZH0gdXNlTWFwV2lkZ2V0SWRzPXtwcm9wcy51c2VNYXBXaWRnZXRJZHN9IC8+XHJcbiAgICAgICAgICAgICAgICA8L1NldHRpbmdSb3c+XHJcblxyXG4gICAgICAgICAgICAgICAgPFNldHRpbmdSb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIHN0eWxlPXt7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdsZWZ0J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYWNoZSB3aW5kb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3VybFN5c0NhaGVXaW5kb3d9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2dDogYW55KSA9PiBoYW5kbGVPbkNoYW5nZVVybFN5c0NhaGVXaW5kb3coZXZ0LnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBoZWlnaHQ6ICcyNnB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJOaOG6rXAgdXJsLi4uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvU2V0dGluZ1Jvdz5cclxuXHJcbiAgICAgICAgICAgICAgICA8U2V0dGluZ1Jvdz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgc3R5bGU9e3sgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2xlZnQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZyBpbml0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt1cmxDb25maWdJbml0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldnQ6IGFueSkgPT4gaGFuZGxlT25DaGFuZ2VVcmxDb25maWdJbml0KGV2dC50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgaGVpZ2h0OiAnMjZweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTmjhuq1wIHVybC4uLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L1NldHRpbmdSb3c+XHJcblxyXG4gICAgICAgICAgICAgICAgPFNldHRpbmdSb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIHN0eWxlPXt7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdsZWZ0J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXBTZXJ2ZXIgdXJsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt1cmxNYXBTZXJ2ZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2dDogYW55KSA9PiBoYW5kbGVPbkNoYW5nZVVybE1hcFNlcnZlcihldnQudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGhlaWdodDogJzI2cHgnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk5o4bqtcCB1cmwuLi5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9TZXR0aW5nUm93PlxyXG5cclxuICAgICAgICAgICAgICAgIDxTZXR0aW5nUm93PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17eyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnbGVmdCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRmVhdHVyZVNlcnZlciB1cmxcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3VybEZlYXR1cmV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2dDogYW55KSA9PiBoYW5kbGVPbkNoYW5nZVVybEZlYXR1cmVTZXJ2ZXIoZXZ0LnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBoZWlnaHQ6ICcyNnB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJOaOG6rXAgdXJsLi4uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvU2V0dGluZ1Jvdz5cclxuXHJcbiAgICAgICAgICAgICAgICA8U2V0dGluZ1Jvdz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgc3R5bGU9e3sgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2xlZnQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhdGVnb3J5IHVybFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dXJsQ2F0ZWdvcnl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2dDogYW55KSA9PiBoYW5kbGVPbkNoYW5nZVVybENhdGVnb3J5KGV2dC50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgaGVpZ2h0OiAnMjZweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTmjhuq1wIHVybC4uLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L1NldHRpbmdSb3c+XHJcbiAgICAgICAgICAgIDwvU2V0dGluZ1NlY3Rpb24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./your-extensions/widgets/Core/indoor-app/indoor-panel/src/setting/setting.tsx\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./your-extensions/widgets/Core/indoor-app/indoor-panel/src/setting/setting.tsx");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});