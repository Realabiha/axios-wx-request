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
 * @description: 函数柯里化
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
 * @description: wx接口promise封装
 * @param {Function} api wx接口
 * @param {Object} config 配置参数
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
 * @description: 基于wx.request封装的http请求方法
 * @config：请求参数同wx.request
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
 * @description: 拦截器构造函数
 * @param {Function} use 原型方法 用于收集回调函数到handlers属性上
 * @param {Function} forEach 原型方法 用于遍历handlers属性上的回调函数
 * @param {Array} handlers 实例属性 用于保存回调函数
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
 * @description: 对象属性合并
 * @param {Object} origin 源对象
 * @param {Object} target 目标对象
 * @return {Object}
 */
/* harmony default export */ function mergeConfig(origin, target) {
  return Object.assign(origin, target)
}
;// CONCATENATED MODULE: ./src/lib/core/index.js





// 回调队列[adapterChain,requestChain,responseChain]
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
  // 挂载拦截器到Axios实例
  instance.intercepter = {
    request: new intercepter(),
    response: new intercepter()
  }
  // 挂载请求取消函数到实例
  instance.cancelFunc = cancelFunc
  // 生成新的Axios原型上的request方法
  const request = Axios.prototype.request.bind(instance)
  // 合并Axios实例属性到新的request方法
  mergeConfig(request, instance)
  return request
}

/* harmony default export */ const core = (createInstance());
/******/ 	return __webpack_exports__;
/******/ })()
;
});