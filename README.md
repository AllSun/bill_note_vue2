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
