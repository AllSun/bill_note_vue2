const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0', // 🔑 允许局域网访问
    port: 8080,
    proxy: {
      // 代理以 /api 开头的请求
      '/api': {
        target: 'http://192.168.1.4:7009', // 比如 http://localhost:3000 或 http://api.xxx.com
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 如果后端不需要 /api 前缀，就去掉它
        }
      }
    }
  }
})
