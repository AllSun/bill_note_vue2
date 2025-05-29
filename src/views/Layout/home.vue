<template>
  <div class="home">
    <div class="header">
      <div class="dataWrap">
        <span class="expense"
          >总支出：<b>¥{{ totalExpense }}</b></span
        >
        <span class="income"
          >总收入：<b>¥{{ totalIncome }}</b></span
        >
      </div>
      <div class="typeWrap">
        <div class="left">
          <span class="title" @click="showPopupType"
            >{{
              this.typeList.filter((item) => item.id === this.type_id)[0]
                ?.name || "全部类型"
            }}
            <van-icon name="arrow-down"
          /></span>
        </div>
        <div class="right">
          <span class="time" @click="showPopupTime"
            >{{ currentTime }} <van-icon name="arrow-down"
          /></span>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <BillItem :billList="list" />
        </van-list>
      </van-pull-refresh>
    </div>
    <PopupTime v-model="showTime" @confirm="handleConfirm"></PopupTime>
    <PopupType
      v-model="showType"
      :typeList="typeList"
      @select="handleSelect"
    ></PopupType>
    <!-- 添加在这 -->
    <van-icon name="add" class="add" size="3em" />
  </div>
</template>

<script>
import BillItem from '@/components/BillItem.vue'
import PopupTime from '@/components/PopupTime.vue'
import PopupType from '@/components/PopupType.vue'
import dayjs from 'dayjs'

import { getBillList } from '@/api/bill'
import { getTypeList } from '@/api/type'

export default {
  name: 'Home',
  components: {
    BillItem,
    PopupTime,
    PopupType // Define your components here
  },
  data () {
    return {
      currentTime: dayjs().format('YYYY-MM'),
      type_id: 'all',
      page: 1,
      totalPage: 0,
      totalExpense: 0,
      totalIncome: 0,
      showType: false,
      showTime: false,
      isLoading: false,
      loading: false,
      finished: false,
      list: [],
      typeList: [] // 用于存储类型列表
    }
  },
  computed: {
    // Define your computed properties here
  },
  methods: {
    async onRefresh () {
      try {
        // 1. 模拟/发起异步请求
        this.page = 1
        this.isLoading = true
        this.finished = false
        this.loading = false

        const response = await getBillList(
          this.currentTime,
          this.type_id,
          this.page
        )
        const data = response.data || []
        this.totalPage = data.totalPage || 0
        this.totalExpense = data.totalExpense || 0
        this.totalIncome = data.totalIncome || 0
        console.log(
          '下拉刷新当前页数',
          this.page,
          '总页数:',
          this.totalPage,
          'loading:',
          this.loading,
          'finished:',
          this.finished
        )
        this.list = data.list
        // console.log('判断类型2', this.typeList.filter(item => item.id === this.type_id)[0]?.name || '全部类型')
        // console.log('判断类型2', this.typeList.filter(item => item.id === this.type_id))
      } catch (error) {
        console.error('刷新失败', error)
      } finally {
        // 3. 无论成功或失败，都关闭加载状态
        this.isLoading = false
      }
    },
    async onLoad () {
      console.log(
        '上滑触发当前页:',
        this.page,
        '总页数:',
        this.totalPage,
        'loading:',
        this.loading,
        'finished:',
        this.finished
      )
      if (this.page >= this.totalPage) {
        this.finished = true
        return
      }
      try {
        // 1. 模拟/发起异步请求
        this.loading = true
        this.page += 1
        const response = await getBillList(
          this.currentTime,
          this.type_id,
          this.page
        )
        const data = response.data || []
        if (data.list.length > 0) {
          this.list.push(...data.list)
        } else {
          this.finished = true
        }
      } catch (error) {
        console.error('加载更多失败', error)
      } finally {
        // 3. 无论成功或失败，都关闭加载状态
        this.loading = false
      }
    },
    showPopupTime () {
      this.showTime = !this.showTime
    },
    handleConfirm (date) {
      this.currentTime = this.formatDate(date)
      this.onRefresh()
    },
    handleSelect (index) {
      this.type_id = index
      this.onRefresh()
      // console.log('子组件传递的类型id:', this.type_id)
    },
    formatDate (date) {
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      return `${y}-${m}`
    },
    async showPopupType () {
      this.showType = !this.showType
      const response = await getTypeList()
      this.typeList = response.data.list || []
      // console.log('类型列表', this.typeList)
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
    height: 100vh;
    overflow: hidden;
    overflow-y: auto;
    background-color: #f5f5f5;
    padding: 10px;
  }
  .add {
  position: fixed;
  right: 40px;
  bottom: 100px;
  font-size: 32px;
  color: #1989fa;
  z-index: 999;
}

}
</style>
