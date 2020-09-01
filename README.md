# SuperMall

* 仿蘑菇街商城Vue项目

## 演示地址

[mall.juanertu.com](http://mall.juanertu.com)

## 项目简介

使用vue框架开发的一个手机端商城项目demo，拥有首页，分类，商品详情，购物车，个人五个页面。后台接口开发，已经单独放置到另外一个项目。

### 主要实现功能

- [x] 导航栏吸顶效果
- [x] 高亮显示选中导航
- [x] 根据导航动态展示不同商品
- [x] 添加商品到购物车
- [x] 监听跳转顶部按钮
- [x] 懒加载
- [x] 无限下拉方案
- [ ] 登录注册
- [ ] 支付
- [ ] 其他

## 接口开发

项目地址：[mallAPI : superMall商城数据接口开发](https://github.com/constown/mallAPI)

## 项目部署

- 克隆本项目代码：

```
git clone https://github.com/constown/supermall.git
```

- 安装项目依赖

```
npm install
```


- 修改`src/network/request.js` 文件中的数据接口baseURL

```
  const instance = axios.create({
    baseURL: "修改为你的数据接口",
    timeout: 5000
  })
```

- 本地预览

```
npm run serve
```

- 打包文件

```
npm run build
```

- 关于部署在服务器后刷新404问题

我采用了 `history` 路由模式，会导致刷新出现404的问题，你可以参考 [这篇文章](https://blog.juanertu.com/archives/15049ec0.html) 。 

## 致谢：

* coderwhy提供项目。

