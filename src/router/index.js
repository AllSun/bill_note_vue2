import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store' // 引入vuex的store实例
import Home from '@/views/Layout/home.vue'
import User from '@/views/Layout/user.vue'
import Data from '@/views/Layout/data.vue'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'

// 路由懒加载，按需配置
const About = () => import('@/views/About')
const Detail = () => import('@/views/Detail')
const UserInfo = () => import('@/views/UserInfo')
const Account = () => import('@/views/Account')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      // 兜底配置
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/data', component: Data },
        { path: '/user', component: User }
      ]
    },
    { path: '/about', component: About },
    // { path: '/detail', component: Detail },
    { path: '/userinfo', component: UserInfo },
    { path: '/account', component: Account },
    {
      path: '/detail/:id', // 通过账单 ID 跳转
      name: 'detail',
      component: Detail,
      props: true // 将路由参数作为 props 传递给组件
    }
  ]
})

// 所有的路由在真正被访问到之前(解析渲染对应组件页面前)，都会先经过全局前置守卫
// 只有全局前置守卫放行了，才会到达对应的页面

// 全局前置导航守卫
// to:   到哪里去，到哪去的完整路由信息对象 (路径，参数)
// from: 从哪里来，从哪来的完整路由信息对象 (路径，参数)
// next(): 是否放行
// (1) next()     直接放行，放行到to要去的路径
// (2) next(路径)  进行拦截，拦截到next里面配置的路径

// 定义一个数组，专门用户存放所有需要权限访问的页面
const authUrls = ['/home', '/data', '/user', '/userinfo', '/account', '/detail', '/about']
// 这里的authUrls可以从vuex中获取，或者从配置文件中获取

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 看 to.path 是否在 authUrls 中出现过
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }

  // 是权限页面，需要判断token
  // const token = store.state.user.userInfo.token,  这样写太麻烦，使用getters函数简化
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
