# Scope Hoisting使用和原理分析

- webpack4打包bundles的现有问题：
  - 大量函数闭包包裹代码，导致体积增大（模块越多越明显）
  - 运行代码时创建的函数作用域变多，内存开销变大
- 模块转换分析
  - 被webpack转换后的模块会带上一层包裹
  - import会被转换成`__webpack_require`

- 进一步分析webpack的模块机制
  - 打包出来的是一个IIFE(匿名闭包)
  - modules是一共数组，每一项是一共模块初始化函数
  - __webpack_require用来加载模块，返回module.exports
  - 通过WEBPACK_REQUIRE_METHOD(0)启动程序



## scope hoisting原理

- 原理： 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
- 对比：通过scope hoisting可以减少函数声明代码和内存开销
- 开启：
  - 设置mode: production则可默认开启scope hoisting