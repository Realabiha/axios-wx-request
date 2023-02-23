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
export default curry