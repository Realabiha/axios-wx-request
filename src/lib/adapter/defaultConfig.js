/**
 * @description: wx.request请求默认配置
 * @return {*}
 */
export default {
  url: '',
  data: {},
  header: { 'content-type': 'application/json' },
  method: 'GET',
  dataType: 'json',
  responseType: 'text',
  success: (result) => { },
  fail: () => { },
  complete: () => { }
}