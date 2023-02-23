/**
 * @description: 对象属性合并
 * @param {Object} origin 源对象
 * @param {Object} target 目标对象
 * @return {Object}
 */
export default function (origin, target) {
  return Object.assign(origin, target)
}