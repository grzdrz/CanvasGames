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

/***/ "./src/game/Data/ModelData.ts":
/*!************************************!*\
  !*** ./src/game/Data/ModelData.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ModelData {\r\n    constructor(data) {\r\n        this.initialize(data);\r\n    }\r\n    initialize(data) {\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ModelData);\r\n\n\n//# sourceURL=webpack:///./src/game/Data/ModelData.ts?");

/***/ }),

/***/ "./src/game/Data/ViewData.ts":
/*!***********************************!*\
  !*** ./src/game/Data/ViewData.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ViewData {\r\n    constructor(data) {\r\n        this.initialize(data);\r\n    }\r\n    initialize(data) {\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewData);\r\n\n\n//# sourceURL=webpack:///./src/game/Data/ViewData.ts?");

/***/ }),

/***/ "./src/game/Data/ViewState.ts":
/*!************************************!*\
  !*** ./src/game/Data/ViewState.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar ViewState;\r\n(function (ViewState) {\r\n    ViewState[ViewState[\"Active\"] = 0] = \"Active\";\r\n    ViewState[ViewState[\"Hidden\"] = 1] = \"Hidden\";\r\n})(ViewState || (ViewState = {}));\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewState);\r\n\n\n//# sourceURL=webpack:///./src/game/Data/ViewState.ts?");

/***/ }),

/***/ "./src/game/DrawingSystem/CanvasManager.ts":
/*!*************************************************!*\
  !*** ./src/game/DrawingSystem/CanvasManager.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Helpers/Vector */ \"./src/game/Helpers/Vector.ts\");\n/* harmony import */ var _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Events/EventArgs */ \"./src/game/Events/EventArgs.ts\");\n/* harmony import */ var _GameSystem_GameObjects_Enemy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../GameSystem/GameObjects/Enemy */ \"./src/game/GameSystem/GameObjects/Enemy.ts\");\n\r\n\r\n\r\nclass CanvasManager {\r\n    constructor(viewManager, element, width, height) {\r\n        this.calculateMouseGlobalPosition = (event) => {\r\n            let x;\r\n            let y;\r\n            if (event instanceof TouchEvent) {\r\n                const touchEvent = /* <TouchEvent> */ event;\r\n                x = touchEvent.changedTouches[0].pageX;\r\n                y = touchEvent.changedTouches[0].pageY;\r\n            }\r\n            else {\r\n                const mouseEvent = event;\r\n                x = mouseEvent.clientX;\r\n                y = mouseEvent.clientY;\r\n            }\r\n            // y = (document.documentElement.clientHeight + window.pageYOffset) - y;\r\n            return new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y);\r\n        };\r\n        this.handlerKeyDown = (event) => {\r\n            /* event.preventDefault(); */\r\n            this.viewManager.onKeyDown.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ key: event.code }));\r\n        };\r\n        this.handlerKeyUp = (event) => {\r\n            /* event.preventDefault(); */\r\n            this.viewManager.onKeyUp.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ key: event.code }));\r\n        };\r\n        this.handleMouseClick = (event) => {\r\n            if (event.button !== 0)\r\n                return;\r\n            const mousePosition = this.calculateMouseGlobalPosition(event);\r\n            this.viewManager.onMouseClick.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ mousePosition }));\r\n        };\r\n        this.viewManager = viewManager;\r\n        this.canvas = (element);\r\n        this.width = width;\r\n        this.height = height;\r\n        this.canvas.width = width;\r\n        this.canvas.height = height;\r\n        this.context = (this.canvas.getContext(\"2d\"));\r\n        /* this.context.canvas.clientWidth\r\n        this.context.canvas.clientHeight */\r\n        this.setDragAndDropHandlers();\r\n    }\r\n    drawObject(object) {\r\n        this.context.fillStyle = object.color;\r\n        if (object instanceof _GameSystem_GameObjects_Enemy__WEBPACK_IMPORTED_MODULE_2__[\"default\"] && object.isStatic)\r\n            this.context.fillStyle = \"blue\";\r\n        // this.context.fillRect(object.position.x, object.position.y, object.width, object.height);\r\n        this.context.beginPath();\r\n        this.context.arc(object.position.x, object.position.y, object.width / 2, 0, 2 * Math.PI);\r\n        this.context.fill();\r\n        //////TEST of velocity vector\r\n        this.context.beginPath(); // Начинает новый путь\r\n        this.context.moveTo(object.position.x, object.position.y); // Рередвигает перо в точку (30, 50)\r\n        const test = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](50, 0).rotateVector(object.radians);\r\n        const vectorTo = object.position.sum(test);\r\n        this.context.lineTo(vectorTo.x, vectorTo.y); // Рисует линию до точки (150, 100)\r\n        this.context.stroke(); // Отображает путь\r\n    }\r\n    drawEndGame(isWin) {\r\n        this.context.fillStyle = \"rgb(37, 53, 73)\";\r\n        const windowWidth = 500;\r\n        const windowHeight = 300;\r\n        this.context.fillRect(this.width / 2 - windowWidth / 2, this.height / 2 - windowHeight / 2, windowWidth, windowHeight);\r\n        this.context.fillStyle = \"white\";\r\n        this.context.font = \"30px san-serif\";\r\n        this.context.fillText(`Game ${isWin ? \"win\" : \"lose\"}`, this.width / 2 - 60, this.height / 2);\r\n    }\r\n    drawHP(HP) {\r\n        this.context.fillStyle = \"black\";\r\n        this.context.font = \"30px san-serif\";\r\n        this.context.fillText(`HP: ${HP}`, 60, 60);\r\n    }\r\n    drawSquare(position, size, color) {\r\n        this.context.fillStyle = color;\r\n        this.context.fillRect(position.x, position.y, size.width, size.height);\r\n    }\r\n    clear() {\r\n        this.context.fillStyle = \"gray\";\r\n        this.context.fillRect(0, 0, this.width, this.height);\r\n    }\r\n    setDragAndDropHandlers() {\r\n        this.canvas.ondragstart = () => false;\r\n        this.canvas.addEventListener(\"mousedown\", this.handlerMouseDown.bind(this));\r\n        this.canvas.addEventListener(\"touchstart\", this.handlerMouseDown.bind(this));\r\n        window.addEventListener(\"keydown\", this.handlerKeyDown);\r\n        window.addEventListener(\"keyup\", this.handlerKeyUp);\r\n        this.canvas.addEventListener(\"click\", this.handleMouseClick);\r\n    }\r\n    // d&d\r\n    handlerMouseDown(event) {\r\n        event.preventDefault();\r\n        if (event.button !== 2)\r\n            return;\r\n        const optionsForMouseEvents = {\r\n            handlerMouseMove: (_event) => { },\r\n            handlerMouseUp: (_event) => { },\r\n        };\r\n        const handlerMouseMove = this.handlerMouseMove.bind(this, optionsForMouseEvents);\r\n        optionsForMouseEvents.handlerMouseMove = handlerMouseMove;\r\n        const handlerMouseUp = this.handlerMouseUp.bind(this, optionsForMouseEvents);\r\n        optionsForMouseEvents.handlerMouseUp = handlerMouseUp; // чтобы обработчик mouseMove можно было отписать\r\n        document.addEventListener(\"mousemove\", handlerMouseMove);\r\n        document.addEventListener(\"mouseup\", handlerMouseUp);\r\n        document.addEventListener(\"touchmove\", handlerMouseMove);\r\n        document.addEventListener(\"touchend\", handlerMouseUp);\r\n        const mousePosition = this.calculateMouseGlobalPosition(event);\r\n        this.viewManager.onMouseMove.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ mousePosition }));\r\n    }\r\n    handlerMouseMove(optionsFromMouseDown, event) {\r\n        const mousePosition = this.calculateMouseGlobalPosition(event);\r\n        this.viewManager.onMouseMove.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ mousePosition }));\r\n    }\r\n    handlerMouseUp(optionsFromMouseDown, event) {\r\n        document.removeEventListener(\"mousemove\", optionsFromMouseDown.handlerMouseMove);\r\n        document.removeEventListener(\"mouseup\", optionsFromMouseDown.handlerMouseUp);\r\n        document.removeEventListener(\"touchmove\", optionsFromMouseDown.handlerMouseMove);\r\n        document.removeEventListener(\"touchend\", optionsFromMouseDown.handlerMouseUp);\r\n        const mousePosition = this.calculateMouseGlobalPosition(event);\r\n        this.viewManager.onMouseUp.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ mousePosition }));\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (CanvasManager);\r\n\n\n//# sourceURL=webpack:///./src/game/DrawingSystem/CanvasManager.ts?");

/***/ }),

/***/ "./src/game/Events/Event.ts":
/*!**********************************!*\
  !*** ./src/game/Events/Event.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Event {\r\n    constructor() {\r\n        this.handlers = new Array();\r\n        this.invoke = (args) => {\r\n            this.handlers.forEach((eventHandler) => eventHandler(args));\r\n        };\r\n        this.subscribe = (handler) => {\r\n            this.handlers.push(handler);\r\n        };\r\n        this.unsubscribe = (handler) => {\r\n            const index = this.handlers.indexOf(handler);\r\n            if (index > -1) {\r\n                this.handlers.splice(index, 1);\r\n            }\r\n        };\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Event);\r\n\n\n//# sourceURL=webpack:///./src/game/Events/Event.ts?");

/***/ }),

/***/ "./src/game/Events/EventArgs.ts":
/*!**************************************!*\
  !*** ./src/game/Events/EventArgs.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass EventArgs {\r\n    constructor(data) {\r\n        this.data = data;\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (EventArgs);\r\n\n\n//# sourceURL=webpack:///./src/game/Events/EventArgs.ts?");

/***/ }),

/***/ "./src/game/GameSystem/Collisions.ts":
/*!*******************************************!*\
  !*** ./src/game/GameSystem/Collisions.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Helpers/Vector */ \"./src/game/Helpers/Vector.ts\");\n/* harmony import */ var _GameObjects_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameObjects/Player */ \"./src/game/GameSystem/GameObjects/Player.ts\");\n\r\n\r\nconst borderRestitution = 0.5;\r\nclass Collisions {\r\n    static analyzeCollizions(objects, width, height) {\r\n        this.handleObjectsCollisions(objects);\r\n        this.detectEdgeCollisions(objects, width, height);\r\n        this.detectObjectsPreCollisions(objects);\r\n        this.detectEdgeCollisions(objects, width, height, true);\r\n    }\r\n    static detectCollision(obj1, obj2, isPreCollisions = false) {\r\n        const vectorBetweenObjects = obj2.position.subtract(obj1.position);\r\n        let sumOfRadiusesOfObjects = obj1.width / 2 + obj2.width / 2;\r\n        const length = vectorBetweenObjects.length;\r\n        sumOfRadiusesOfObjects = (isPreCollisions ? sumOfRadiusesOfObjects + this.preCollisionsDistance : sumOfRadiusesOfObjects);\r\n        return (length <= sumOfRadiusesOfObjects);\r\n    }\r\n    static throwOffCollisions(objects, isPreCollisions = false) {\r\n        // сброс состояний коллизий\r\n        for (let i = 0; i < objects.length; i++) {\r\n            if (isPreCollisions)\r\n                objects[i].isPreColliding = false;\r\n            else\r\n                objects[i].isColliding = false;\r\n        }\r\n    }\r\n    static detectEdgeCollisions(gameObjects, canvasWidth, canvasHeight, isPreCollisions = false) {\r\n        /* this.throwOffCollisions(gameObjects); */\r\n        let obj;\r\n        for (let i = 0; i < gameObjects.length; i++) {\r\n            obj = gameObjects[i];\r\n            const isLeftPreCollision = isPreCollisions && (obj.position.x < obj.width / 2 + this.preCollisionsDistance);\r\n            const isLeftCollision = !isPreCollisions && (obj.position.x < obj.width / 2);\r\n            const isRightPreCollision = isPreCollisions && (obj.position.x > canvasWidth - obj.width / 2 - this.preCollisionsDistance);\r\n            const isRightCollision = !isPreCollisions && (obj.position.x > canvasWidth - obj.width / 2);\r\n            if (isLeftCollision) {\r\n                obj.velocity.x = Math.abs(obj.velocity.x) * borderRestitution;\r\n                obj.position.x = obj.width / 2;\r\n                obj.isColliding = true;\r\n            }\r\n            else if (isRightCollision) {\r\n                obj.velocity.x = -Math.abs(obj.velocity.x) * borderRestitution;\r\n                obj.position.x = canvasWidth - obj.width / 2;\r\n                obj.isColliding = true;\r\n            }\r\n            if (isLeftPreCollision) {\r\n                obj.isPreColliding = true;\r\n            }\r\n            else if (isRightPreCollision) {\r\n                obj.isPreColliding = true;\r\n            }\r\n            /* const isTopPreCollision = isPreCollisions && (obj.position.y < obj.width / 2 + this.preCollisionsDistance);\r\n            const isTopCollision = !isPreCollisions && (obj.position.y < obj.width / 2); */\r\n            const isBottomPreCollision = isPreCollisions && (obj.position.y > canvasHeight - obj.width / 2 - this.preCollisionsDistance);\r\n            const isBottomCollision = !isPreCollisions && (obj.position.y > canvasHeight - obj.width / 2);\r\n            /* if (isTopCollision) {\r\n              obj.velocity.y = Math.abs(obj.velocity.y) * borderRestitution;\r\n              obj.position.y = obj.width / 2;\r\n              obj.isColliding = true;\r\n            } else */ if (isBottomCollision) {\r\n                obj.velocity.y = -Math.abs(obj.velocity.y) * borderRestitution;\r\n                obj.position.y = canvasHeight - obj.width / 2;\r\n                obj.isColliding = true;\r\n            }\r\n            /* if (isTopPreCollision) { obj.isPreColliding = true; }\r\n            else */ if (isBottomPreCollision) {\r\n                obj.isPreColliding = true;\r\n            }\r\n        }\r\n    }\r\n    static detectObjectsPreCollisions(objects) {\r\n        let obj1;\r\n        let obj2;\r\n        // сброс состояний коллизий\r\n        this.throwOffCollisions(objects, true);\r\n        // поиск коллизий\r\n        for (let i = 0; i < objects.length; i++) {\r\n            obj1 = objects[i];\r\n            for (let j = i + 1; j < objects.length; j++) {\r\n                obj2 = objects[j];\r\n                // Compare object1 with object2\r\n                if (this.detectCollision(obj1, obj2, true)) {\r\n                    obj1.isPreColliding = true;\r\n                    obj2.isPreColliding = true;\r\n                }\r\n            }\r\n        }\r\n    }\r\n    static handleObjectsCollisions(objects) {\r\n        let obj1;\r\n        let obj2;\r\n        // сброс состояний коллизий\r\n        this.throwOffCollisions(objects);\r\n        // поиск коллизий\r\n        for (let i = 0; i < objects.length; i++) {\r\n            obj1 = objects[i];\r\n            for (let j = i + 1; j < objects.length; j++) {\r\n                obj2 = objects[j];\r\n                // Compare object1 with object2\r\n                if (this.detectCollision(obj1, obj2)) {\r\n                    obj1.isColliding = true;\r\n                    obj2.isColliding = true;\r\n                    if (obj1 instanceof _GameObjects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"] || obj2 instanceof _GameObjects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\r\n                        let breakpoint = 0;\r\n                    }\r\n                    let vectorBetweenObjects = obj2.position.subtract(obj1.position);\r\n                    let unitVector = vectorBetweenObjects.getUnitVector();\r\n                    // расталкиваем объекты если между ними образовалось пересечение(иначе слипнутся)\r\n                    const contactDepth = vectorBetweenObjects.length - (obj1.width / 2 + obj2.width / 2);\r\n                    let pushingDistance;\r\n                    if (unitVector.x === 0 && unitVector.y === 0)\r\n                        pushingDistance = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"]((contactDepth / 2) * (16 / 25), (contactDepth / 2) * (9 / 25));\r\n                    else\r\n                        pushingDistance = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"]((contactDepth / 2) * unitVector.x, (contactDepth / 2) * unitVector.y);\r\n                    if (obj1.isStatic) {\r\n                        obj2.position = obj2.position.subtract(pushingDistance.multiplyByNumber(2));\r\n                    }\r\n                    else if (obj2.isStatic) {\r\n                        obj1.position = obj1.position.sum(pushingDistance.multiplyByNumber(2));\r\n                    }\r\n                    else {\r\n                        obj1.position = obj1.position.sum(pushingDistance);\r\n                        obj2.position = obj2.position.subtract(pushingDistance);\r\n                    }\r\n                    /* if (obj1 instanceof Enemy && obj2 instanceof Enemy)\r\n                        if (!obj1.isActive || !obj2.isActive) {\r\n                            if (obj1.collisionsCount > 10) obj1.isActive = false;\r\n                            else obj1.collisionsCount += 1;\r\n          \r\n                            if (obj2.collisionsCount > 10) obj2.isActive = false;\r\n                            else obj2.collisionsCount += 1;\r\n          \r\n                            continue;\r\n                        } */\r\n                    if (obj1.velocity.length === 0 || obj2.velocity.length === 0) {\r\n                        let breakpoint = 0;\r\n                    }\r\n                    /* const relativeVelocity = obj1.velocity.subtract(obj2.velocity);\r\n                    let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;\r\n                    speed *= Math.min(obj1.restitution, obj2.restitution);\r\n                    const impulse = 2 * speed / (obj1.mass + obj2.mass); */\r\n                    if (obj1.isStatic && !obj2.isStatic) {\r\n                        vectorBetweenObjects = obj2.position.subtract(obj1.position);\r\n                        unitVector = vectorBetweenObjects.getUnitVector();\r\n                        const relativeVelocity = obj1.velocity.subtract(obj2.velocity);\r\n                        let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;\r\n                        speed *= Math.max(obj1.restitution, obj2.restitution);\r\n                        const impulse = 2 * speed / (obj1.mass + obj2.mass);\r\n                        obj2.velocity.x += (impulse * obj1.mass * unitVector.x);\r\n                        obj2.velocity.y += (impulse * obj1.mass * unitVector.y);\r\n                    }\r\n                    else if (!obj1.isStatic && obj2.isStatic) {\r\n                        vectorBetweenObjects = obj1.position.subtract(obj2.position);\r\n                        unitVector = vectorBetweenObjects.getUnitVector();\r\n                        const relativeVelocity = obj2.velocity.subtract(obj1.velocity);\r\n                        let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;\r\n                        speed *= Math.max(obj1.restitution, obj2.restitution);\r\n                        const impulse = 2 * speed / (obj1.mass + obj2.mass);\r\n                        obj1.velocity.x += (impulse * obj2.mass * unitVector.x);\r\n                        obj1.velocity.y += (impulse * obj2.mass * unitVector.y);\r\n                    }\r\n                    else {\r\n                        vectorBetweenObjects = obj2.position.subtract(obj1.position);\r\n                        unitVector = vectorBetweenObjects.getUnitVector();\r\n                        const relativeVelocity = obj1.velocity.subtract(obj2.velocity);\r\n                        let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;\r\n                        speed *= Math.min(obj1.restitution, obj2.restitution);\r\n                        const impulse = 2 * speed / (obj1.mass + obj2.mass);\r\n                        obj1.velocity.x -= (impulse * obj2.mass * unitVector.x);\r\n                        obj1.velocity.y -= (impulse * obj2.mass * unitVector.y);\r\n                        obj2.velocity.x += (impulse * obj1.mass * unitVector.x);\r\n                        obj2.velocity.y += (impulse * obj1.mass * unitVector.y);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\nCollisions.preCollisionsDistance = 30;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Collisions);\r\n\n\n//# sourceURL=webpack:///./src/game/GameSystem/Collisions.ts?");

/***/ }),

/***/ "./src/game/GameSystem/GameObjects/Enemy.ts":
/*!**************************************************!*\
  !*** ./src/game/GameSystem/GameObjects/Enemy.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ \"./src/game/GameSystem/GameObjects/GameObject.ts\");\n\r\nclass Enemy extends _GameObject__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(options, view) {\r\n        super(options, view);\r\n        this.collideObjects = Array();\r\n        this.activeTimeStamp = 0;\r\n    }\r\n    update(gameTime) {\r\n        if (this.activeTimeStamp < 10) {\r\n            this.activeTimeStamp += gameTime;\r\n        }\r\n        else {\r\n            this.isStatic = true;\r\n            this.restitution = 1.4;\r\n        }\r\n        super.update(gameTime);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Enemy);\r\n\n\n//# sourceURL=webpack:///./src/game/GameSystem/GameObjects/Enemy.ts?");

/***/ }),

/***/ "./src/game/GameSystem/GameObjects/GameObject.ts":
/*!*******************************************************!*\
  !*** ./src/game/GameSystem/GameObjects/GameObject.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Helpers/Vector */ \"./src/game/Helpers/Vector.ts\");\n\r\nclass GameObject {\r\n    constructor(options, view) {\r\n        this.width = 50;\r\n        this.height = 50;\r\n        this.position = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\r\n        this.radians = 0;\r\n        this.velocity = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\r\n        this.mass = 1;\r\n        this.restitution = 0.9;\r\n        this.color = \"red\";\r\n        this.firstKeyDowned = \"\";\r\n        this.secondKeyDowned = \"\";\r\n        this.isColliding = false;\r\n        this.isPreColliding = false;\r\n        this.isGriped = false;\r\n        this.isStatic = false;\r\n        this.view = view;\r\n        this.initialize(options);\r\n    }\r\n    initialize(options) {\r\n        if (options.width !== undefined)\r\n            this.width = options.width;\r\n        if (options.height !== undefined)\r\n            this.height = options.height;\r\n        if (options.position !== undefined)\r\n            this.position = options.position;\r\n        if (options.velocity !== undefined)\r\n            this.velocity = options.velocity;\r\n        if (options.mass !== undefined)\r\n            this.mass = options.mass;\r\n        if (options.restitution !== undefined)\r\n            this.restitution = options.restitution;\r\n        if (options.color !== undefined)\r\n            this.color = options.color;\r\n    }\r\n    draw() {\r\n        this.view.viewManager.canvasManager.drawObject(this);\r\n    }\r\n    update(gameTime) {\r\n        gameTime *= 10;\r\n        if (!this.isGriped) {\r\n            if (!this.isStatic) {\r\n                this.velocity.y += 9.81 * gameTime;\r\n                this.position.x += this.velocity.x * gameTime;\r\n                this.position.y += this.velocity.y * gameTime;\r\n            }\r\n            else {\r\n                this.velocity.x = 0;\r\n                this.velocity.y = 0;\r\n            }\r\n        }\r\n        this.radians = Math.atan2(this.velocity.y, this.velocity.x);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameObject);\r\n\n\n//# sourceURL=webpack:///./src/game/GameSystem/GameObjects/GameObject.ts?");

/***/ }),

/***/ "./src/game/GameSystem/GameObjects/Player.ts":
/*!***************************************************!*\
  !*** ./src/game/GameSystem/GameObjects/Player.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ \"./src/game/GameSystem/GameObjects/GameObject.ts\");\n\r\nclass Player extends _GameObject__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(options, view) {\r\n        super(options, view);\r\n        this.HP = 100;\r\n        this.damageTimeStamp = 0;\r\n        this.handlerKeyDown = (eventArgs) => {\r\n            if (this.firstKeyDowned === \"\")\r\n                this.firstKeyDowned = eventArgs.data.key;\r\n            else if (eventArgs.data.key !== this.firstKeyDowned)\r\n                this.secondKeyDowned = eventArgs.data.key;\r\n            if (this.isPreColliding && this.firstKeyDowned === \"Space\") {\r\n                if (this.firstKeyDowned === \"Space\")\r\n                    this.velocity.y -= 30;\r\n            }\r\n            if ( /* !this.isPreColliding && */this.velocity.x <= 20 && this.firstKeyDowned === \"KeyD\")\r\n                this.velocity.x += 10;\r\n            if ( /* !this.isPreColliding && */this.velocity.x >= -20 && this.firstKeyDowned === \"KeyA\")\r\n                this.velocity.x -= 10;\r\n        };\r\n        this.handlerKeyUp = ( /* eventArgs: EventArgs<IKeyData> */) => {\r\n            if (this.secondKeyDowned === \"\")\r\n                this.firstKeyDowned = \"\";\r\n            else\r\n                this.secondKeyDowned = \"\";\r\n        };\r\n        this.handlerSetPosition = (eventArgs) => {\r\n            this.isGriped = true;\r\n            this.velocity.x = 0;\r\n            this.velocity.y = 0;\r\n            this.position.x = eventArgs.data.mousePosition.x;\r\n            this.position.y = eventArgs.data.mousePosition.y;\r\n        };\r\n        this.handlerUnhand = (eventArgs) => {\r\n            this.isGriped = false;\r\n        };\r\n        this.handleClick = (eventArgs) => {\r\n            if (this.isPreColliding) {\r\n                const vectorToClickPoint = eventArgs.data.mousePosition.subtract(this.position);\r\n                const lengthToClickPoint = Math.min(vectorToClickPoint.length, 500);\r\n                const unitVector = vectorToClickPoint.getUnitVector();\r\n                const velocity = unitVector.multiplyByNumber(lengthToClickPoint / 10);\r\n                this.velocity = this.velocity.sum(velocity);\r\n            }\r\n        };\r\n    }\r\n    draw() {\r\n        super.draw();\r\n        this.view.viewManager.canvasManager.drawHP(this.HP);\r\n    }\r\n    update(gameTime) {\r\n        super.update(gameTime);\r\n        if (this.isColliding && this.damageTimeStamp === 0) {\r\n            this.HP -= 5;\r\n            this.damageTimeStamp += gameTime;\r\n        }\r\n        if (this.damageTimeStamp !== 0) {\r\n            this.damageTimeStamp += gameTime;\r\n            if (this.damageTimeStamp >= 1) {\r\n                this.damageTimeStamp = 0;\r\n            }\r\n        }\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\r\n\n\n//# sourceURL=webpack:///./src/game/GameSystem/GameObjects/Player.ts?");

/***/ }),

/***/ "./src/game/Helpers/MathFunctions.ts":
/*!*******************************************!*\
  !*** ./src/game/Helpers/MathFunctions.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ \"./src/game/Helpers/Vector.ts\");\n\r\nclass MathFunctions {\r\n    // доп. обработка значения, на случай если шаг дробный для того чтобы убрать лишние дробные значения\r\n    static cutOffJunkValuesFromFraction(value, stepSize) {\r\n        // переводим значение шага в строку(попутно проверяя на наличие формата с экспонентой если дробь длинная)\r\n        let stringOfNumber = \"\";\r\n        if (this.hasEInNumber(stepSize)) {\r\n            stringOfNumber = this.getStringOfNumberWithoutE(stepSize);\r\n        }\r\n        else\r\n            stringOfNumber = stepSize.toString();\r\n        // выделяем дробную часть\r\n        const fractionalPart = stringOfNumber.split(\".\")[1];\r\n        // если дробная часть существует, то округляем значение до длины дробной части шага,\r\n        // тем самым отрезая мусорные значения дроби, которые переодически появляются из-за неточностей при работе js с десятичными числами\r\n        if (fractionalPart) {\r\n            const countOfNumbers = fractionalPart.length;\r\n            return Number.parseFloat(value.toFixed(countOfNumbers));\r\n        }\r\n        return value;\r\n    }\r\n    // заменяет строку с числом в формате с экспонентой на строку с числом в обычном формате\r\n    // например \"1e-9\" -> на выходе получаем \"0.000000001\"\r\n    // p.s. код стырен со стаковерфлове\r\n    static getStringOfNumberWithoutE(number) {\r\n        const numberParts = number.toString().split(/[eE]/);\r\n        if (numberParts.length === 1)\r\n            return numberParts[0];\r\n        let z = \"\";\r\n        const sign = number < 0 ? \"-\" : \"\";\r\n        const str = numberParts[0].replace(\".\", \"\");\r\n        let mag = Number(numberParts[1]) + 1;\r\n        if (mag < 0) {\r\n            z = `${sign}0.`;\r\n            while (mag) {\r\n                z = `${z}0`;\r\n                mag += 1;\r\n            }\r\n            return z + str.replace(/^\\-/, \"\");\r\n        }\r\n        mag -= str.length;\r\n        while (mag) {\r\n            z = `${z}0`;\r\n            mag -= 1;\r\n        }\r\n        return str + z;\r\n    }\r\n    // проверка на запись очень большого(или маленького) числа через e(например 1e-10)\r\n    static hasEInNumber(number) {\r\n        const splitByE = number.toString().split(\"e\");\r\n        return splitByE.length === 2;\r\n    }\r\n    static getFractionOfNumber(number) {\r\n        const test1 = number.toString().split(\".\");\r\n        let test12;\r\n        if (test1.length > 1) {\r\n            test12 = `0.${test1[1]}`;\r\n            return Number.parseFloat(test12);\r\n        }\r\n        return 0;\r\n    }\r\n    static calculateEllipseSurfacePointCoordinate(width, height, angleInRad) {\r\n        const t = Math.atan2(width * Math.sin(angleInRad), height * Math.cos(angleInRad));\r\n        const x = width * Math.cos(t);\r\n        const y = height * Math.sin(t);\r\n        return new _Vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y);\r\n    }\r\n    static randomInteger(min, max) {\r\n        // случайное число от min до (max+1)\r\n        let rand = min + Math.random() * (max + 1 - min);\r\n        return Math.floor(rand);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (MathFunctions);\r\n\n\n//# sourceURL=webpack:///./src/game/Helpers/MathFunctions.ts?");

/***/ }),

/***/ "./src/game/Helpers/Vector.ts":
/*!************************************!*\
  !*** ./src/game/Helpers/Vector.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* eslint-disable no-underscore-dangle */\r\nclass Vector {\r\n    constructor(x, y) {\r\n        this._x = 0;\r\n        this._y = 0;\r\n        this._x = x;\r\n        this._y = y;\r\n    }\r\n    get width() {\r\n        return this._x;\r\n    }\r\n    set width(value) {\r\n        this._x = value;\r\n    }\r\n    get height() {\r\n        return this._y;\r\n    }\r\n    set height(value) {\r\n        this._y = value;\r\n    }\r\n    get x() {\r\n        return this._x;\r\n    }\r\n    set x(value) {\r\n        this._x = value;\r\n    }\r\n    get y() {\r\n        return this._y;\r\n    }\r\n    set y(value) {\r\n        this._y = value;\r\n    }\r\n    static get zero() {\r\n        return new Vector(0, 0);\r\n    }\r\n    sum(vector) {\r\n        return new Vector(this._x + vector.x, this._y + vector.y);\r\n    }\r\n    sumNumber(number) {\r\n        return new Vector(this._x + number, this._y + number);\r\n    }\r\n    subtract(vector) {\r\n        return new Vector(this._x - vector.x, this._y - vector.y);\r\n    }\r\n    multiplyByNumber(number) {\r\n        return new Vector(this._x * number, this._y * number);\r\n    }\r\n    calculateScalarProduct(vector) {\r\n        return this._x * vector.x + this._y * vector.y;\r\n    }\r\n    // считает длину проекции текущего вектора на целевой вектор\r\n    calculateVectorProjectionOnTargetVector(targetVector) {\r\n        return this.calculateScalarProduct(targetVector) / targetVector.length;\r\n    }\r\n    get length() {\r\n        return Math.sqrt(this._x * this._x + this._y * this._y);\r\n    }\r\n    static calculateVector(length, angle) {\r\n        const cos = Number.parseFloat(Math.cos(angle).toFixed(6));\r\n        const sin = Number.parseFloat(Math.sin(angle).toFixed(6));\r\n        return new Vector(length * cos, length * sin);\r\n    }\r\n    rotateVector(angleInRad) {\r\n        const newX = this._x * Math.cos(angleInRad) - this._y * Math.sin(angleInRad);\r\n        const newY = this._x * Math.sin(angleInRad) + this._y * Math.cos(angleInRad);\r\n        return new Vector(newX, newY);\r\n    }\r\n    getUnitVector() {\r\n        if (this.length === 0)\r\n            return Vector.zero;\r\n        return new Vector(this._x / this.length, this._y / this.length);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Vector);\r\n\n\n//# sourceURL=webpack:///./src/game/Helpers/Vector.ts?");

/***/ }),

/***/ "./src/game/Model/Model.ts":
/*!*********************************!*\
  !*** ./src/game/Model/Model.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Events_Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Events/Event */ \"./src/game/Events/Event.ts\");\n/* harmony import */ var _Data_ModelData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Data/ModelData */ \"./src/game/Data/ModelData.ts\");\n/* harmony import */ var _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Events/EventArgs */ \"./src/game/Events/EventArgs.ts\");\n\r\n\r\n\r\nclass Model {\r\n    constructor(data) {\r\n        this.onGetViewData = new _Events_Event__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.onSetViewData = new _Events_Event__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.data = data;\r\n    }\r\n    initialize() {\r\n        this.update(this.data);\r\n    }\r\n    update(data) {\r\n    }\r\n    getViewData() {\r\n        const eventArgs = new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({});\r\n        this.onGetViewData.invoke(eventArgs);\r\n        return eventArgs.data;\r\n    }\r\n    getData(args) {\r\n        args.data = new _Data_ModelData__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.data);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Model);\r\n\n\n//# sourceURL=webpack:///./src/game/Model/Model.ts?");

/***/ }),

/***/ "./src/game/Presenter.ts":
/*!*******************************!*\
  !*** ./src/game/Presenter.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Model_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model/Model */ \"./src/game/Model/Model.ts\");\n/* harmony import */ var _ViewSystem_ViewManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewSystem/ViewManager */ \"./src/game/ViewSystem/ViewManager.ts\");\n/* harmony import */ var _Data_ModelData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Data/ModelData */ \"./src/game/Data/ModelData.ts\");\n/* harmony import */ var _Data_ViewData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Data/ViewData */ \"./src/game/Data/ViewData.ts\");\n/* harmony import */ var _ViewSystem_Views_SessionView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ViewSystem/Views/SessionView */ \"./src/game/ViewSystem/Views/SessionView.ts\");\n/* harmony import */ var _Styles_Game_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Styles/Game.scss */ \"./src/game/Styles/Game.scss\");\n/* harmony import */ var _Styles_Game_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Styles_Game_scss__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _ViewSystem_Views_MainMenuView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ViewSystem/Views/MainMenuView */ \"./src/game/ViewSystem/Views/MainMenuView.ts\");\n/* harmony import */ var _ViewSystem_Views_EntryType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ViewSystem/Views/EntryType */ \"./src/game/ViewSystem/Views/EntryType.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst defaultModelData = {};\r\nconst defaultViewData = {};\r\nclass Presenter {\r\n    constructor() {\r\n        this.gameComponents = new Array();\r\n        this.secondsPassed = 0;\r\n        this.oldTimeStamp = 0;\r\n        this.invokeGameCycle = (gameTime) => {\r\n            this.secondsPassed = (gameTime - this.oldTimeStamp) / 1000;\r\n            this.secondsPassed = Math.min(this.secondsPassed, 0.1);\r\n            this.oldTimeStamp = gameTime;\r\n            this.gameComponents.forEach(component => {\r\n                component.update(this.secondsPassed);\r\n                component.draw();\r\n            });\r\n            requestAnimationFrame(this.invokeGameCycle);\r\n        };\r\n        this.handlerSetModelData = (args) => {\r\n            this.model.update(args.data);\r\n        };\r\n        this.handlerSetViewData = (args) => {\r\n            this.viewManager.setData(args.data);\r\n        };\r\n        this.handlerGetModelData = (args) => {\r\n            this.model.getData(args);\r\n        };\r\n        this.handlerGetViewData = (args) => {\r\n            this.viewManager.getData(args);\r\n        };\r\n        const canvas = (document.querySelector(\".game\"));\r\n        const modelData = new _Data_ModelData__WEBPACK_IMPORTED_MODULE_2__[\"default\"](defaultModelData);\r\n        const viewData = new _Data_ViewData__WEBPACK_IMPORTED_MODULE_3__[\"default\"](defaultViewData);\r\n        this.model = new _Model_Model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](modelData);\r\n        this.viewManager = new _ViewSystem_ViewManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"](viewData, canvas);\r\n        this.gameComponents.push(this.viewManager);\r\n        this.initialize();\r\n    }\r\n    initialize() {\r\n        this.viewManager.onSetModelData.subscribe(this.handlerSetModelData);\r\n        this.viewManager.onSetViewData.subscribe(this.handlerSetViewData);\r\n        this.model.onSetViewData.subscribe(this.handlerSetViewData);\r\n        this.model.initialize();\r\n        this.viewManager.initialize();\r\n        const sessioonView = new _ViewSystem_Views_SessionView__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this.viewManager);\r\n        /* this.viewManager.addView(sessioonView); */\r\n        const mainMenuView = new _ViewSystem_Views_MainMenuView__WEBPACK_IMPORTED_MODULE_6__[\"default\"](this.viewManager);\r\n        mainMenuView.addMenuItem(_ViewSystem_Views_EntryType__WEBPACK_IMPORTED_MODULE_7__[\"default\"].Screen, sessioonView);\r\n        this.viewManager.addView(mainMenuView);\r\n        this.gameComponents.forEach(component => {\r\n            component.loadContent();\r\n        });\r\n        this.invokeGameCycle(0);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Presenter);\r\n\n\n//# sourceURL=webpack:///./src/game/Presenter.ts?");

/***/ }),

/***/ "./src/game/Styles/Game.scss":
/*!***********************************!*\
  !*** ./src/game/Styles/Game.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./Game.scss */ \"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/game/Styles/Game.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/game/Styles/Game.scss?");

/***/ }),

/***/ "./src/game/ViewSystem/GameComponent.ts":
/*!**********************************************!*\
  !*** ./src/game/ViewSystem/GameComponent.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass GameComponent {\r\n    constructor() { }\r\n    initialize() { }\r\n    update(gameTime) { }\r\n    draw() { }\r\n    loadContent() { }\r\n    unloadContent() { }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameComponent);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/GameComponent.ts?");

/***/ }),

/***/ "./src/game/ViewSystem/ViewManager.ts":
/*!********************************************!*\
  !*** ./src/game/ViewSystem/ViewManager.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Data_ViewData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Data/ViewData */ \"./src/game/Data/ViewData.ts\");\n/* harmony import */ var _Events_Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Events/Event */ \"./src/game/Events/Event.ts\");\n/* harmony import */ var _DrawingSystem_CanvasManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DrawingSystem/CanvasManager */ \"./src/game/DrawingSystem/CanvasManager.ts\");\n/* harmony import */ var _Data_ViewState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Data/ViewState */ \"./src/game/Data/ViewState.ts\");\n/* harmony import */ var _GameComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GameComponent */ \"./src/game/ViewSystem/GameComponent.ts\");\n/* harmony import */ var _Events_EventArgs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Events/EventArgs */ \"./src/game/Events/EventArgs.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass ViewManager extends _GameComponent__WEBPACK_IMPORTED_MODULE_4__[\"default\"] {\r\n    constructor(viewData, canvas) {\r\n        super();\r\n        this.views = new Array();\r\n        this.viewsToUpdate = new Array();\r\n        this.isInitialized = false;\r\n        // public assets\r\n        this.onSetViewData = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onSetModelData = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onGetModelData = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onHandleMove = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onInputsChange = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onMouseDown = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onMouseMove = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onMouseUp = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onKeyDown = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onKeyUp = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onMouseClick = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.viewData = viewData;\r\n        const viewportWidth = this.canvasManager = new _DrawingSystem_CanvasManager__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this, canvas, document.documentElement.clientWidth, document.documentElement.clientHeight);\r\n        this.isGameActive = true;\r\n        this.update = this.update.bind(this);\r\n        this.draw = this.draw.bind(this);\r\n    }\r\n    initialize() {\r\n        this.isInitialized = true;\r\n        this.setData(this.viewData);\r\n    }\r\n    loadContent() {\r\n        for (let view of this.views) {\r\n            view.loadContent();\r\n        }\r\n    }\r\n    unloadContent() {\r\n        for (let view of this.views) {\r\n            view.unloadContent();\r\n        }\r\n    }\r\n    update(gameTime) {\r\n        this.viewsToUpdate = [];\r\n        for (let view of this.views) {\r\n            this.viewsToUpdate.push(view);\r\n        }\r\n        let coveredByOtherScreen = false;\r\n        while (this.viewsToUpdate.length > 0) {\r\n            let view = this.viewsToUpdate[this.viewsToUpdate.length - 1];\r\n            this.viewsToUpdate.pop();\r\n            // Update the screen.\r\n            view.update(gameTime, coveredByOtherScreen);\r\n            if (view.viewState === _Data_ViewState__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Active) {\r\n                if (!view.isPopup)\r\n                    coveredByOtherScreen = true;\r\n            }\r\n        }\r\n    }\r\n    draw() {\r\n        this.canvasManager.clear();\r\n        for (let view of this.views) {\r\n            if (view.viewState === _Data_ViewState__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Hidden)\r\n                continue;\r\n            view.draw();\r\n        }\r\n        //input.draw();\r\n    }\r\n    addView(view) {\r\n        view.viewManager = this;\r\n        if (this.isInitialized)\r\n            view.loadContent();\r\n        this.views.push(view);\r\n    }\r\n    removeView(view) {\r\n        if (this.isInitialized)\r\n            view.unloadContent();\r\n        let index = this.views.indexOf(view);\r\n        if (index > -1) {\r\n            this.views.splice(index, 1);\r\n        }\r\n        index = this.viewsToUpdate.indexOf(view);\r\n        if (index > -1) {\r\n            this.viewsToUpdate.splice(index, 1);\r\n        }\r\n    }\r\n    setData(data) {\r\n        /* if (data.sliderStripThickness !== undefined) this.viewData.sliderStripThickness = data.sliderStripThickness; */\r\n    }\r\n    getModelData() {\r\n        const optionsEventArgs = new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({});\r\n        this.onGetModelData.invoke(optionsEventArgs);\r\n        return optionsEventArgs.data;\r\n    }\r\n    getData(args) {\r\n        args.data = new _Data_ViewData__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.viewData);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewManager);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/ViewManager.ts?");

/***/ }),

/***/ "./src/game/ViewSystem/Views/EntryType.ts":
/*!************************************************!*\
  !*** ./src/game/ViewSystem/Views/EntryType.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar EntryType;\r\n(function (EntryType) {\r\n    EntryType[EntryType[\"Screen\"] = 0] = \"Screen\";\r\n    EntryType[EntryType[\"Separator\"] = 1] = \"Separator\";\r\n    EntryType[EntryType[\"ExitItem\"] = 2] = \"ExitItem\";\r\n})(EntryType || (EntryType = {}));\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (EntryType);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/Views/EntryType.ts?");

/***/ }),

/***/ "./src/game/ViewSystem/Views/GameState.ts":
/*!************************************************!*\
  !*** ./src/game/ViewSystem/Views/GameState.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar GameState;\r\n(function (GameState) {\r\n    GameState[GameState[\"Active\"] = 0] = \"Active\";\r\n    GameState[GameState[\"Win\"] = 1] = \"Win\";\r\n    GameState[GameState[\"Lose\"] = 2] = \"Lose\";\r\n})(GameState || (GameState = {}));\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameState);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/Views/GameState.ts?");

/***/ }),

/***/ "./src/game/ViewSystem/Views/MainMenuEntry.ts":
/*!****************************************************!*\
  !*** ./src/game/ViewSystem/Views/MainMenuEntry.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _EntryType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntryType */ \"./src/game/ViewSystem/Views/EntryType.ts\");\n/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Helpers/Vector */ \"./src/game/Helpers/Vector.ts\");\n\r\n\r\nclass MainMenuEntry {\r\n    constructor(menu, type, view) {\r\n        this.position = _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__[\"default\"].zero;\r\n        this.size = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__[\"default\"](100, 100);\r\n        this.color = \"rgb(10, 100, 200)\";\r\n        this.view = view;\r\n        this.type = type;\r\n        this.menu = menu;\r\n        const canvas = this.view.viewManager.canvasManager;\r\n        this.position = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvas.width / 2 - this.size.width / 2, canvas.height / 2 - this.size.height / 2);\r\n    }\r\n    isExitItem() {\r\n        return this.type === _EntryType__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ExitItem;\r\n    }\r\n    isSelectable() {\r\n        return this.type !== _EntryType__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Separator;\r\n    }\r\n    initialize() {\r\n    }\r\n    update(isSelected, gameTime) {\r\n    }\r\n    draw() {\r\n        const canvas = this.view.viewManager.canvasManager;\r\n        canvas.drawSquare(this.position, this.size, this.color);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainMenuEntry);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/Views/MainMenuEntry.ts?");

/***/ }),

/***/ "./src/game/ViewSystem/Views/MainMenuView.ts":
/*!***************************************************!*\
  !*** ./src/game/ViewSystem/Views/MainMenuView.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ \"./src/game/ViewSystem/Views/View.ts\");\n/* harmony import */ var _MainMenuEntry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainMenuEntry */ \"./src/game/ViewSystem/Views/MainMenuEntry.ts\");\n/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Helpers/Vector */ \"./src/game/Helpers/Vector.ts\");\n/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Rectangle */ \"./src/game/ViewSystem/Views/Rectangle.ts\");\n\r\n\r\n\r\n\r\nclass MainMenuView extends _View__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(viewManager) {\r\n        super(viewManager);\r\n        this.menuEntries = new Array();\r\n        this.selectedEntry = -1;\r\n        this.handleClick = (eventArgs) => {\r\n            const hoverIndex = this.getMenuEntryAt(eventArgs.data.mousePosition);\r\n            if (hoverIndex > -1 && this.menuEntries[hoverIndex].isSelectable())\r\n                this.selectedEntry = hoverIndex;\r\n            else\r\n                this.selectedEntry = -1;\r\n            if (this.selectedEntry != -1) {\r\n                /* if (this.menuEntries[this.selectedEntry].isExitItem())\r\n                  this.viewManager.game.exit();\r\n                else  */\r\n                if (this.menuEntries[this.selectedEntry].view !== undefined) {\r\n                    this.viewManager.addView(this.menuEntries[this.selectedEntry].view);\r\n                }\r\n            }\r\n        };\r\n        this.initialize();\r\n    }\r\n    initialize() {\r\n    }\r\n    update(gameTime, coveredByOtherScreen) {\r\n        super.update(gameTime, coveredByOtherScreen);\r\n        // Update each nested MenuEntry object.\r\n        for (let i = 0; i < this.menuEntries.length; ++i) {\r\n            const isSelected = i == this.selectedEntry;\r\n            this.menuEntries[i].update(isSelected, gameTime);\r\n        }\r\n    }\r\n    draw() {\r\n        for (let i = 0; i < this.menuEntries.length; ++i) {\r\n            this.menuEntries[i].draw();\r\n        }\r\n    }\r\n    unloadContent() {\r\n        super.unloadContent();\r\n        this.viewManager.onMouseClick.unsubscribe(this.handleClick);\r\n    }\r\n    addMenuItem(type, view) {\r\n        const entry = new _MainMenuEntry__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this, type, view);\r\n        this.menuEntries.push(entry);\r\n    }\r\n    loadContent() {\r\n        super.loadContent();\r\n        this.viewManager.onMouseClick.subscribe(this.handleClick);\r\n        for (let i = 0; i < this.menuEntries.length; ++i) {\r\n            this.menuEntries[i].initialize();\r\n        }\r\n    }\r\n    getMenuEntryAt(position) {\r\n        let index = 0;\r\n        for (let entry of this.menuEntries) {\r\n            const rect = new _Rectangle__WEBPACK_IMPORTED_MODULE_3__[\"default\"](new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_2__[\"default\"]((entry.position.x + entry.size.width / 2), (entry.position.y + entry.size.height / 2)), new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_2__[\"default\"](entry.size.width, entry.size.height));\r\n            if (rect.contains(new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_2__[\"default\"](position.x, position.y)))\r\n                return index;\r\n            ++index;\r\n        }\r\n        return -1;\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainMenuView);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/Views/MainMenuView.ts?");

/***/ }),

/***/ "./src/game/ViewSystem/Views/Rectangle.ts":
/*!************************************************!*\
  !*** ./src/game/ViewSystem/Views/Rectangle.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Rectangle {\r\n    constructor(position, size) {\r\n        this.position = position;\r\n        this.size = size;\r\n    }\r\n    contains(point) {\r\n        const betweenX = point.x > this.position.x - this.size.width / 2 && point.x < this.position.x + this.size.width / 2;\r\n        const betweenY = point.y > this.position.y - this.size.height / 2 && point.y < this.position.y + this.size.height / 2;\r\n        const result = betweenX && betweenY;\r\n        return result;\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Rectangle);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/Views/Rectangle.ts?");

/***/ }),

/***/ "./src/game/ViewSystem/Views/SessionView.ts":
/*!**************************************************!*\
  !*** ./src/game/ViewSystem/Views/SessionView.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ \"./src/game/ViewSystem/Views/View.ts\");\n/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Helpers/Vector */ \"./src/game/Helpers/Vector.ts\");\n/* harmony import */ var _GameSystem_Collisions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../GameSystem/Collisions */ \"./src/game/GameSystem/Collisions.ts\");\n/* harmony import */ var _Helpers_MathFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Helpers/MathFunctions */ \"./src/game/Helpers/MathFunctions.ts\");\n/* harmony import */ var _GameSystem_GameObjects_Player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../GameSystem/GameObjects/Player */ \"./src/game/GameSystem/GameObjects/Player.ts\");\n/* harmony import */ var _GameSystem_GameObjects_Enemy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../GameSystem/GameObjects/Enemy */ \"./src/game/GameSystem/GameObjects/Enemy.ts\");\n/* harmony import */ var _GameState__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GameState */ \"./src/game/ViewSystem/Views/GameState.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass SessionView extends _View__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(viewManager) {\r\n        super(viewManager);\r\n        this.gameState = _GameState__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Active;\r\n        this.gameObjects = new Array();\r\n        this.spawnTimeStamp = 0;\r\n        this.player = new _GameSystem_GameObjects_Player__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\r\n            width: 40,\r\n            height: 40,\r\n            color: \"green\",\r\n            mass: 1,\r\n            restitution: 0.9,\r\n        }, this);\r\n        this.initialize();\r\n    }\r\n    initialize() {\r\n        /* const options = {\r\n            position: new Vector(0, 0),\r\n            velocity: new Vector(0, 0),\r\n            mass: 1,\r\n        }; */\r\n        /* for (let i = 0; i < 100; i++) {\r\n            const positionX = MathFunctions.randomInteger(0, this.viewManager.canvasManager.width);\r\n            const positionY = MathFunctions.randomInteger(0, this.viewManager.canvasManager.height);\r\n            options.position = new Vector(positionX, positionY);\r\n    \r\n            const velocityX = MathFunctions.randomInteger(-10, 10) / 10;\r\n            const velocityY = MathFunctions.randomInteger(-10, 10) / 10;\r\n            options.velocity = new Vector(velocityX, velocityY);\r\n    \r\n            this.gameObjects.push(new Enemy(options, this));\r\n        } */\r\n        this.gameObjects.push(this.player);\r\n    }\r\n    loadContent() {\r\n        super.loadContent();\r\n        this.viewManager.onMouseDown.subscribe(this.player.handlerSetPosition);\r\n        this.viewManager.onMouseMove.subscribe(this.player.handlerSetPosition);\r\n        this.viewManager.onMouseUp.subscribe(this.player.handlerUnhand);\r\n        this.viewManager.onKeyDown.subscribe(this.player.handlerKeyDown);\r\n        this.viewManager.onKeyUp.subscribe(this.player.handlerKeyUp);\r\n        this.viewManager.onMouseClick.subscribe(this.player.handleClick);\r\n    }\r\n    update(gameTime) {\r\n        if (this.gameState === _GameState__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Lose || this.gameState === _GameState__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Win) {\r\n            return;\r\n        }\r\n        this.spawnTimeStamp += gameTime;\r\n        if (this.spawnTimeStamp > 0.5) {\r\n            this.spawnTimeStamp = 0;\r\n            this.spawnEnemy();\r\n        }\r\n        this.gameObjects.forEach((obj) => obj.update(gameTime));\r\n        _GameSystem_Collisions__WEBPACK_IMPORTED_MODULE_2__[\"default\"].analyzeCollizions(this.gameObjects, this.viewManager.canvasManager.width, this.viewManager.canvasManager.height);\r\n        if (this.player.position.y < 0)\r\n            this.gameState = _GameState__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Win;\r\n        if (this.player.HP <= 0)\r\n            this.gameState = _GameState__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Lose;\r\n    }\r\n    draw() {\r\n        if (this.gameState === _GameState__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Lose) {\r\n            this.viewManager.canvasManager.drawEndGame(false);\r\n            return;\r\n        }\r\n        if (this.gameState === _GameState__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Win) {\r\n            this.viewManager.canvasManager.drawEndGame(true);\r\n            return;\r\n        }\r\n        this.gameObjects.forEach(obj => {\r\n            obj.draw();\r\n        });\r\n        this.player.draw();\r\n    }\r\n    unloadContent() {\r\n        super.unloadContent();\r\n    }\r\n    spawnEnemy() {\r\n        const options = {\r\n            position: new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__[\"default\"](0, 0),\r\n            velocity: new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__[\"default\"](0, 0),\r\n            mass: 1,\r\n            width: 50,\r\n        };\r\n        const positionX = _Helpers_MathFunctions__WEBPACK_IMPORTED_MODULE_3__[\"default\"].randomInteger(0, this.viewManager.canvasManager.width);\r\n        const positionY = options.width / 2;\r\n        options.position = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__[\"default\"](positionX, positionY);\r\n        const velocityX = _Helpers_MathFunctions__WEBPACK_IMPORTED_MODULE_3__[\"default\"].randomInteger(-20, 20) / 1;\r\n        const velocityY = _Helpers_MathFunctions__WEBPACK_IMPORTED_MODULE_3__[\"default\"].randomInteger(-20, 20) / 1;\r\n        options.velocity = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__[\"default\"](velocityX, velocityY);\r\n        this.gameObjects.push(new _GameSystem_GameObjects_Enemy__WEBPACK_IMPORTED_MODULE_5__[\"default\"](options, this));\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (SessionView);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/Views/SessionView.ts?");

/***/ }),

/***/ "./src/game/ViewSystem/Views/View.ts":
/*!*******************************************!*\
  !*** ./src/game/ViewSystem/Views/View.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/ViewState */ \"./src/game/Data/ViewState.ts\");\n\r\nclass View {\r\n    constructor(viewManager) {\r\n        this.isPopup = false;\r\n        this.viewState = _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Active;\r\n        this.viewManager = viewManager;\r\n    }\r\n    get IsActive() { return this.viewState == _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Active; }\r\n    update(gameTime, coveredByOtherScreen) {\r\n        if (coveredByOtherScreen) {\r\n            this.viewState = _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Hidden;\r\n        }\r\n        else {\r\n            this.viewState = _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Active;\r\n        }\r\n    }\r\n    draw() { }\r\n    loadContent() { }\r\n    unloadContent() { }\r\n    exitScreen() {\r\n        this.viewManager.removeView(this);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (View);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/Views/View.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_Presenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/Presenter */ \"./src/game/Presenter.ts\");\n\r\nconst presenter = new _game_Presenter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });