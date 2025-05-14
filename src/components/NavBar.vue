<template>
<van-tabbar v-model="active" route>
  <van-tabbar-item replace to="/home" icon="balance-list-o" >账单</van-tabbar-item>
  <van-tabbar-item replace to="/data" icon="chart-trending-o">统计</van-tabbar-item>
  <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      active: 'home'
    }
  }
}
</script>

<style>

</style>
