<template>
  <van-popup
    v-model="internalShow"
    position="bottom"
    closeable
    :style="{ height: '60%' }"
  >
    <div class="addWrap">
      <div class="type">
        <span :class="{ active: payType === 2 }" @click="payType = 2"
          >支出</span
        >
        <span :class="{ active: payType === 1 }" @click="payType = 1"
          >收入</span
        >
        <span class="time" @click="showPopupTime"
          >{{ currentDate }} <van-icon name="arrow-down"
        /></span>
      </div>
      <PopupTime
        v-model="showTime"
        @confirm="handleConfirm"
        timeType="day"
      ></PopupTime>
      <van-field
        v-model="keyvalue"
        readonly
        clickable
        size="large"
        @touchstart.native.stop="show = true"
      />
      <van-number-keyboard
        v-model="keyvalue"
        :show="true"
        theme="custom"
        :extra-key="['00', '.']"
        close-button-text="完成"
        @blur="show = false"
        @input="onInput"
        @delete="onDelete"
      />
    </div>
  </van-popup>
</template>

<script>
import PopupTime from './PopupTime.vue'
import dayjs from 'dayjs'

export default {
  name: 'PopupAdd',
  components: {
    PopupTime
  },
  data () {
    return {
      currentDate: dayjs().format('MM-DD'),
      payType: 2, // 默认选中支出
      showTime: false, // 控制时间选择器的显示
      keyvalue: ''
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
    showPopupTime () {
      this.showTime = !this.showTime
    },
    handleConfirm (date) {
      this.currentDate = this.formatDate(date)
    },
    formatDate (date) {
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      return `${m}-${d}`
    }
  }
}
</script>

<style>
.type span {
  display: inline-block;
  height: 30px;
  width: 50px;
  text-align: center;
  margin: 30px 15px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #ccc;
}
span.time {
  width: 100px;
}
.type span.active {
  background-color: #1989fa; /* 高亮颜色 */
  color: white;
  border-color: #1989fa;
}
</style>
