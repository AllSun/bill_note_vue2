// 此处用于存放所有登录相关的接口请求
import { post } from '@/utils/index'
export const codeLogin = (username, password) => {
  return post('/api/user/login', {
    form: {
      username,
      password
    }
  })
}
