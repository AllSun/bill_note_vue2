<template>
  <div class="reset-password-page">
    <van-nav-bar
      title="密码重置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit" class="form-container">
      <van-field
        v-model="oldpassword"
        type="password"
        name="oldpassword"
        label="原密码"
        placeholder="请输入原密码"
        :rules="[{ required: true, message: '请填写原密码' }]"
      />
      <van-field
        v-model="newpassword"
        type="password"
        name="newpassword"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
      />
      <van-field
        v-model="confirmpassword"
        type="password"
        name="confirmpassword"
        label="确认新密码"
        placeholder="再次输入新密码"
        :rules="[{ validator, message: '新密码两次输入不一致' }]"
      />
      <div class="button-container">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { modifyPassword } from '@/api/user'
export default {
  data () {
    return {
      oldpassword: '',
      newpassword: '',
      confirmpassword: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/user')
    },
    validator (value) {
      if (value !== this.newpassword) {
        return false
      }
      return true
    },
    async onSubmit () {
      try {
        const res = await modifyPassword(this.oldpassword, this.newpassword, this.confirmpassword)
        if (res.code === 200) {
          this.$toast.success('密码修改成功')
          this.$router.push('/user')
        } else {
          this.$toast.fail(res.message || '密码修改失败')
        }
      } catch (error) {
        console.error('修改密码失败:', error)
        this.$toast.fail('修改密码失败，请稍后再试')
      }
    }

  }
}
</script>

<style scoped>
.reset-password-page {
  background-color: #f8f8f8;
  min-height: 100vh;
  padding-top: 46px; /* nav-bar 高度预留 */
}

.form-container {
  padding: 20px 16px;
  margin: 16px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.van-field {
  margin-bottom: 12px;
}

.button-container {
  margin-top: 24px;
}

.van-button {
  font-size: 16px;
  height: 44px;
}

.van-nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}
</style>
