import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from '@/store'// 导入按需导入的配置文件
import '@/utils/vant-ui'
import '@/styles/common.less'

Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
