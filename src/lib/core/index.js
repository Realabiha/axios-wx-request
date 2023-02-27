import request from '../adapter'
import Intercepter from '../intercepter'
import cancelFunc from '../cancelFunc'
import mergeConfig from '../utils/mergeConfig'

// 回调队列[adapterChain,requestChain,responseChain]
const queue = []
// 
const adapterChain = [request, undefined]

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
    request: new Intercepter(),
    response: new Intercepter()
  }
  // 挂载请求取消函数到实例
  instance.cancelFunc = cancelFunc
  // 生成新的Axios原型上的request方法
  const request = Axios.prototype.request.bind(instance)
  // 合并Axios实例属性到新的request方法
  mergeConfig(request, instance)
  return request
}

export default createInstance()