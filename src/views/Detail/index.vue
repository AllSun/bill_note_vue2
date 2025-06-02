<template>
  <div>
    <van-nav-bar
      title="账单详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="detail-card">
      <div v-if="bill">
        <p>名称：{{ bill.type_name }}</p>
        <p>金额：¥{{ bill.amount }}</p>
        <p>时间：{{ formatDate }}</p>
        <p>备注：{{ bill.remark || "无备注" }}</p>
      </div>
    </div>
    <div class="button-group">
      <van-button type="warning" block round icon="delete-o" @click="onDelete">删除账单</van-button>
      <van-button type="info" block round icon="edit" @click="onEdit">编辑账单</van-button>
    </div>
    <PopupAdd v-model="showAdd" :bill="bill" ref="popupAddRef" @refresh="fetchBillDetail" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getBillDetail, deleteBill } from '@/api/bill'
import PopupAdd from '@/components/PopupAdd.vue'

export default {
  name: 'Detail',
  components: {
    PopupAdd
  },
  props: ['id'],
  data () {
    return {
      bill: null,
      showAdd: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/home')
    },
    async onDelete () {
      const res = await deleteBill(this.id)
      if (res.code === 200) {
        this.$toast.success('账单删除成功')
        this.$router.push('/home')
      } else {
        this.$toast.fail('账单删除失败')
      }
    },
    onEdit () {
      this.showAdd = true
      this.$refs.popupAddRef.setBill(this.bill) // 手动传入
    },
    async fetchBillDetail () {
      const res = await getBillDetail(this.id)
      if (res.code === 200) {
        this.bill = res.data
      }
    }
  },
  computed: {
    // 获取传入的 id
    formatDate () {
      return dayjs(+this.bill.date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  async mounted () {
    // 根据传入的 id 获取详情
    console.log('detail组件获取id:', this.$route.params.id)

    const res = await getBillDetail(this.id)
    if (res.code === 200) {
      this.bill = res.data
    } else {
      this.$toast.fail('获取账单详情失败')
    }
    console.log('获取账单详情:', res)
  }
}
</script>

<style scoped lang="less">
.detail-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

.detail-card p {
  margin: 8px 0;
}

.detail-card strong {
  font-weight: 600;
  color: #555;
}
.button-group {
  padding: 0 16px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
