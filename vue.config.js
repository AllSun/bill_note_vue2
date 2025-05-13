const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.chennick.wang/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 将 /api 重写为 ''
        }
      }
    }
  }
})
