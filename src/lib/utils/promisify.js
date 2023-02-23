import curry from "./curry"
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

export const curriedPromisify = curry(promisify)
export default promisify