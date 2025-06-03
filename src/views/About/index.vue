<template>
<div>
    <van-nav-bar
      title="关于我们"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class='about'>
      <h2>关于项目</h2>
      <article>后台照搬<a href="https://github.com/Nick930826/jue-diary-server" target="_blank">Node + React 实战：从 0 到 1 实现记账本 H5</a>,博主的前端是react,本人使用vue2，脚手架是vue-cli，组件库是vant2</article>
      <h2>关于作者</h2>
      <article>
        吃了太饱，就是想有一门手艺，写好html架子,然后css用chatgpt写，了解vue2的语法，杂碎记录在了md里
      </article>
    </div>
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

<style scoped lang="less">
.about {
  padding: 0 20px;
  article {
    line-height: 20px;
  }
}
</style>
