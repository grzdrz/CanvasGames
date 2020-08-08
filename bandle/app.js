/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/game/Styles/Game.scss":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/game/Styles/Game.scss ***!
  \**********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/game/Styles/Game.scss?./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/game/Events/Event.ts":
/*!**********************************!*\
  !*** ./src/game/Events/Event.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Event {\r\n    constructor() {\r\n        this.handlers = new Array();\r\n        this.invoke = this.invoke.bind(this);\r\n        this.subscribe = this.subscribe.bind(this);\r\n    }\r\n    invoke(args) {\r\n        this.handlers.forEach((eventHandler) => eventHandler(args));\r\n    }\r\n    subscribe(handler) {\r\n        this.handlers.push(handler);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Event);\r\n\n\n//# sourceURL=webpack:///./src/game/Events/Event.ts?");

/***/ }),

/***/ "./src/game/Events/EventArgs.ts":
/*!**************************************!*\
  !*** ./src/game/Events/EventArgs.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass EventArgs {\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (EventArgs);\r\n\n\n//# sourceURL=webpack:///./src/game/Events/EventArgs.ts?");

/***/ }),

/***/ "./src/game/Events/ModelDataEventArgs.ts":
/*!***********************************************!*\
  !*** ./src/game/Events/ModelDataEventArgs.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _EventArgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventArgs */ \"./src/game/Events/EventArgs.ts\");\n\r\nclass ModelDataEventArgs extends _EventArgs__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(data) {\r\n        super();\r\n        this.data = data;\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ModelDataEventArgs);\r\n\n\n//# sourceURL=webpack:///./src/game/Events/ModelDataEventArgs.ts?");

/***/ }),

/***/ "./src/game/Events/ViewDataEventArgs.ts":
/*!**********************************************!*\
  !*** ./src/game/Events/ViewDataEventArgs.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _EventArgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventArgs */ \"./src/game/Events/EventArgs.ts\");\n\r\nclass ViewDataEventArgs extends _EventArgs__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(data) {\r\n        super();\r\n        this.data = data;\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewDataEventArgs);\r\n\n\n//# sourceURL=webpack:///./src/game/Events/ViewDataEventArgs.ts?");

/***/ }),

/***/ "./src/game/Game.ts":
/*!**************************!*\
  !*** ./src/game/Game.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MVP_Presenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MVP/Presenter */ \"./src/game/MVP/Presenter.ts\");\n/* harmony import */ var _Styles_Game_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Styles/Game.scss */ \"./src/game/Styles/Game.scss\");\n/* harmony import */ var _Styles_Game_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Styles_Game_scss__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\nconst defaultModelData = {};\r\nconst defaultViewData = {};\r\nclass Game {\r\n    constructor() {\r\n        const presenter = new _MVP_Presenter__WEBPACK_IMPORTED_MODULE_0__[\"default\"](defaultModelData, defaultViewData);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\r\n\n\n//# sourceURL=webpack:///./src/game/Game.ts?");

/***/ }),

/***/ "./src/game/MVP/Model/Data/ModelData.ts":
/*!**********************************************!*\
  !*** ./src/game/MVP/Model/Data/ModelData.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ModelData {\r\n    constructor(data) {\r\n        this.initialize(data);\r\n    }\r\n    initialize(data) {\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ModelData);\r\n\n\n//# sourceURL=webpack:///./src/game/MVP/Model/Data/ModelData.ts?");

/***/ }),

/***/ "./src/game/MVP/Model/Model.ts":
/*!*************************************!*\
  !*** ./src/game/MVP/Model/Model.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Events_Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Events/Event */ \"./src/game/Events/Event.ts\");\n/* harmony import */ var _Data_ModelData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data/ModelData */ \"./src/game/MVP/Model/Data/ModelData.ts\");\n/* harmony import */ var _Events_ViewDataEventArgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Events/ViewDataEventArgs */ \"./src/game/Events/ViewDataEventArgs.ts\");\n\r\n\r\n\r\nclass Model {\r\n    constructor(data) {\r\n        this.onGetViewData = new _Events_Event__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.onStatesUpdate = new _Events_Event__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.data = data;\r\n    }\r\n    initialize() {\r\n        this.setData(this.data);\r\n    }\r\n    setData(data) {\r\n    }\r\n    getViewData() {\r\n        const eventArgs = new _Events_ViewDataEventArgs__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({});\r\n        this.onGetViewData.invoke(eventArgs);\r\n        return eventArgs.data;\r\n    }\r\n    getData(args) {\r\n        args.data = new _Data_ModelData__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.data);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Model);\r\n\n\n//# sourceURL=webpack:///./src/game/MVP/Model/Model.ts?");

/***/ }),

/***/ "./src/game/MVP/Presenter.ts":
/*!***********************************!*\
  !*** ./src/game/MVP/Presenter.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Model_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model/Model */ \"./src/game/MVP/Model/Model.ts\");\n/* harmony import */ var _Views_ViewManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Views/ViewManager */ \"./src/game/MVP/Views/ViewManager.ts\");\n/* harmony import */ var _Events_ModelDataEventArgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Events/ModelDataEventArgs */ \"./src/game/Events/ModelDataEventArgs.ts\");\n/* harmony import */ var _Events_ViewDataEventArgs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Events/ViewDataEventArgs */ \"./src/game/Events/ViewDataEventArgs.ts\");\n/* harmony import */ var _Model_Data_ModelData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Model/Data/ModelData */ \"./src/game/MVP/Model/Data/ModelData.ts\");\n/* harmony import */ var _Views_Data_ViewData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Views/Data/ViewData */ \"./src/game/MVP/Views/Data/ViewData.ts\");\n/* harmony import */ var _Views_SessionView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Views/SessionView */ \"./src/game/MVP/Views/SessionView.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass Presenter {\r\n    constructor(defaultModelData, defaultViewData) {\r\n        this.gameComponents = new Array();\r\n        this.invokeGameCycle = () => {\r\n            this.gameComponents.forEach(component => {\r\n                component.update();\r\n                component.draw();\r\n            });\r\n            requestAnimationFrame(this.invokeGameCycle);\r\n        };\r\n        this.handlerStatesUpdate = (args) => {\r\n            if (args instanceof _Events_ModelDataEventArgs__WEBPACK_IMPORTED_MODULE_2__[\"default\"])\r\n                this.model.setData(args.data);\r\n            if (args instanceof _Events_ViewDataEventArgs__WEBPACK_IMPORTED_MODULE_3__[\"default\"])\r\n                this.viewManager.setData(args.data);\r\n        };\r\n        this.handlerGetModelData = (args) => {\r\n            this.model.getData(args);\r\n        };\r\n        this.handlerGetViewData = (args) => {\r\n            this.viewManager.getData(args);\r\n        };\r\n        this.handlerViewsUpdate = () => {\r\n            this.viewManager.views.forEach((e) => e.update(true));\r\n        };\r\n        this.handlerHandleMove = () => {\r\n            this.viewManager.views.forEach((e) => e.update(false));\r\n        };\r\n        const canvas = (document.querySelector(\".game\"));\r\n        const modelData = new _Model_Data_ModelData__WEBPACK_IMPORTED_MODULE_4__[\"default\"](defaultModelData);\r\n        const viewData = new _Views_Data_ViewData__WEBPACK_IMPORTED_MODULE_5__[\"default\"](defaultViewData);\r\n        this.model = new _Model_Model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](modelData);\r\n        this.viewManager = new _Views_ViewManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"](viewData, canvas);\r\n        this.gameComponents.push(this.viewManager);\r\n        this.initialize();\r\n    }\r\n    initialize() {\r\n        this.viewManager.onStatesUpdate.subscribe(this.handlerStatesUpdate);\r\n        this.viewManager.onStatesUpdate.subscribe(this.handlerViewsUpdate);\r\n        this.model.onStatesUpdate.subscribe(this.handlerStatesUpdate);\r\n        /* this.viewManager.onHandleMove.subscribe(this.handlerStatesUpdate);\r\n        this.viewManager.onHandleMove.subscribe(this.handlerHandleMove);\r\n\r\n        this.viewManager.onInputsChange.subscribe(this.handlerStatesUpdate);\r\n        this.viewManager.onInputsChange.subscribe(this.handlerHandleMove); */\r\n        this.model.onGetViewData.subscribe(this.handlerGetViewData);\r\n        this.viewManager.onGetModelData.subscribe(this.handlerGetModelData);\r\n        this.model.initialize();\r\n        this.viewManager.initialize();\r\n        let sessioonView = new _Views_SessionView__WEBPACK_IMPORTED_MODULE_6__[\"default\"](this.viewManager);\r\n        this.viewManager.addView(sessioonView);\r\n        this.gameComponents.forEach(component => {\r\n            component.loadContent();\r\n        });\r\n        this.invokeGameCycle();\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Presenter);\r\n\n\n//# sourceURL=webpack:///./src/game/MVP/Presenter.ts?");

/***/ }),

/***/ "./src/game/MVP/Views/CanvasManager.ts":
/*!*********************************************!*\
  !*** ./src/game/MVP/Views/CanvasManager.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass CanvasManager {\r\n    constructor(element, width, height) {\r\n        this.element = element;\r\n        this.width = width;\r\n        this.height = height;\r\n        this.element.style.width = `${this.width}px`;\r\n        this.element.style.height = `${this.height}px`;\r\n        this.canvas = (this.element);\r\n        this.context = (this.canvas.getContext(\"2d\"));\r\n        this.context.lineCap = \"round\";\r\n        this.context.lineJoin = \"round\";\r\n        this.context.strokeStyle = \"black\";\r\n        this.context.lineWidth = 1;\r\n    }\r\n    clear() {\r\n        this.context.fillStyle = \"white\";\r\n        this.context.fillRect(0, 0, this.width, this.height);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (CanvasManager);\r\n\n\n//# sourceURL=webpack:///./src/game/MVP/Views/CanvasManager.ts?");

/***/ }),

/***/ "./src/game/MVP/Views/Data/ViewData.ts":
/*!*********************************************!*\
  !*** ./src/game/MVP/Views/Data/ViewData.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ViewData {\r\n    constructor(data) {\r\n        this.initialize(data);\r\n    }\r\n    initialize(data) {\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewData);\r\n\n\n//# sourceURL=webpack:///./src/game/MVP/Views/Data/ViewData.ts?");

/***/ }),

/***/ "./src/game/MVP/Views/Data/ViewState.ts":
/*!**********************************************!*\
  !*** ./src/game/MVP/Views/Data/ViewState.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar ViewState;\r\n(function (ViewState) {\r\n    ViewState[ViewState[\"Active\"] = 0] = \"Active\";\r\n    ViewState[ViewState[\"Hidden\"] = 1] = \"Hidden\";\r\n})(ViewState || (ViewState = {}));\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewState);\r\n\n\n//# sourceURL=webpack:///./src/game/MVP/Views/Data/ViewState.ts?");

/***/ }),

/***/ "./src/game/MVP/Views/GameComponent.ts":
/*!*********************************************!*\
  !*** ./src/game/MVP/Views/GameComponent.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass GameComponent {\r\n    constructor() { }\r\n    initialize() { }\r\n    update( /* GameTime gameTime */) { }\r\n    draw( /* GameTime gameTime */) { }\r\n    loadContent() { }\r\n    unloadContent() { }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameComponent);\r\n\n\n//# sourceURL=webpack:///./src/game/MVP/Views/GameComponent.ts?");

/***/ }),

/***/ "./src/game/MVP/Views/SessionView.ts":
/*!*******************************************!*\
  !*** ./src/game/MVP/Views/SessionView.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ \"./src/game/MVP/Views/View.ts\");\n\r\nclass SessionView extends _View__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(viewManager) {\r\n        super(viewManager);\r\n    }\r\n    loadContent() {\r\n        super.loadContent();\r\n        /* this.border = new Border();\r\n        this.blocks = new List<TestObject>(); */\r\n        /* restartButton = new RestartButton(this, ScreenManager);\r\n        restartButton.AddMenuItem(EntryType.Screen, this); */\r\n    }\r\n    update() {\r\n    }\r\n    draw() {\r\n    }\r\n    unloadContent() {\r\n        super.unloadContent();\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (SessionView);\r\n\n\n//# sourceURL=webpack:///./src/game/MVP/Views/SessionView.ts?");

/***/ }),

/***/ "./src/game/MVP/Views/View.ts":
/*!************************************!*\
  !*** ./src/game/MVP/Views/View.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Data/ViewState */ \"./src/game/MVP/Views/Data/ViewState.ts\");\n\r\nclass View {\r\n    constructor(viewManager) {\r\n        this.isPopup = false;\r\n        this.viewState = _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Active;\r\n        this.viewManager = viewManager;\r\n    }\r\n    get IsActive() { return this.viewState == _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Active; }\r\n    update(/* GameTime gameTime,  */ coveredByOtherScreen) {\r\n        if (coveredByOtherScreen) {\r\n            this.viewState = _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Hidden;\r\n        }\r\n        else {\r\n            this.viewState = _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Active;\r\n        }\r\n    }\r\n    draw( /* GameTime gameTime */) { }\r\n    loadContent() { }\r\n    unloadContent() { }\r\n    exitScreen() {\r\n        this.viewManager.removeView(this);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (View);\r\n\n\n//# sourceURL=webpack:///./src/game/MVP/Views/View.ts?");

/***/ }),

/***/ "./src/game/MVP/Views/ViewManager.ts":
/*!*******************************************!*\
  !*** ./src/game/MVP/Views/ViewManager.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Data_ViewData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Data/ViewData */ \"./src/game/MVP/Views/Data/ViewData.ts\");\n/* harmony import */ var _Events_Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Events/Event */ \"./src/game/Events/Event.ts\");\n/* harmony import */ var _Events_ModelDataEventArgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Events/ModelDataEventArgs */ \"./src/game/Events/ModelDataEventArgs.ts\");\n/* harmony import */ var _CanvasManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CanvasManager */ \"./src/game/MVP/Views/CanvasManager.ts\");\n/* harmony import */ var _Data_ViewState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Data/ViewState */ \"./src/game/MVP/Views/Data/ViewState.ts\");\n/* harmony import */ var _GameComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GameComponent */ \"./src/game/MVP/Views/GameComponent.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass ViewManager extends _GameComponent__WEBPACK_IMPORTED_MODULE_5__[\"default\"] {\r\n    /* public onHandleMove = new Event();\r\n    public onInputsChange = new Event();\r\n    public onMouseDown = new Event();\r\n    public onMouseMove = new Event();\r\n    public onMouseUp = new Event(); */\r\n    constructor(viewData, canvas) {\r\n        super();\r\n        this.views = new Array();\r\n        this.viewsToUpdate = new Array();\r\n        this.isInitialized = false;\r\n        // public assets\r\n        this.onStatesUpdate = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onGetModelData = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.viewData = viewData;\r\n        this.canvasManager = new _CanvasManager__WEBPACK_IMPORTED_MODULE_3__[\"default\"](canvas, 800, 600);\r\n        this.isGameActive = true;\r\n        this.update = this.update.bind(this);\r\n        this.draw = this.draw.bind(this);\r\n    }\r\n    initialize() {\r\n        this.isInitialized = true;\r\n        this.setData(this.viewData);\r\n    }\r\n    loadContent() {\r\n        for (let view of this.views) {\r\n            view.loadContent();\r\n        }\r\n    }\r\n    unloadContent() {\r\n        for (let view of this.views) {\r\n            view.unloadContent();\r\n        }\r\n    }\r\n    update( /* GameTime gameTime */) {\r\n        this.viewsToUpdate = [];\r\n        for (let view of this.views) {\r\n            this.viewsToUpdate.push(view);\r\n        }\r\n        let coveredByOtherScreen = false;\r\n        while (this.viewsToUpdate.length > 0) {\r\n            let view = this.viewsToUpdate[this.viewsToUpdate.length - 1];\r\n            this.viewsToUpdate.pop();\r\n            // Update the screen.\r\n            view.update(/* gameTime,  */ coveredByOtherScreen);\r\n            if (view.viewState == _Data_ViewState__WEBPACK_IMPORTED_MODULE_4__[\"default\"].Active) {\r\n                if (!view.isPopup)\r\n                    coveredByOtherScreen = true;\r\n            }\r\n        }\r\n    }\r\n    draw( /* GameTime gameTime */) {\r\n        this.canvasManager.clear();\r\n        for (let view of this.views) {\r\n            if (view.viewState == _Data_ViewState__WEBPACK_IMPORTED_MODULE_4__[\"default\"].Hidden)\r\n                continue;\r\n            view.draw( /* gameTime */);\r\n        }\r\n        //input.draw();\r\n    }\r\n    addView(view) {\r\n        view.viewManager = this;\r\n        if (this.isInitialized)\r\n            view.loadContent();\r\n        this.views.push(view);\r\n    }\r\n    removeView(view) {\r\n        if (this.isInitialized)\r\n            view.unloadContent();\r\n        let index = this.views.indexOf(view);\r\n        if (index > -1) {\r\n            this.views.splice(index, 1);\r\n        }\r\n        index = this.viewsToUpdate.indexOf(view);\r\n        if (index > -1) {\r\n            this.viewsToUpdate.splice(index, 1);\r\n        }\r\n    }\r\n    setData(data) {\r\n        /* if (data.sliderStripThickness !== undefined) this.viewData.sliderStripThickness = data.sliderStripThickness; */\r\n    }\r\n    getModelData() {\r\n        const optionsEventArgs = new _Events_ModelDataEventArgs__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({});\r\n        this.onGetModelData.invoke(optionsEventArgs);\r\n        return optionsEventArgs.data;\r\n    }\r\n    getData(args) {\r\n        args.data = new _Data_ViewData__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.viewData);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewManager);\r\n\n\n//# sourceURL=webpack:///./src/game/MVP/Views/ViewManager.ts?");

/***/ }),

/***/ "./src/game/Styles/Game.scss":
/*!***********************************!*\
  !*** ./src/game/Styles/Game.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./Game.scss */ \"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/game/Styles/Game.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/game/Styles/Game.scss?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/Game */ \"./src/game/Game.ts\");\n\r\nconst game = new _game_Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });