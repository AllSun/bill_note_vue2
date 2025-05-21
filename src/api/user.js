import request from '@/utils/request'
export const codeLogin = (username, password) => {
  return request.post('/api/user/login', {
    username,
    password
  })
}
export const codeRegister = (username, password) => {
  return request.post('/api/user/register', {
    username,
    password
  })
}
