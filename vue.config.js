// vue.config.js
module.exports = {
  devServer: {
    port: 8080, // 前端开发服务器端口
    proxy: {
      '/api': {
        target: 'www.baidu.com', // 后端 API 服务器地址
        changeOrigin: true, // 是否更改请求头中的 Host
        ws: true
      }
    }
  }
}
