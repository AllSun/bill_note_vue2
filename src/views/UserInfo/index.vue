<template>
  <div class="userinfo">
    <van-nav-bar
      title="用户信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <p>个人资料</p>
      <div class="avatar">
        <p>头像</p>
        <img
          :src="avatar"
          alt=""
          style="width: 60px; height: 60px; border-radius: 8px"
        />
        <div class="desc">
          <span>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</span>
        </div>
        <span>头像上传</span>
        <van-uploader v-model="uploader" :after-read="afterRead" />
      </div>
      <div class="signature">
        <van-cell-group>
          <van-field
            v-model="signature"
            label="个性签名"
            placeholder="请输入个性签名"
          />
        </van-cell-group>
      </div>
    </div>
    <van-button type="info" @click="save">保存</van-button>
  </div>
</template>

<script>
import store from '@/store'
import { getUserInfo, updateUserInfo } from '@/api/user'
import axios from 'axios'
export default {
  data () {
    return {
      user: {},
      avatar: '',
      signature: '',
      uploader: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/user')
    },
    async getUserInfo () {
      try {
        const res = await getUserInfo()
        this.userInfo = res.data
        this.avatar = res.data.avatar || ''
        this.signature = res.data.signature || ''
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    },
    afterRead (file) {
      // 处理文件上传逻辑
      console.log('上传的文件', file.file)
      if (file && file.file.size > 200 * 1024) {
        this.$toast('上传头像不得超过 200 KB！！')
        return
      }
      const formData = new FormData()
      // 生成 form-data 数据类型
      formData.append('file', file.file)
      // 通过 axios 设置  'Content-Type': 'multipart/form-data', 进行文件上传
      axios({
        method: 'post',
        url: 'http://127.0.0.1:7009/api/upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: store.getters.token || ''
        }
      }).then((res) => {
        // 返回图片地址
        console.log('打印res对象', res)
        if (res.data.data && res.data.data.startsWith('http')) {
          this.avatar = res.data.data
        } else {
          const url = 'http://localhost:7009' + res.data.data
          this.avatar = url
        }
      })
    },
    async save () {
      try {
        console.log('准备保存用户信息:', this.signature, this.avatar)
        const res = await updateUserInfo(this.signature, this.avatar)
        if (res.code === 200) {
          this.$toast('保存用户信息成功')
        }
      } catch (error) {
        console.error('保存用户信息失败:', error)
      }
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
.userinfo {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 16px;

  .content {
    background-color: #fff;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-top: 12px;

    p {
      font-weight: bold;
      margin-bottom: 12px;
      font-size: 16px;
      color: #333;
    }

    .avatar {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;

      p {
        margin: 0 0 8px 0;
        font-size: 14px;
      }

      img {
        margin-bottom: 8px;
        border: 1px solid #eee;
      }

      .desc {
        font-size: 12px;
        color: #999;
        margin-bottom: 8px;
      }

      span {
        font-size: 14px;
        margin-bottom: 8px;
        color: #666;
      }

      ::v-deep(.van-uploader) {
        margin-top: 4px;
      }
    }

    .signature {
      margin-top: 10px;

      ::v-deep(.van-cell-group) {
        background-color: transparent;
      }

      ::v-deep(.van-field__control) {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .van-button {
    margin: 20px auto;
    width: 90%;
    border-radius: 24px;
  }
}
</style>
