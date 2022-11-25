# 构建体积优化：动态Polyfill

| 方案                           | 优点                                     | 缺点                                                         | 是否采用 |
| ------------------------------ | ---------------------------------------- | ------------------------------------------------------------ | -------- |
| babel-polyfill                 | React16官方推荐                          | 1.包体积200K+, 难以单独抽离MAP,Set<br />2.项目里react是单独引用的cdn, 如果要用它，需要单独构建一份放在react前加载 | N        |
| babel-plugin-transform-runtime | 能只polyfill用到的类或方法，相对体积较小 | 不能polyfill原型上的方法，不适用于业务项目的复杂开发环境     | N        |
| 自己写Map, Set的polyfill       | 定制化高，体积小                         | 1.重复造轮子，容易在日后年久失修成为坑<br />2.即使体积小，依然所有用户都要加载 | N        |
| polyfill-service               | 只给用户返回需要的polyfill, 社区维护     | 部分国内奇葩浏览器ua可能无法识别（但可以降级返回所需全部polyfill） | Y        |

## Polyfill Service原理

- 识别不同的user agent, 下发不同的polyfill

## 构建体积优化：如何使用动态Polyfill service

polyfill.io官方提供的服务

```js
<script src="https://cdn/polyfill.io/v2/polyfill.min.js"></script>
```

- 基于官方自建polyfill服务

  ```js
  //huayang.qq.com/polyfill_service/v2/polyfill.min.js?unknown=polyfill&features=Promise,Map,Set
  ```

  

## 体积优化策略总结

- Scope Hoisting
- Tree-shaking
- 公共资源分离
- 图片压缩
- 动态Polyfill