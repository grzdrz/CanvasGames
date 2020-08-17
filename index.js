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

/***/ "./src/game/DrawingSystem/CanvasManager.ts":
/*!*************************************************!*\
  !*** ./src/game/DrawingSystem/CanvasManager.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Helpers/Vector */ \"./src/game/Helpers/Vector.ts\");\n/* harmony import */ var _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Events/EventArgs */ \"./src/game/Events/EventArgs.ts\");\n\r\n\r\nclass CanvasManager {\r\n    constructor(viewManager, element, width, height) {\r\n        this.calculateMouseGlobalPosition = (event) => {\r\n            let x;\r\n            let y;\r\n            if (event instanceof TouchEvent) {\r\n                const touchEvent = /* <TouchEvent> */ event;\r\n                x = touchEvent.changedTouches[0].pageX;\r\n                y = touchEvent.changedTouches[0].pageY;\r\n            }\r\n            else {\r\n                const mouseEvent = event;\r\n                x = mouseEvent.clientX;\r\n                y = mouseEvent.clientY;\r\n            }\r\n            // y = (document.documentElement.clientHeight + window.pageYOffset) - y;\r\n            return new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y);\r\n        };\r\n        this.handlerKeyDown = (event) => {\r\n            /* event.preventDefault(); */\r\n            this.viewManager.onKeyDown.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ key: event.code }));\r\n        };\r\n        this.handlerKeyUp = (event) => {\r\n            /* event.preventDefault(); */\r\n            this.viewManager.onKeyUp.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ key: event.code }));\r\n        };\r\n        this.viewManager = viewManager;\r\n        this.canvas = (element);\r\n        this.width = width;\r\n        this.height = height;\r\n        this.canvas.width = width;\r\n        this.canvas.height = height;\r\n        this.context = (this.canvas.getContext(\"2d\"));\r\n        /* this.context.canvas.clientWidth\r\n        this.context.canvas.clientHeight */\r\n        this.setDragAndDropHandlers();\r\n    }\r\n    drawObject(object) {\r\n        this.context.fillStyle = object.color;\r\n        // this.context.fillRect(object.position.x, object.position.y, object.width, object.height);\r\n        this.context.beginPath();\r\n        this.context.arc(object.position.x, object.position.y, object.width / 2, 0, 2 * Math.PI);\r\n        this.context.fill();\r\n    }\r\n    clear() {\r\n        this.context.fillStyle = \"gray\";\r\n        this.context.fillRect(0, 0, this.width, this.height);\r\n    }\r\n    setDragAndDropHandlers() {\r\n        this.canvas.ondragstart = () => false;\r\n        this.canvas.addEventListener(\"mousedown\", this.handlerMouseDown.bind(this));\r\n        this.canvas.addEventListener(\"touchstart\", this.handlerMouseDown.bind(this));\r\n        window.addEventListener(\"keydown\", this.handlerKeyDown.bind(this));\r\n        window.addEventListener(\"keyup\", this.handlerKeyUp.bind(this));\r\n    }\r\n    // d&d\r\n    handlerMouseDown(event) {\r\n        event.preventDefault();\r\n        const optionsForMouseEvents = {\r\n            handlerMouseMove: (_event) => { },\r\n            handlerMouseUp: (_event) => { },\r\n        };\r\n        const handlerMouseMove = this.handlerMouseMove.bind(this, optionsForMouseEvents);\r\n        optionsForMouseEvents.handlerMouseMove = handlerMouseMove;\r\n        const handlerMouseUp = this.handlerMouseUp.bind(this, optionsForMouseEvents);\r\n        optionsForMouseEvents.handlerMouseUp = handlerMouseUp; // чтобы обработчик mouseMove можно было отписать\r\n        document.addEventListener(\"mousemove\", handlerMouseMove);\r\n        document.addEventListener(\"mouseup\", handlerMouseUp);\r\n        document.addEventListener(\"touchmove\", handlerMouseMove);\r\n        document.addEventListener(\"touchend\", handlerMouseUp);\r\n        const mousePosition = this.calculateMouseGlobalPosition(event);\r\n        this.viewManager.onMouseMove.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ mousePosition }));\r\n    }\r\n    handlerMouseMove(optionsFromMouseDown, event) {\r\n        const mousePosition = this.calculateMouseGlobalPosition(event);\r\n        this.viewManager.onMouseMove.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ mousePosition }));\r\n    }\r\n    handlerMouseUp(optionsFromMouseDown, event) {\r\n        document.removeEventListener(\"mousemove\", optionsFromMouseDown.handlerMouseMove);\r\n        document.removeEventListener(\"mouseup\", optionsFromMouseDown.handlerMouseUp);\r\n        document.removeEventListener(\"touchmove\", optionsFromMouseDown.handlerMouseMove);\r\n        document.removeEventListener(\"touchend\", optionsFromMouseDown.handlerMouseUp);\r\n        const mousePosition = this.calculateMouseGlobalPosition(event);\r\n        this.viewManager.onMouseUp.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ mousePosition }));\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (CanvasManager);\r\n\n\n//# sourceURL=webpack:///./src/game/DrawingSystem/CanvasManager.ts?");

/***/ }),

/***/ "./src/game/Events/Event.ts":
/*!**********************************!*\
  !*** ./src/game/Events/Event.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Event {\r\n    constructor() {\r\n        this.handlers = new Array();\r\n        this.invoke = (args) => {\r\n            this.handlers.forEach((eventHandler) => eventHandler(args));\r\n        };\r\n        this.subscribe = (handler) => {\r\n            this.handlers.push(handler);\r\n        };\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Event);\r\n\n\n//# sourceURL=webpack:///./src/game/Events/Event.ts?");

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

/***/ "./src/game/GameSystem/GameObjects/GameObject.ts":
/*!*******************************************************!*\
  !*** ./src/game/GameSystem/GameObjects/GameObject.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Helpers/Vector */ \"./src/game/Helpers/Vector.ts\");\n\r\nclass GameObject {\r\n    constructor(options) {\r\n        this.width = 50;\r\n        this.height = 50;\r\n        this.position = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\r\n        this.velocity = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\r\n        this.mass = 1;\r\n        this.restitution = 0.9;\r\n        this.color = \"red\";\r\n        this.firstKeyDowned = \"\";\r\n        this.secondKeyDowned = \"\";\r\n        this.isColliding = false;\r\n        this.isGripped = false;\r\n        this.initialize(options);\r\n    }\r\n    initialize(options) {\r\n        if (options.width !== undefined)\r\n            this.width = options.width;\r\n        if (options.height !== undefined)\r\n            this.height = options.height;\r\n        if (options.position !== undefined)\r\n            this.position = options.position;\r\n        if (options.velocity !== undefined)\r\n            this.velocity = options.velocity;\r\n        if (options.mass !== undefined)\r\n            this.mass = options.mass;\r\n        if (options.restitution !== undefined)\r\n            this.restitution = options.restitution;\r\n        if (options.color !== undefined)\r\n            this.color = options.color;\r\n    }\r\n    update(gameTime) {\r\n        gameTime = gameTime * 10;\r\n        if (!this.isGripped) {\r\n            this.velocity.y += 9.81 * gameTime;\r\n            this.position.x += this.velocity.x * gameTime;\r\n            this.position.y += this.velocity.y * gameTime;\r\n        }\r\n        /* if (this.isColliding) this.color = \"red\";\r\n        else this.color = \"blue\"; */\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameObject);\r\n\n\n//# sourceURL=webpack:///./src/game/GameSystem/GameObjects/GameObject.ts?");

/***/ }),

/***/ "./src/game/GameSystem/GameObjects/Player.ts":
/*!***************************************************!*\
  !*** ./src/game/GameSystem/GameObjects/Player.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ \"./src/game/GameSystem/GameObjects/GameObject.ts\");\n\r\nclass Player extends _GameObject__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(options) {\r\n        super(options);\r\n        this.handlerKeyDown = (eventArgs) => {\r\n            if (this.firstKeyDowned === \"\")\r\n                this.firstKeyDowned = eventArgs.data.key;\r\n            else if (eventArgs.data.key !== this.firstKeyDowned)\r\n                this.secondKeyDowned = eventArgs.data.key;\r\n            if (this.firstKeyDowned !== \"\" && this.secondKeyDowned === \"\") {\r\n                if (this.firstKeyDowned === \"KeyD\")\r\n                    this.velocity.x += 5;\r\n                if (this.firstKeyDowned === \"KeyA\")\r\n                    this.velocity.x -= 5;\r\n                if (this.firstKeyDowned === \"KeyS\")\r\n                    this.velocity.y += 5;\r\n                if (this.firstKeyDowned === \"KeyW\")\r\n                    this.velocity.y -= 5;\r\n            }\r\n            else if (this.firstKeyDowned !== \"\" && this.secondKeyDowned !== \"\") {\r\n                if ((this.firstKeyDowned === \"KeyD\" && this.secondKeyDowned === \"KeyW\") ||\r\n                    (this.firstKeyDowned === \"KeyW\" && this.secondKeyDowned === \"KeyD\")) {\r\n                    this.velocity.x += 5;\r\n                    this.velocity.y -= 5;\r\n                }\r\n                if ((this.firstKeyDowned === \"KeyD\" && this.secondKeyDowned === \"KeyS\") ||\r\n                    (this.firstKeyDowned === \"KeyS\" && this.secondKeyDowned === \"KeyD\")) {\r\n                    this.velocity.x += 5;\r\n                    this.velocity.y += 5;\r\n                }\r\n                if ((this.firstKeyDowned === \"KeyA\" && this.secondKeyDowned === \"KeyW\") ||\r\n                    (this.firstKeyDowned === \"KeyW\" && this.secondKeyDowned === \"KeyA\")) {\r\n                    this.velocity.x -= 5;\r\n                    this.velocity.y -= 5;\r\n                }\r\n                if ((this.firstKeyDowned === \"KeyA\" && this.secondKeyDowned === \"KeyS\") ||\r\n                    (this.firstKeyDowned === \"KeyS\" && this.secondKeyDowned === \"KeyA\")) {\r\n                    this.velocity.x -= 5;\r\n                    this.velocity.y += 5;\r\n                }\r\n            }\r\n        };\r\n        this.handlerKeyUp = ( /* eventArgs: EventArgs<IKeyData> */) => {\r\n            if (this.secondKeyDowned === \"\")\r\n                this.firstKeyDowned = \"\";\r\n            else\r\n                this.secondKeyDowned = \"\";\r\n        };\r\n        this.handlerSetPosition = (eventArgs) => {\r\n            this.isGripped = true;\r\n            this.velocity.x = 0;\r\n            this.velocity.y = 0;\r\n            this.position.x = eventArgs.data.mousePosition.x;\r\n            this.position.y = eventArgs.data.mousePosition.y;\r\n        };\r\n        this.handlerUnhand = (eventArgs) => {\r\n            this.isGripped = false;\r\n        };\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\r\n\n\n//# sourceURL=webpack:///./src/game/GameSystem/GameObjects/Player.ts?");

/***/ }),

/***/ "./src/game/GameSystem/Physic.ts":
/*!***************************************!*\
  !*** ./src/game/GameSystem/Physic.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Helpers/Vector */ \"./src/game/Helpers/Vector.ts\");\n\r\nconst borderRestitution = 0.9;\r\nclass Physic {\r\n    static detectCollision(obj1, obj2) {\r\n        const vectorBetweenObjects = obj2.position.subtract(obj1.position);\r\n        const sumOfRadiusesOfObjects = obj1.width / 2 + obj2.width / 2;\r\n        return (vectorBetweenObjects.length <= sumOfRadiusesOfObjects);\r\n    }\r\n    static analyzeCollisions(objects) {\r\n        let obj1;\r\n        let obj2;\r\n        // сброс состояний коллизий\r\n        for (let i = 0; i < objects.length; i++) {\r\n            objects[i].isColliding = false;\r\n        }\r\n        // поиск коллизий\r\n        for (let i = 0; i < objects.length; i++) {\r\n            obj1 = objects[i];\r\n            for (let j = i + 1; j < objects.length; j++) {\r\n                obj2 = objects[j];\r\n                // Compare object1 with object2\r\n                if (Physic.detectCollision(obj1, obj2)) {\r\n                    obj1.isColliding = true;\r\n                    obj2.isColliding = true;\r\n                    const vectorBetweenObjects = obj2.position.subtract(obj1.position);\r\n                    const unitVector = vectorBetweenObjects.getUnitVector();\r\n                    // расталкиваем объекты если между ними образовалось пересечение(иначе слипнутся)\r\n                    const contactDepth = vectorBetweenObjects.length - (obj1.width / 2 + obj2.width / 2);\r\n                    let pushingDistance;\r\n                    if (unitVector.x === 0 && unitVector.y === 0)\r\n                        pushingDistance = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"]((contactDepth / 2) * (16 / 25), (contactDepth / 2) * (9 / 25));\r\n                    else\r\n                        pushingDistance = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__[\"default\"]((contactDepth / 2) * unitVector.x, (contactDepth / 2) * unitVector.y);\r\n                    obj1.position = obj1.position.sum(pushingDistance);\r\n                    obj2.position = obj2.position.subtract(pushingDistance);\r\n                    const relativeVelocity = obj1.velocity.subtract(obj2.velocity);\r\n                    let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;\r\n                    speed *= Math.min(obj1.restitution, obj2.restitution);\r\n                    const impulse = 2 * speed / (obj1.mass + obj2.mass);\r\n                    obj1.velocity.x -= (impulse * obj2.mass * unitVector.x);\r\n                    obj1.velocity.y -= (impulse * obj2.mass * unitVector.y);\r\n                    obj2.velocity.x += (impulse * obj1.mass * unitVector.x);\r\n                    obj2.velocity.y += (impulse * obj1.mass * unitVector.y);\r\n                }\r\n            }\r\n        }\r\n    }\r\n    static detectEdgeCollisions(gameObjects, canvasWidth, canvasHeight) {\r\n        let obj;\r\n        for (let i = 0; i < gameObjects.length; i++) {\r\n            obj = gameObjects[i];\r\n            // Check for left and right\r\n            if (obj.position.x < obj.width / 2) {\r\n                obj.velocity.x = Math.abs(obj.velocity.x) * borderRestitution;\r\n                obj.position.x = obj.width / 2;\r\n            }\r\n            else if (obj.position.x > canvasWidth - obj.width / 2) {\r\n                obj.velocity.x = -Math.abs(obj.velocity.x) * borderRestitution;\r\n                obj.position.x = canvasWidth - obj.width / 2;\r\n            }\r\n            // Check for bottom and top\r\n            if (obj.position.y < obj.width / 2) {\r\n                obj.velocity.y = Math.abs(obj.velocity.y) * borderRestitution;\r\n                obj.position.y = obj.width / 2;\r\n            }\r\n            else if (obj.position.y > canvasHeight - obj.width / 2) {\r\n                obj.velocity.y = -Math.abs(obj.velocity.y) * borderRestitution;\r\n                obj.position.y = canvasHeight - obj.width / 2;\r\n            }\r\n        }\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Physic);\r\n\n\n//# sourceURL=webpack:///./src/game/GameSystem/Physic.ts?");

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

/***/ "./src/game/Model/Data/ModelData.ts":
/*!******************************************!*\
  !*** ./src/game/Model/Data/ModelData.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ModelData {\r\n    constructor(data) {\r\n        this.initialize(data);\r\n    }\r\n    initialize(data) {\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ModelData);\r\n\n\n//# sourceURL=webpack:///./src/game/Model/Data/ModelData.ts?");

/***/ }),

/***/ "./src/game/Model/Model.ts":
/*!*********************************!*\
  !*** ./src/game/Model/Model.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Events_Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Events/Event */ \"./src/game/Events/Event.ts\");\n/* harmony import */ var _Data_ModelData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data/ModelData */ \"./src/game/Model/Data/ModelData.ts\");\n/* harmony import */ var _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Events/EventArgs */ \"./src/game/Events/EventArgs.ts\");\n\r\n\r\n\r\nclass Model {\r\n    constructor(data) {\r\n        this.onGetViewData = new _Events_Event__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.onSetViewData = new _Events_Event__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.data = data;\r\n    }\r\n    initialize() {\r\n        this.update(this.data);\r\n    }\r\n    update(data) {\r\n    }\r\n    getViewData() {\r\n        const eventArgs = new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({});\r\n        this.onGetViewData.invoke(eventArgs);\r\n        return eventArgs.data;\r\n    }\r\n    getData(args) {\r\n        args.data = new _Data_ModelData__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.data);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Model);\r\n\n\n//# sourceURL=webpack:///./src/game/Model/Model.ts?");

/***/ }),

/***/ "./src/game/Presenter.ts":
/*!*******************************!*\
  !*** ./src/game/Presenter.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Model_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model/Model */ \"./src/game/Model/Model.ts\");\n/* harmony import */ var _ViewSystem_ViewManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewSystem/ViewManager */ \"./src/game/ViewSystem/ViewManager.ts\");\n/* harmony import */ var _Model_Data_ModelData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Model/Data/ModelData */ \"./src/game/Model/Data/ModelData.ts\");\n/* harmony import */ var _ViewSystem_Data_ViewData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewSystem/Data/ViewData */ \"./src/game/ViewSystem/Data/ViewData.ts\");\n/* harmony import */ var _ViewSystem_Views_SessionView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ViewSystem/Views/SessionView */ \"./src/game/ViewSystem/Views/SessionView.ts\");\n/* harmony import */ var _Styles_Game_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Styles/Game.scss */ \"./src/game/Styles/Game.scss\");\n/* harmony import */ var _Styles_Game_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Styles_Game_scss__WEBPACK_IMPORTED_MODULE_5__);\n\r\n\r\n\r\n\r\n\r\n\r\nconst defaultModelData = {};\r\nconst defaultViewData = {};\r\nclass Presenter {\r\n    constructor() {\r\n        this.gameComponents = new Array();\r\n        this.secondsPassed = 0;\r\n        this.oldTimeStamp = 0;\r\n        this.invokeGameCycle = (gameTime) => {\r\n            this.secondsPassed = (gameTime - this.oldTimeStamp) / 1000;\r\n            this.secondsPassed = Math.min(this.secondsPassed, 0.1);\r\n            this.oldTimeStamp = gameTime;\r\n            this.gameComponents.forEach(component => {\r\n                component.update(this.secondsPassed);\r\n                component.draw();\r\n            });\r\n            requestAnimationFrame(this.invokeGameCycle);\r\n        };\r\n        this.handlerSetModelData = (args) => {\r\n            this.model.update(args.data);\r\n        };\r\n        this.handlerSetViewData = (args) => {\r\n            this.viewManager.setData(args.data);\r\n        };\r\n        this.handlerGetModelData = (args) => {\r\n            this.model.getData(args);\r\n        };\r\n        this.handlerGetViewData = (args) => {\r\n            this.viewManager.getData(args);\r\n        };\r\n        const canvas = (document.querySelector(\".game\"));\r\n        const modelData = new _Model_Data_ModelData__WEBPACK_IMPORTED_MODULE_2__[\"default\"](defaultModelData);\r\n        const viewData = new _ViewSystem_Data_ViewData__WEBPACK_IMPORTED_MODULE_3__[\"default\"](defaultViewData);\r\n        this.model = new _Model_Model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](modelData);\r\n        this.viewManager = new _ViewSystem_ViewManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"](viewData, canvas);\r\n        this.gameComponents.push(this.viewManager);\r\n        this.initialize();\r\n    }\r\n    initialize() {\r\n        this.viewManager.onSetModelData.subscribe(this.handlerSetModelData);\r\n        this.viewManager.onSetViewData.subscribe(this.handlerSetViewData);\r\n        this.model.onSetViewData.subscribe(this.handlerSetViewData);\r\n        this.model.initialize();\r\n        this.viewManager.initialize();\r\n        let sessioonView = new _ViewSystem_Views_SessionView__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this.viewManager);\r\n        this.viewManager.addView(sessioonView);\r\n        this.gameComponents.forEach(component => {\r\n            component.loadContent();\r\n        });\r\n        this.invokeGameCycle(0);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Presenter);\r\n\n\n//# sourceURL=webpack:///./src/game/Presenter.ts?");

/***/ }),

/***/ "./src/game/Styles/Game.scss":
/*!***********************************!*\
  !*** ./src/game/Styles/Game.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./Game.scss */ \"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/game/Styles/Game.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/game/Styles/Game.scss?");

/***/ }),

/***/ "./src/game/ViewSystem/Data/ViewData.ts":
/*!**********************************************!*\
  !*** ./src/game/ViewSystem/Data/ViewData.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ViewData {\r\n    constructor(data) {\r\n        this.initialize(data);\r\n    }\r\n    initialize(data) {\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewData);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/Data/ViewData.ts?");

/***/ }),

/***/ "./src/game/ViewSystem/Data/ViewState.ts":
/*!***********************************************!*\
  !*** ./src/game/ViewSystem/Data/ViewState.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar ViewState;\r\n(function (ViewState) {\r\n    ViewState[ViewState[\"Active\"] = 0] = \"Active\";\r\n    ViewState[ViewState[\"Hidden\"] = 1] = \"Hidden\";\r\n})(ViewState || (ViewState = {}));\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewState);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/Data/ViewState.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Data_ViewData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Data/ViewData */ \"./src/game/ViewSystem/Data/ViewData.ts\");\n/* harmony import */ var _Events_Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Events/Event */ \"./src/game/Events/Event.ts\");\n/* harmony import */ var _DrawingSystem_CanvasManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DrawingSystem/CanvasManager */ \"./src/game/DrawingSystem/CanvasManager.ts\");\n/* harmony import */ var _Data_ViewState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Data/ViewState */ \"./src/game/ViewSystem/Data/ViewState.ts\");\n/* harmony import */ var _GameComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GameComponent */ \"./src/game/ViewSystem/GameComponent.ts\");\n/* harmony import */ var _Events_EventArgs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Events/EventArgs */ \"./src/game/Events/EventArgs.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass ViewManager extends _GameComponent__WEBPACK_IMPORTED_MODULE_4__[\"default\"] {\r\n    constructor(viewData, canvas) {\r\n        super();\r\n        this.views = new Array();\r\n        this.viewsToUpdate = new Array();\r\n        this.isInitialized = false;\r\n        // public assets\r\n        this.onSetViewData = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onSetModelData = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onGetModelData = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onHandleMove = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onInputsChange = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onMouseDown = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onMouseMove = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onMouseUp = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onKeyDown = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.onKeyUp = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this.viewData = viewData;\r\n        const viewportWidth = this.canvasManager = new _DrawingSystem_CanvasManager__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this, canvas, 1000, 600);\r\n        this.isGameActive = true;\r\n        this.update = this.update.bind(this);\r\n        this.draw = this.draw.bind(this);\r\n    }\r\n    initialize() {\r\n        this.isInitialized = true;\r\n        this.setData(this.viewData);\r\n    }\r\n    loadContent() {\r\n        for (let view of this.views) {\r\n            view.loadContent();\r\n        }\r\n    }\r\n    unloadContent() {\r\n        for (let view of this.views) {\r\n            view.unloadContent();\r\n        }\r\n    }\r\n    update(gameTime) {\r\n        this.viewsToUpdate = [];\r\n        for (let view of this.views) {\r\n            this.viewsToUpdate.push(view);\r\n        }\r\n        let coveredByOtherScreen = false;\r\n        while (this.viewsToUpdate.length > 0) {\r\n            let view = this.viewsToUpdate[this.viewsToUpdate.length - 1];\r\n            this.viewsToUpdate.pop();\r\n            // Update the screen.\r\n            view.update(gameTime, coveredByOtherScreen);\r\n            if (view.viewState == _Data_ViewState__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Active) {\r\n                if (!view.isPopup)\r\n                    coveredByOtherScreen = true;\r\n            }\r\n        }\r\n    }\r\n    draw() {\r\n        this.canvasManager.clear();\r\n        for (let view of this.views) {\r\n            if (view.viewState == _Data_ViewState__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Hidden)\r\n                continue;\r\n            view.draw();\r\n        }\r\n        //input.draw();\r\n    }\r\n    addView(view) {\r\n        view.viewManager = this;\r\n        if (this.isInitialized)\r\n            view.loadContent();\r\n        this.views.push(view);\r\n    }\r\n    removeView(view) {\r\n        if (this.isInitialized)\r\n            view.unloadContent();\r\n        let index = this.views.indexOf(view);\r\n        if (index > -1) {\r\n            this.views.splice(index, 1);\r\n        }\r\n        index = this.viewsToUpdate.indexOf(view);\r\n        if (index > -1) {\r\n            this.viewsToUpdate.splice(index, 1);\r\n        }\r\n    }\r\n    setData(data) {\r\n        /* if (data.sliderStripThickness !== undefined) this.viewData.sliderStripThickness = data.sliderStripThickness; */\r\n    }\r\n    getModelData() {\r\n        const optionsEventArgs = new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({});\r\n        this.onGetModelData.invoke(optionsEventArgs);\r\n        return optionsEventArgs.data;\r\n    }\r\n    getData(args) {\r\n        args.data = new _Data_ViewData__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.viewData);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewManager);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/ViewManager.ts?");

/***/ }),

/***/ "./src/game/ViewSystem/Views/SessionView.ts":
/*!**************************************************!*\
  !*** ./src/game/ViewSystem/Views/SessionView.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ \"./src/game/ViewSystem/Views/View.ts\");\n/* harmony import */ var _GameSystem_GameObjects_GameObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../GameSystem/GameObjects/GameObject */ \"./src/game/GameSystem/GameObjects/GameObject.ts\");\n/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Helpers/Vector */ \"./src/game/Helpers/Vector.ts\");\n/* harmony import */ var _GameSystem_Physic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../GameSystem/Physic */ \"./src/game/GameSystem/Physic.ts\");\n/* harmony import */ var _Helpers_MathFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Helpers/MathFunctions */ \"./src/game/Helpers/MathFunctions.ts\");\n/* harmony import */ var _GameSystem_GameObjects_Player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../GameSystem/GameObjects/Player */ \"./src/game/GameSystem/GameObjects/Player.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass SessionView extends _View__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(viewManager) {\r\n        super(viewManager);\r\n        this.gameObjects = new Array();\r\n        this.player = new _GameSystem_GameObjects_Player__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\r\n            width: 40,\r\n            height: 40,\r\n            color: \"green\",\r\n            mass: 1,\r\n        });\r\n        this.initialize();\r\n    }\r\n    initialize() {\r\n        const options = {\r\n            position: new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_2__[\"default\"](0, 0),\r\n            velocity: new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_2__[\"default\"](0, 0),\r\n            mass: 1,\r\n        };\r\n        for (let i = 0; i < 50; i++) {\r\n            const positionX = _Helpers_MathFunctions__WEBPACK_IMPORTED_MODULE_4__[\"default\"].randomInteger(0, this.viewManager.canvasManager.width);\r\n            const positionY = _Helpers_MathFunctions__WEBPACK_IMPORTED_MODULE_4__[\"default\"].randomInteger(0, this.viewManager.canvasManager.height);\r\n            options.position = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_2__[\"default\"](positionX, positionY);\r\n            const velocityX = _Helpers_MathFunctions__WEBPACK_IMPORTED_MODULE_4__[\"default\"].randomInteger(-10, 10) / 10;\r\n            const velocityY = _Helpers_MathFunctions__WEBPACK_IMPORTED_MODULE_4__[\"default\"].randomInteger(-10, 10) / 10;\r\n            options.velocity = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_2__[\"default\"](velocityX, velocityY);\r\n            this.gameObjects.push(new _GameSystem_GameObjects_GameObject__WEBPACK_IMPORTED_MODULE_1__[\"default\"](options));\r\n        }\r\n        this.gameObjects.push(this.player);\r\n    }\r\n    loadContent() {\r\n        super.loadContent();\r\n        this.viewManager.onMouseDown.subscribe(this.player.handlerSetPosition);\r\n        this.viewManager.onMouseMove.subscribe(this.player.handlerSetPosition);\r\n        this.viewManager.onMouseUp.subscribe(this.player.handlerUnhand);\r\n        this.viewManager.onKeyDown.subscribe(this.player.handlerKeyDown);\r\n        this.viewManager.onKeyUp.subscribe(this.player.handlerKeyUp);\r\n    }\r\n    update(gameTime) {\r\n        this.gameObjects.forEach((obj) => obj.update(gameTime));\r\n        _GameSystem_Physic__WEBPACK_IMPORTED_MODULE_3__[\"default\"].analyzeCollisions(this.gameObjects);\r\n        _GameSystem_Physic__WEBPACK_IMPORTED_MODULE_3__[\"default\"].detectEdgeCollisions(this.gameObjects, this.viewManager.canvasManager.width, this.viewManager.canvasManager.height);\r\n    }\r\n    draw() {\r\n        this.gameObjects.forEach(obj => {\r\n            this.viewManager.canvasManager.drawObject(obj);\r\n        });\r\n    }\r\n    unloadContent() {\r\n        super.unloadContent();\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (SessionView);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/Views/SessionView.ts?");

/***/ }),

/***/ "./src/game/ViewSystem/Views/View.ts":
/*!*******************************************!*\
  !*** ./src/game/ViewSystem/Views/View.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Data/ViewState */ \"./src/game/ViewSystem/Data/ViewState.ts\");\n\r\nclass View {\r\n    constructor(viewManager) {\r\n        this.isPopup = false;\r\n        this.viewState = _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Active;\r\n        this.viewManager = viewManager;\r\n    }\r\n    get IsActive() { return this.viewState == _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Active; }\r\n    update(gameTime, coveredByOtherScreen) {\r\n        if (coveredByOtherScreen) {\r\n            this.viewState = _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Hidden;\r\n        }\r\n        else {\r\n            this.viewState = _Data_ViewState__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Active;\r\n        }\r\n    }\r\n    draw() { }\r\n    loadContent() { }\r\n    unloadContent() { }\r\n    exitScreen() {\r\n        this.viewManager.removeView(this);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (View);\r\n\n\n//# sourceURL=webpack:///./src/game/ViewSystem/Views/View.ts?");

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