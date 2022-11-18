# 使用sourcemap

- 作用：通过source map定位到源代码

- 开发环境开启，线上环境关闭

  - 线上排查问题时，可以将sourcemap上传到错误监控系统

- source-map关键字

  | key        | 释义                                       |
  | ---------- | ------------------------------------------ |
  | eval       | 使用eval包裹模块代码                       |
  | source map | 产生.map文件                               |
  | cheap      | 不包含列信息                               |
  | inline     | 将.map作为DataURI嵌入，不单独生成..map文件 |
  | module     | 包含loader的sourcemap                      |

- 常用sourcemap类型

  | devtool                        | 首次构建 | 二次构建 | 是否适合生产环境 | 可以定位的代码                     |
  | ------------------------------ | -------- | -------- | ---------------- | ---------------------------------- |
  | （none)                        | +++      | +++      | y                | 最终输出的代码                     |
  | eval                           | +++      | +++      | n                | webpack生成的代码（一个个的模块）  |
  | cheap-eval-source-map          | +        | ++       | n                | 经过loader转换后的代码(只能看到行) |
  | cheap-source-map               | +        | o        | y                | 经过loader转换后的代码(只能看到行) |
  | inline-cheap-source-map        | +        | o        | y                | 经过loader转换后的代码(只能看到行) |
  | cheap-module-eval-source-map   | o        | ++       | n                | 源代码（只能看到行）               |
  | cheap-module-source-map        | +        | o        | y                | 源代码（只能看到行）               |
  | inline-cheap-module-source-map | +        | o        | n                | 源代码（只能看到行）               |
  | eval-source-map                | --       | +        | n                | 源代码                             |
  | source-map                     | --       | --       | y                | 源代码                             |
  | hidden-source-map              | --       | --       | y                | 源代码                             |
  | inline-source-map              | --       | --       | n                | 源代码                             |

  