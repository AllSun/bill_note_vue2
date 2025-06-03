<template>
<div>
    <van-nav-bar
      title="密码重置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
</div>
</template>

<script>
export default {
  methods: {
    onClickLeft () {
      this.$router.push('/user')
    }
  }
}
</script>

<style>

</style>
