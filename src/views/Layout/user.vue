<template>
  <div class="userInfo">
    <div class="head">
      <div class="left">
        <span>昵称：{{ userInfo.username }}</span>
        <span
          ><van-icon name="smile-comment-o" />{{
            userInfo.signature || "暂无个签"
          }}</span
        >
      </div>
      <div class="right">
        <img
          class="avatar"
          style="width: 60px; height: 60px; border-radius: 8px"
          :src="userInfo.avatar || ''"
          alt=""
        />
      </div>
    </div>
    <div class="content">
      <van-cell-group inset>
        <van-cell title="用户信息修改" icon="edit" @click="navToUserInfo"/>
        <van-cell title="重置密码" icon="closed-eye" @click="navToAccount"/>
        <van-cell title="关于我们" icon="friends-o" @click="navToAbout"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async getUserInfo () {
      try {
        const res = await getUserInfo()
        this.userInfo = res.data
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    },
    navToUserInfo () {
      this.$router.push('/UserInfo')
    },
    navToAccount () {
      this.$router.push('/Account')
    },
    navToAbout () {
      this.$router.push('/About')
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
.userInfo {
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", sans-serif;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.left span {
  font-size: 15px;
  color: #333;
}

.left span:first-child {
  font-weight: bold;
}

.right .avatar {
  width: 60px;
}
.content {
  padding: 16px;
  background-color: #f5f7fa;
  min-height: 10vh;
  box-sizing: border-box;
}

.van-cell-group--inset {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
}

</style>
