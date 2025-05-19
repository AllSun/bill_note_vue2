<template>
 <div>
    <router-view/>
    <NavBar/>
 </div>

</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'Layout',
  components: {
    // 注册组件
    NavBar
  }
}
</script>

<style>

</style>
