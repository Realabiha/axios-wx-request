(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["axios-wx-request"] = factory();
	else
		root["axios-wx-request"] = factory();
})(wx, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
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
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ core)
});

;// CONCATENATED MODULE: ./src/lib/utils/curry.js
/**
 * @description: ???????????????
 * @param {Function} func
 * @return {Function}
 */
const curry = function (func) {
  const collectArgs = []
  const inner = function (...args) {
    collectArgs.push(...args)
    if (func.length <= collectArgs.length)
      return func.apply(null, collectArgs)
    return inner
  }
  return inner
}
/* harmony default export */ const utils_curry = (curry);
;// CONCATENATED MODULE: ./src/lib/utils/promisify.js

/**
 * @description: wx??????promise??????
 * @param {Function} api wx??????
 * @param {Object} config ????????????
 * @return {Promise}
 */
const promisify = function (api, config) {
  return new Promise((resolve, reject) => {
    api({
      ...config,
      success(response) {
        resolve(response)
      },
      fail(reason) {
        reject(reason)
      }
    })
  })
}

const curriedPromisify = utils_curry(promisify)
/* harmony default export */ const utils_promisify = ((/* unused pure expression or super */ null && (promisify)));
;// CONCATENATED MODULE: ./src/lib/adapter/index.js
/**
 * @description: ??????wx.request?????????http????????????
 * @config??????????????????wx.request
 * @return {Promise}
 */

const request = function (config) {
  // return promisify(wx.request, config)
  return new Promise((resolve, reject) => {
    const reqTask = wx.request({
      ...config,
      success(response) {
        resolve(response)
      },
      fail(reason) {
        reject(reason)
      }
    })
    config.cancelPromise && config.cancelPromise.then(_ => reqTask.abort())
  })
}
/* harmony default export */ const adapter = (request);
;// CONCATENATED MODULE: ./src/lib/intercepter/index.js
/**
 * @description: ?????????????????????
 * @param {Function} use ???????????? ???????????????????????????handlers?????????
 * @param {Function} forEach ???????????? ????????????handlers????????????????????????
 * @param {Array} handlers ???????????? ????????????????????????
 * @return {*}
 */
const Intercepter = function () {
  this.handlers = []
}
Intercepter.prototype.use = function (onResolve, onReject) {
  this.handlers.push(onResolve, onReject)
}
Intercepter.prototype.forEach = function (handler) {
  this.handlers.forEach(handler)
}
/* harmony default export */ const intercepter = (Intercepter);

;// CONCATENATED MODULE: ./src/lib/cancelFunc/index.js
let cancel
/* harmony default export */ function cancelFunc() {
  return {
    cancelPromise: new Promise((resolve, reject) => {
      cancel = resolve
    }),
    cancelFunc() {
      cancel()
    }
  }
}
;// CONCATENATED MODULE: ./src/lib/utils/mergeConfig.js
/**
 * @description: ??????????????????
 * @param {Object} origin ?????????
 * @param {Object} target ????????????
 * @return {Object}
 */
/* harmony default export */ function mergeConfig(origin, target) {
  return Object.assign(origin, target)
}
;// CONCATENATED MODULE: ./src/lib/core/index.js





// ????????????[adapterChain,requestChain,responseChain]
const queue = []
// 
const adapterChain = [adapter, undefined]

const Axios = function () { }

Axios.prototype.request = function (config) {
  let promise = Promise.resolve(config)
  queue.push(adapterChain)
  const { request, response } = this.intercepter
  const requestChain = request.handlers
  const responseChain = response.handlers
  queue.unshift(requestChain)
  queue.push(responseChain)
  while (queue.length) {
    const item = queue.shift()
    while (item.length) {
      promise = promise.then(item.shift(), item.shift())
    }
  }
  return promise
}


const createInstance = function () {
  const instance = new Axios()
  // ??????????????????Axios??????
  instance.intercepter = {
    request: new intercepter(),
    response: new intercepter()
  }
  // ?????????????????????????????????
  instance.cancelFunc = cancelFunc
  // ????????????Axios????????????request??????
  const request = Axios.prototype.request.bind(instance)
  // ??????Axios?????????????????????request??????
  mergeConfig(request, instance)
  return request
}

/* harmony default export */ const core = (createInstance());
/******/ 	return __webpack_exports__;
/******/ })()
;
});