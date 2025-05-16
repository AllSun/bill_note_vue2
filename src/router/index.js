import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import User from '@/views/User'
import Data from '@/views/Data'
// 路由懒加载，按需配置
const Login = () => import('@/views/Login')
const About = () => import('@/views/About')
const Detail = () => import('@/views/Detail')
const UserInfo = () => import('@/views/UserInfo')
const Account = () => import('@/views/Account')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/user', component: User },
    { path: '/data', component: Data },
    { path: '/about', component: About },
    { path: '/detail', component: Detail },
    { path: '/userinfo', component: UserInfo },
    { path: '/account', component: Account }
  ]
})

export default router
