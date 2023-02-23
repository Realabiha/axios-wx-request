import request from '../adapter'
import Intercepter from '../intercepter'
import cancelFunc from '../cancelFunc'
import mergeConfig from '../utils/mergeConfig'

const queue = [request, undefined]

const Axios = function () { }

Axios.prototype.request = function (config) {
  let promise = Promise.resolve(config)

  const { request, response } = this.intercepter

  request.forEach(handler => {
    const { onResolve, onReject } = handler
    queue.unshift(onResolve, onReject)
  })
  response.forEach(handler => {
    const { onResolve, onReject } = handler
    queue.push(onResolve, onReject)
  })
  while (queue.length) {
    promise = promise.then(queue.shift(), queue.shift())
  }
  return promise
}


const createInstance = function () {
  const instance = new Axios()

  instance.intercepter = {
    request: new Intercepter(),
    response: new Intercepter()
  }

  instance.cancelFunc = cancelFunc

  const request = Axios.prototype.request.bind(instance)
  mergeConfig(request, instance)
  return request
}

export default createInstance()