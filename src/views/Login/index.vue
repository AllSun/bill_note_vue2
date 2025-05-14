<template>
  <div class="container">
    <div class="tabs">
      <div
        class="tab"
        :class="{ active: activeTab === 'login' }"
        @click="activeTab = 'login'"
      >
        登录
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'register' }"
        @click="activeTab = 'register'"
      >
        注册
      </div>
    </div>

    <div v-if="activeTab === 'login'">
      <div class="form-group">
        <label>账号：</label>
        <input type="text" v-model="loginForm.username" placeholder="请输入账号" />
      </div>
      <div class="form-group">
        <label>密码：</label>
        <input type="password" v-model="loginForm.password" placeholder="请输入密码" />
      </div>
      <button @click="handleLogin">登录</button>
    </div>

    <div v-if="activeTab === 'register'">
      <div class="form-group">
        <label>账号：</label>
        <input type="text" v-model="registerForm.username" placeholder="请输入账号" />
      </div>
      <div class="form-group">
        <label>密码：</label>
        <input type="password" v-model="registerForm.password" placeholder="请输入密码" />
      </div>
      <div class="form-group">
        <label>验证码：</label>
        <input type="text" v-model="registerForm.code" placeholder="请输入验证码" />
      </div>
      <button @click="handleRegister">注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthTabs',
  data () {
    return {
      activeTab: 'login',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        code: ''
      }
    }
  },
  methods: {
    handleLogin () {
      const { username, password } = this.loginForm
      if (!username || !password) {
        alert('请完整填写登录信息！')
        return
      }
      alert(`登录成功！账号：${username}`)
    },
    handleRegister () {
      const { username, password, code } = this.registerForm
      if (!username || !password || !code) {
        alert('请完整填写注册信息！')
        return
      }
      alert(`注册成功！账号：${username}`)
    }
  }
}
</script>

<style lang="less" scoped>
/* 可以添加局部样式 */
.container {
  width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
}

.tab.active {
  background-color: #007bff;
  color: #fff;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  background-color: #ccc;
}

</style>
