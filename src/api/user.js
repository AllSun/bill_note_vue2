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
export const getUserInfo = () => {
  return request.get('/api/user/get_userinfo')
}

export const updateUserInfo = (signature, avatar) => {
  return request.post('/api/user/edit_userinfo', { signature, avatar })
}

// eslint-disable-next-line camelcase
export const modifyPassword = (old_pass, new_pass, new_pass2) => {
  return request.post('/api/user/modify_pass', {
    old_pass,
    new_pass,
    new_pass2
  })
}
