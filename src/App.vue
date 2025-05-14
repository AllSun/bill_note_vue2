<template>
  <div id="app">
    <router-view/>
    <NavBar/>
  </div>
</template>
<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    // 注册组件
    NavBar
  }
}
</script>

<style lang="less">

</style>
