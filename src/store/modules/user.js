import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getInfo() // 获取个人信息
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj) // 设置个人信息
    }
  },
  actions: {}
}
