<template>
  <div class="data">
    <div class="total">
      <div class="time">
        <span @click="showPopupTime">{{currentTime}}|</span><van-icon name="calendar-o" size="1.5em" />
      </div>
      <div class="title">共支出</div>
      <div class="expense">¥1000</div>
      <div class="income">共收入 ¥200</div>
    </div>
    <PopupTime v-model="showTime" @confirm="handleConfirm" timeType="month"></PopupTime>
  </div>
</template>

<script>
import PopupTime from '@/components/PopupTime.vue'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      showTime: false,
      currentTime: dayjs().format('YYYY-MM')
    }
  },
  components: {
    PopupTime
  },
  methods: {
    showPopupTime () {
      this.showTime = !this.showTime
    },
    handleConfirm (date) {
      this.currentTime = dayjs(date).format('YYYY-MM')
      this.showTime = false
    }
  }
}
</script>

<style scoped lang="less">
.data {
  padding: 16px;

  .total {
    background: linear-gradient(135deg, #fdfbfb, #ebedee);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;

    .time {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #888;
      margin-bottom: 8px;

      span {
        margin-right: 4px;
      }

      .van-icon {
        vertical-align: middle;
      }
    }

    .title {
      font-size: 16px;
      color: #555;
      margin-bottom: 6px;
    }

    .expense {
      font-size: 28px;
      font-weight: bold;
      color: #ff4d4f;
      margin-bottom: 8px;
    }

    .income {
      font-size: 14px;
      color: #52c41a;
    }
  }
}
</style>
