import Vue from 'vue'
import VueRouter from 'vue-router'
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
    { path: '/detail', component: Detail },
    { path: '/userinfo', component: UserInfo },
    { path: '/account', component: Account }
  ]
})

export default router
