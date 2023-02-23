/**
 * @description: 拦截器构造函数
 * @param {Function} use 原型方法 用于收集回调函数到handlers属性上
 * @param {Function} forEach 原型方法 用于遍历handlers属性上的回调函数
 * @param {Array} handlers 实例属性 用于保存回调函数
 * @return {*}
 */
const Intercepter = function () { }
Intercepter.prototype.use = function (onResolve, onReject) {
  if (this.handlers === undefined) this.handlers = []
  this.handlers.unshift({ onResolve, onReject })
}
Intercepter.prototype.forEach = function (handler) {
  if (this.handlers === undefined) this.handlers = []
  this.handlers.forEach(handler)
}
export default Intercepter
