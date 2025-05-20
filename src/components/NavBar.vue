<template>
  <div v-if=" ['/', '/home','/data', '/user'].includes($route.path)">
    <van-tabbar v-model="active" route>
  <van-tabbar-item replace to="/home" icon="balance-list-o" >账单</van-tabbar-item>
  <van-tabbar-item replace to="/data" icon="chart-trending-o">统计</van-tabbar-item>
  <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
  </div>

</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      active: 0
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler (newPath) {
        const pathMap = {
          '/': 0,
          '/home': 0, // 同账单页
          '/data': 1,
          '/user': 2
        }
        this.active = pathMap[newPath] ?? 0
      }
    }
  }
}
</script>

<style>

</style>
