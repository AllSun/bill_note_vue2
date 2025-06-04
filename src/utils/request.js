import axios from 'axios'
import store from '@/store'
const instance = axios.create({
  baseURL: 'http://127.0.0.1:7009',
  withCredentials: true,
  timeout: 5000, // 请求超时时间
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Authorization: store.getters.token || ''
  }
})

// 自定义配置 - 请求/响应 拦截器
// 添加请求拦截器
// axios.interceptors.request.use  =>改为  instance.interceptors.request.use
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 在发送请求之前做些什么
  // Toast.loading({
  //   message: '请求中...',
  //   forbidClick: true,
  //   loadingType: 'spinner',
  //   duration: 0
  // })
  console.log('请求拦截器的token', store.getters.token)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器，统一处理错误提示,如果统一拦截，response中的响应信息，应该都要包含message字段,作为一个标准格式
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么 (默认axios会多包装一层data，需要响应拦截器中处理一下)
  const res = response.data

  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
