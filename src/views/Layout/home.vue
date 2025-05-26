<template>
  <div class="home">
    <div class="header">
      <div class="dataWrap">
        <span class="expense">总支出：<b>¥ 200</b></span>
        <span class="income">总收入：<b>¥ 500</b></span>
      </div>
      <div class="typeWrap">
        <div class="left">
          <span class="title">类型 </span>
        </div>
        <div class="right">
          <span class="time">2022-06</span>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="contenWrap">
        <BillItem :billList="list" />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import BillItem from '@/components/BillItem.vue'
import dayjs from 'dayjs'

import { getBillList } from '@/api/bill'

export default {
  name: 'Home',
  components: {
    BillItem // Define your components here
  },
  data () {
    return {
      currentTime: dayjs().format('YYYY-MM'),
      page: 1,
      totalPage: 0,
      isLoading: false,
      list: []
      // list: [
      //   {
      //     bills: [
      //       {
      //         amount: '25.00',
      //         date: '1623390740000',
      //         id: 911,
      //         pay_type: 1,
      //         remark: '',
      //         type_id: 1,
      //         type_name: '餐饮'
      //       },
      //       {
      //         amount: '24.00',
      //         date: '1623390740000',
      //         id: 912,
      //         pay_type: 1,
      //         remark: '',
      //         type_id: 1,
      //         type_name: '餐饮'
      //       }
      //     ],
      //     date: '2025-05-11'
      //   },
      //   {
      //     bills: [
      //       {
      //         amount: '25.00',
      //         date: '1623390740000',
      //         id: 911,
      //         pay_type: 1,
      //         remark: '',
      //         type_id: 1,
      //         type_name: '餐饮'
      //       },
      //       {
      //         amount: '24.00',
      //         date: '1623390740000',
      //         id: 912,
      //         pay_type: 2,
      //         remark: '',
      //         type_id: 1,
      //         type_name: '餐饮'
      //       }
      //     ],
      //     date: '2025-05-12'
      //   }
      // ]
    }
  },
  computed: {
    // Define your computed properties here
  },
  methods: {
    async onRefresh () {
      try {
        // 1. 模拟/发起异步请求
        const response = await this.fetchBillList()
        const data = response.data || []
        this.list = data.list
      } catch (error) {
        console.error('刷新失败', error)
      } finally {
        // 3. 无论成功或失败，都关闭加载状态
        this.isLoading = false
      }
    },
    fetchBillList () {
      return getBillList()
    }
  },
  mounted () {
    // Code to run when the component is mounted
    this.onRefresh()
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background-color: #007fff;
    color: #fff;
    font-size: 14px;
    z-index: 100;
    padding: 10px;
    .dataWrap {
      font-size: 14px;
      > span {
        font-size: 12px;
        > b {
          font-size: 26px;
          font-family: DINCondensed-Bold, DINCondensed;
          margin-left: 4px;
        }
      }
      .income {
        margin-left: 10px;
      }
    }
    .typeWrap {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      > div {
        align-self: flex-start;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 30px;
        padding: 3px 8px;
        font-size: 12px;
      }
      .left {
        margin-right: 6px;
      }
      .arrow {
        font-size: 12px;
        margin-left: 4px;
      }
    }
  }
  .content-wrap {
    height: calc(~"(100% - 50px)");
    overflow: hidden;
    overflow-y: scroll;
    background-color: #f5f5f5;
    padding: 10px;
  }
}
</style>
