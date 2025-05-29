<template>
  <van-popup
    v-model="internalTypeShow"
    position="bottom"
    closeable
    :style="{ height: '60%' }"
  >
    <div class="header">请选择类型</div>
    <van-button class="my-button" type="default" @click="handleSelect('all')">全部类型</van-button>
    <div class="expense" style="margin-left:20px">支出:</div>
    <div class="expenseType">
      <!-- {{ typeList}} -->
      <van-button
        type="default"
        class="my-button"
        :class="{ 'selected': selectedIndex === typeObj.id }"
        v-for="(typeObj,index) in typeList.filter((item) => item.type === 1)"
        :key="index"
        @click="handleSelect(typeObj.id)"
        >{{ typeObj.name }}</van-button
      >
    </div>
    <div class="income" style="margin-left:20px">收入:</div>
    <div class="incomeType">
      <van-button
        type="default"
        class="my-button"
        :class="{ 'selected': selectedIndex === typeObj.id }"
        v-for="(typeObj, index) in typeList.filter((item) => item.type === 2)"
        :key="index"
        @click="handleSelect(typeObj.id)"
        >{{ typeObj.name }}</van-button
      >
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'PopupType',
  data () {
    return {
      selectedIndex: null
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    typeList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    internalTypeShow: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val) // 通知父组件修改
      }
    }
  },
  methods: {
    handleSelect (index) {
      this.selectedIndex = index
      this.$emit('select', this.selectedIndex) // 把 'all' 或具体 id 传给父组件
      this.internalTypeShow = false
    }
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
.my-button{
  display: inline-block;
  margin: 8px;
  width: 100px;
  height: 40px;
}
.selected {
  background-color: #1989fa !important; /* Vant 蓝色 */
  color: white !important;
  border-color: #1989fa !important;
}
</style>
