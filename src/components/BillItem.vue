<template>
  <div>
    <div class="item">
      <div class="headerDate">
        <div class="date">2025-5-21</div>
        <div class="money">
          <span>
            <img src="//yezgea02.com/1615953405599/zhi%402x.png" alt="支" />
            <span>¥14.23</span>
          </span>
          <span>
            <img src="//yezgea02.com/1615953405599/shou%402x.png" alt="收" />
            <span>¥12.3</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { typeMap } from '@/utils/index.js'
export default {
  name: 'BillItem',
  data () {
    return {
      income: 0,
      expense: 0
    }
  }
}
</script>

<style scoped lang="less">
.item {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  .headerDate {
    height: 40px;
    display: flex;
    background-color: #f9f9f9;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    div {
      color: rgba(0, 0, 0, 0.9);
    }
    .date {
      font-weight: bold;
      font-size: 16px;
    }
    .money {
      > span {
        margin-left: 20px;
        img {
          width: 20px;
          margin-right: 4px;
          vertical-align: -4px
        }
      }
    }
  }
  :global {
    .za-cell {
      &::after {
        left: 0;
      }
      .za-cell__title {
        display: flex;
        align-items: center;
      }
    }
  }
  .item-icon {
    font-size: 24px;
    color: #007fff;
    vertical-align: -2px;
    margin-right: 2px;
  }
}
</style>
