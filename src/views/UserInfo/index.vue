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
      <van-button type="info" @click="save">保存</van-button>

    </div>
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
      console.log('上传的文件:', file)
      console.log('file.file', file.file)
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
        url: 'http://127.0.0.1:7009/public/upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: store.getters.token || ''
        }
      }).then((res) => {
        // 返回图片地址
        this.avatar = res.data.avatar
      })
    },
    async save () {
      try {
        const res = await updateUserInfo({
          avatar: this.avatar,
          signature: this.signature
        })
        console.log('保存用户信息成功:', res)
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

<style>
</style>
