/**
 * @description: 基于wx.request封装的http请求方法
 * @config：请求参数同wx.request
 * @return {Promise}
 */
import promisify from "../utils/promisify"
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
export default request