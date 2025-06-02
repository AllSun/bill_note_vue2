<template>
  <van-popup
    v-model="internalShow"
    position="bottom"
    closeable
    :style="{ height: '75%' }"
  >
    <div class="addWrap">
      <div class="type">
        <span :class="{ active: payType === 1 }" @click="payType = 1"
          >支出</span
        >
        <span :class="{ active: payType === 2 }" @click="payType = 2"
          >收入</span
        >
        <span class="time" @click="showPopupTime"
          >{{ showDate }} <van-icon name="arrow-down"
        /></span>
      </div>
      <div class="typeName">
        <span
          v-for="(item, index) in typeList.filter(
            (item) => item.type === payType
          )"
          :key="index"
          :class="{ active: item.id === typeId }"
          @click="[typeId, typeName] = [item.id, item.name]"
        >
          {{ item.name }}
        </span>
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
      <van-field
        v-model="remark"
        label="备注"
        placeholder="添加备注"
        clearable
      />
      <van-number-keyboard
        v-model="keyvalue"
        :show="true"
        theme="custom"
        :extra-key="['00', '.']"
        close-button-text="完成"
        @blur="show = false"
        @close="handleFinish"
      />
    </div>
  </van-popup>
</template>

<script>
import PopupTime from './PopupTime.vue'
import { getTypeList } from '@/api/type'
import { addBill, updateBill } from '@/api/bill'
import dayjs from 'dayjs'

export default {
  name: 'PopupAdd',
  components: {
    PopupTime
  },
  data () {
    return {
      currentDate: dayjs().format('YYYY-MM-DD HH:mm:ss'), // 当前时间
      payType: 1, // 默认选中支出
      typeId: '', // 用于存储选中的类型ID
      showTime: false, // 控制时间选择器的显示
      keyvalue: '',
      typeName: '', // 用于存储选中的类型名称
      typeList: [], // 用于存储类型列表
      remark: '' // 用于存储备注信息
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    bill: {
      type: Object,
      default: () => ({})
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
    },
    showDate () {
      return dayjs(this.currentDate).format('MM-DD')
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
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      return `${y}-${m}-${d}`
    },
    async handleFinish () {
      if (this.bill.id) {
        const response = await updateBill({
          id: this.bill.id,
          amount: Number(this.keyvalue).toFixed(2),
          type_id: this.typeId,
          type_name: this.typeName,
          date: dayjs(this.currentDate).unix() * 1000,
          pay_type: this.payType,
          remark: this.remark || ''
        })
        this.internalShow = false
        this.$emit('refresh')
        console.log('更新账单响应:', response)
      } else {
        const response = await addBill({
          amount: Number(this.keyvalue).toFixed(2),
          type_id: this.typeId,
          type_name: this.typeName,
          date: dayjs(this.currentDate).unix() * 1000,
          pay_type: this.payType,
          remark: this.remark || ''
        })
        this.keyvalue = ''
        this.remark = ''
        this.payType = 1
        this.typeId = 1
        this.internalShow = false
        this.$emit('onRefresh')
        console.log('添加账单响应:', response)
      }
    },
    async fetchTypeList () {
      const response = await getTypeList()
      this.typeList = response.data.list || []
      console.log('Type List:', this.typeList)
    },
    setBill (bill) {
      this.keyvalue = bill.amount
      this.typeId = bill.type_id
      this.typeName = bill.type_name
      this.currentDate = dayjs(+this.bill.date).format('YYYY-MM-DD HH:mm:ss')
      this.payType = bill.pay_type
      this.remark = bill.remark || ''
    }
  },
  mounted () {
    this.fetchTypeList()
    console.log('PopupAdd组件获取的账单:', this.bill)
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
  width: 80px;
}
.type span.active {
  background-color: #1989fa; /* 高亮颜色 */
  color: white;
  border-color: #1989fa;
}
.typeName {
  display: flex;
  flex-wrap: nowrap; /* 防止换行 */
  overflow-x: auto; /* 超出屏幕时显示横向滚动条 */
  padding-bottom: 10px; /* 防止滚动条挡住内容 */
}
.typeName span {
  flex-shrink: 0; /* 不允许被压缩 */
  white-space: nowrap; /* 不换行 */
  display: inline-block;
  height: 30px;
  width: 50px;
  text-align: center;
  line-height: 30px;
  margin: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.typeName span.active {
  background-color: #1989fa; /* 高亮颜色 */
  color: white;
  border-color: #1989fa;
}
</style>
