# 移动端CSS px自动转换成rem
- 浏览器的分辨率一览表

| 型号                   | 尺寸      |
| ---------------------- | --------- |
| iPhone Xs Max          | 414 * 896 |
| iPhone XR              | 414 * 896 |
| iPhone X, Xs           | 375 * 812 |
| iPhone 6+, 6s+, 7+, 8+ | 414 * 736 |
| iPhone 6, 6s, 7,8      | 375 * 667 |
| iPhone 5, 5s, 5c, SE   | 320 * 568 |
| iPhone 4, 4s           | 320 * 480 |

- 页面适配方案
  - css媒体查询实现响应式布局
    - 缺陷：需要写多套适配样式代码
  - rem: font-size of the root element
    - 使用px2rem-loader: 页面渲染时计算根元素的font-size值