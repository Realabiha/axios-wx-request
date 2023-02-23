### 描述
- 基于wx.request封装
### 安装
- npm install axios-wx-request
### 功能
- 支持拦截器 
- 请求取消

```js
import axios from 'axios-wx-request'

// 使用拦截器
axios.intercepter.request.use(_ => _, _ => _)
axios.intercepter.response.use(_ => _.data, _ => _)

// 获取cancelFunc及cancelPromise
const {cancelPromise, cancelFunc} = axios.cancelFunc()

const config = {
  // 请求配置同wx.request
  url: 'https://www.baidu.com',
  // promise状态改变会调用abort方法来取消本次请求
  cancelPromise 
}

// 模拟请求时长
axios(config).then(res => console.log(res)).catch(error => console.log(error))
// 修改cancelPromise的状态来取消请求
cancelFunc()

```