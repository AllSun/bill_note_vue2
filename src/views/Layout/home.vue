<template>
  <div class="home">
    <div class="header">
      <div class="dataWrap">
        <span class="expense">总支出：<b>¥ 200</b></span>
        <span class="income">总收入：<b>¥ 500</b></span>
      </div>
      <div class="typeWrap">
        <div class="left">
          <span class="title"
            >类型 <Icon class="arrow" type="arrow-bottom"
          /></span>
        </div>
        <div class="right">
          <span class="time"
            >2022-06<Icon class="arrow" type="arrow-bottom"
          /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
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
    .data-wrap {
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
    .type-wrap {
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
}
</style>
