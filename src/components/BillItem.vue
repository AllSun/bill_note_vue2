<template>
  <div>
    <div v-for="(group, index) in billList" :key="index">
      <!-- 展示日期 + 统计信息 -->
      <div style="padding: 10px; font-weight: bold;">
        {{ group.date }} - 支出：{{ getTotal(group.bills, 1) }} 元，收入：{{ getTotal(group.bills, 2) }} 元
      </div>

      <!-- 展示账单明细 -->
      <van-cell-group>
        <van-cell
          v-for="bill in group.bills"
          :key="bill.id"
          :title="bill.type_name"
          :label="bill.remark || '无备注'"
          :value="(bill.pay_type === 1 ? '-' : '+') + bill.amount + ' 元'"
          :class="{ 'expense': bill.pay_type === 1, 'income': bill.pay_type === 2 }"
          is-link
          @click="$emit('item-click', bill)"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BillItem',
  data () {
    return {
      income: 0,
      expense: 0
    }
  },
  props: {
    billList: { type: Array }
  },
  methods: {
    getTotal (bills, type) {
      // type: 1 为支出，2 为收入
      return bills
        .filter((bill) => bill.pay_type === type)
        .reduce((sum, bill) => sum + parseFloat(bill.amount), 0)
        .toFixed(2)
    }
  }
}
</script>

<style scoped lang="less">
.expense {
  color: red;
}
.income {
  color: green;
}
</style>
