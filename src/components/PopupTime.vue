<template>
  <van-popup
    v-model="internalShow"
    position="bottom"
    closeable
    :style="{ height: '60%' }"
  >
    <div class="header">请选择时间</div>
    <van-datetime-picker
      v-if="timeType === 'month'"
      v-model="currentDate"
      type="year-month"
      title="选择年月"
      :show-toolbar="false"
    />
    <van-datetime-picker
      v-else
      v-model="currentDate"
      type="date"
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
    },
    timeType: {
      type: String
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
  },
  mounted () {
    // 初始化当前日期为今天
    console.log('收到的时间类型为', this.timeType)
  }
}
</script>
<style scoped lang="less">
.header {
  padding: 16px;
  font-size: 18px;
  text-align: center;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.custom-confirm {
  padding: 10px;
  border-top: 1px solid #f0f0f0;
}
</style>
