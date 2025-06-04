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
        <van-cell title="用户信息修改" icon="edit" @click="navToUserInfo" />
        <van-cell title="重置密码" icon="closed-eye" @click="navToAccount" />
        <van-cell title="关于我们" icon="friends-o" @click="navToAbout" />
      </van-cell-group>
    </div>
    <van-button type="danger" @click="logout">退出登录</van-button>
  </div>
</template>

<script>
import { removeInfo } from '@/utils/storage'
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
    },
    logout () {
      removeInfo()
      this.$router.push({ path: '/login' })
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
.userInfo {
  background-color: #f7f8fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #333;
  font-size: 14px;
}

.left span:first-child {
  font-weight: bold;
  font-size: 16px;
}

.left span:last-child {
  color: #888;
  display: flex;
  align-items: center;
  gap: 4px;
}

.right .avatar {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #eee;
}

.content {
  margin: 12px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.van-button {
  margin: 24px 16px;
  border-radius: 24px;
}

</style>
