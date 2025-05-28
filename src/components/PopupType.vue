<template>
  <van-popup
    v-model="internalShow"
    position="bottom"
    closeable
    :close-on-click-overlay="true"
  >
    <div style="padding: 20px">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
      <van-button type="primary" @click="close">关闭</van-button>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'PopupType',
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
    close () {
      this.internalShow = false
    }
  }
}
</script>
