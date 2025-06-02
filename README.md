# bill_note_vue2

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

项目踩过的坑

1.eslint-plugin-vue     peerDependencies依赖冲突，降级解决

2.使用viewport适配

3.理解回调函数，函数作为参数给另一个函数，作用就是这个函数执行时，可以拖带形参的回调函数再执行一些事务，而不是单纯的只传一些值给调用函数，代码如下：执行function(config),发出请求前调用，然后做一些config的配置

```javascript
axios.interceptors.request.use(
  function (config) {
    console.log('请求 URL:', config.url);
    console.log('请求方法:', config.method);
    console.log('请求头:', config.headers);

    // 模拟为每个请求添加 Authorization token
    config.headers['Authorization'] = 'Bearer myToken123';

    return config;
  }
);
```

4.项目的初始要先确认页面，然后确认路由，不然毫无头绪

5.this.$route 这个是路由对象，可以获取路径
this.$router 用于编程式导航，嵌套在js中，常用的方法有replace、push、go、back

6.开发环境也没必要配置proxy,直接写死axios的baseURL就好了，暂未定位到为什么vue.config.js配置了无法代理的原因

7.了解axios.post参数，url、data、config，data的格式可以自定义

8.mysql v8版本之后，改了新的加密方式，nodejs连接会报错，安装的时候注意选择使用弱密码方式

9.可优化的功能点，选择2023年8月，修改了其中一个账单，点击返回的时候，home组件还是展示的2023年8月的视图
