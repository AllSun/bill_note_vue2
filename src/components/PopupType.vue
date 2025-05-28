<template>
  <van-popup
    v-model="internalTypeShow"
    position="bottom"
    closeable
    :style="{ height: '60%' }"
  >

  </van-popup>
</template>

<script>
export default {
  name: 'PopupType',
  data () {
    return {

    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    internalTypeShow: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val) // 通知父组件修改
      }
    }
  },
  methods: {

  }
}
</script>
<style scoped lang="less">

</style>
