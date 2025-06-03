<template>
  <div class="data">
    <div class="total">
      <div class="time">
        <span @click="showPopupTime">{{ currentTime }}|</span
        ><van-icon name="calendar-o" size="1.5em" />
      </div>
      <div class="title">共支出</div>
      <div class="expense">¥{{ totalExpense }}</div>
      <div class="income">共收入 ¥{{ totalIncome }}</div>
    </div>
    <div class="datadetail">
      <div class="head">
        <span>收支构成</span>
        <span :class="{ active: totalType === 1 }" @click="totalType = 1"
          >支出</span
        >
        <span :class="{ active: totalType === 2 }" @click="totalType = 2"
          >收入</span
        >
      </div>
      <div class="body" v-for="(item, index) in currentData" :key="index">
        <span>{{ item.type_name }}</span>
        <span>￥{{ item.number }}</span>
        <van-progress :percentage="item.percentage" class="progress" />
      </div>
    </div>
    <div class="proportion">
      <div class="head">
        <span>收支构成</span>
        <span :class="{ active: totalType === 1 }" @click="changeType(1)"
          >支出</span
        >
        <span :class="{ active: totalType === 2 }" @click="changeType(2)"
          >收入</span
        >
      </div>
      <div id="proportion"></div>
    </div>
    <PopupTime
      v-model="showTime"
      @confirm="handleConfirm"
      timeType="month"
    ></PopupTime>
  </div>
</template>

<script>
import PopupTime from '@/components/PopupTime.vue'
import dayjs from 'dayjs'
import { getData } from '@/api/bill'
export default {
  data () {
    return {
      showTime: false,
      currentTime: dayjs().format('YYYY-MM'),
      totalType: 1, // 默认显示支出
      totalExpense: 0, // 默认支出金额
      totalIncome: 0, // 默认收入金额
      expenseData: [],
      incomeData: []
    }
  },
  computed: {
    currentData () {
      const total = this.totalType === 1 ? this.totalExpense : this.totalIncome
      const data = this.totalType === 1 ? this.expenseData : this.incomeData
      // 加工每项，带上 percentage 字段
      return data.map((item) => ({
        ...item,
        percentage: total > 0 ? Math.round((item.number / total) * 100) : 0
      }))
    }
  },
  components: {
    PopupTime
  },
  watch: {
    totalType (newType) {
      // 切换支出/收入时更新饼图
      this.setPieChart(newType === 1 ? this.expenseData : this.incomeData)
    }
  },
  methods: {
    showPopupTime () {
      this.showTime = !this.showTime
    },
    handleConfirm (date) {
      this.currentTime = dayjs(date).format('YYYY-MM')
      this.fetchData() // 确认时间后重新获取数据
      this.showTime = false
    },
    setPieChart (data) {
      if (window.echarts) {
        const dom = document.getElementById('proportion')
        if (!dom) return
        // eslint-disable-next-line no-undef
        const proportionChart = echarts.init(dom)
        proportionChart.setOption({
          tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
          legend: { data: data.map((item) => item.type_name) },
          series: [
            {
              name: this.totalType === 1 ? '支出' : '收入',
              type: 'pie',
              radius: '55%',
              data: data.map((item) => ({
                value: item.number,
                name: item.type_name
              })),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }
    },
    async fetchData () {
      // 模拟获取数据
      try {
        const response = await getData(this.currentTime)
        this.totalExpense = response.data.total_expense || []
        this.totalIncome = response.data.total_income || []
        this.expenseData = response.data.total_data
          .filter((item) => item.pay_type === 1)
          .sort((a, b) => b.number - a.number) // 过滤出账单类型为支出的项
        this.incomeData = response.data.total_data
          .filter((item) => item.pay_type === 2)
          .sort((a, b) => b.number - a.number) // 过滤出账单类型为收入的项
        this.setPieChart(
          this.totalType === 1 ? this.expenseData : this.incomeData
        )
        console.log('支出数据:', this.expenseData)
      } catch (error) {
        console.error('获取数据失败:', error)
      }
    },
    changeType (type) {
      this.totalType = type
      this.setPieChart(type === 1 ? this.expenseData : this.incomeData)
    }
  },
  mounted () {
    this.fetchData() // 组件加载时获取数据
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
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #999;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;

    span:first-child {
      flex: 1;
      text-align: left;
      color: #333;
      font-weight: bold;
    }

    span:not(:first-child) {
      margin-left: 12px;
      color: #666;
      cursor: pointer;

      &:hover {
        color: #ff4d4f;
      }

      &.active {
        color: #ff4d4f;
        font-weight: bold;
      }
    }
  }
  .datadetail {
    margin-top: 16px;
    padding: 16px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      padding-bottom: 12px;
      margin-bottom: 16px;

      span {
        font-size: 14px;
        color: #888;

        &:first-child {
          flex: 1;
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        &:not(:first-child) {
          margin-left: 12px;
          cursor: pointer;
          transition: color 0.3s;

          &.active {
            color: #ff4d4f;
            font-weight: bold;
          }

          &:hover {
            color: #ff7875;
          }
        }
      }
    }

    .body {
      display: flex;
      align-items: center;
      padding: 14px 0;
      border-bottom: 1px solid #f5f5f5;

      &:last-child {
        border-bottom: none;
      }

      span {
        font-size: 14px;
        color: #333;
      }

      span:first-child {
        flex: 1.2;
        white-space: nowrap;
      }

      span:nth-child(2) {
        flex: 1;
        text-align: right;
        color: #fa541c;
      }

      .progress {
        flex: 2;
        margin: 20px 0;
        margin-left: 12px;
      }
    }
  }
  #proportion {
    width: 100%;
    height: 300px; /* 或者你想要的高度 */
  }
}
</style>
