<template>
  <van-popup
    v-model="internalShow"
    position="bottom"
    closeable
    :style="{ height: '60%' }"
  >
    <van-datetime-picker
      v-model="currentDate"
      type="year-month"
      title="选择年月"
      :show-toolbar="false"
    />
    <!-- 自定义底部确认按钮 -->
    <div class="custom-confirm">
      <van-button type="primary" round block @click="onConfirm"
        >确认</van-button
      >
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'PopupType',
  data () {
    return {
      currentDate: new Date()
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    internalShow: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val) // 通知父组件修改
      }
    }
  },
  methods: {
    onConfirm () {
      this.internalShow = false // 修改为 this.internalShow，确保关闭弹窗
      this.$emit('confirm', this.currentDate) // 发送事件给父组件
    }
  }
}
</script>
<style scoped lang="less">
.custom-confirm {
  padding: 10px;
  border-top: 1px solid #f0f0f0;
}
</style>
