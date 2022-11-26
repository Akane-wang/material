# webpack流程篇

## webpack流程篇——准备阶段

- webpack的编译都按照下面的钩子调用顺序执行

  ![how-webpack-run](D:\personal\material\personal-note\webpack\mdnotes\images\how-webpack-run.jpg)

- webpackOptionsApply
  - 将所有的配置options参数转换成webpack内部插件
  - 使用默认插件列表
    - 举例：
      - output.library ——> LibraryTemplatePlugin
      - externals——>ExternalsPlugin
      - devtool——>EvalDevtoolModulePlugin, SourceMapDevToolPlugin
      - AMDPlugin, CommonJsPlugin
      - RemoveEmptyChunksPlugin

## webpack流程篇：模块构建和chunk生成阶段

- Compiler hooks

  - 流程相关
    - .(before-)run
    - (before-/after-)compile
    - make
    - (after-)emit
    - done
  - 监听相关
    - watch-run
    - watch-close

- Compilation

  - Compiler调用Complilation生命周期方法
    - addEntry -> addModuleChain
    - finish(上报模块错误)
    - seal

- ModuleFactory

  ![module-factory](D:\personal\material\personal-note\webpack\mdnotes\images\module-factory.jpg)

- Module

  ![module](D:\personal\material\personal-note\webpack\mdnotes\images\module.jpg)

  - NormalModule
    - Build
      - 使用loader-runner 运行loaders
      - 通过Parser解析（内部是acron）
      - ParserPlugins添加依赖

- Compilation Hooks

  - 模块相关
    - build-module
    - failed-module
    - succeed-module
  - 资源生成相关
    - module-asset
    - chunk-asset
  - 优化和seal相关
    - (after-)seal
    - optimize-modules(-basic/advanced)
    - after-optimize-modules
    - after-optimize-chunks
    - after-optimize-tree
    - optimize-chunk-modules(-basic/advanced)
    - after-optimize-chunk-modules
    - optimize-module/chunk-order
    - before-module/chunk-ids
    - (after-)optimize-module/chunk-ids
    - before/after-hash

- Chunk生成算法

  - webpack先将entry中对应的module都生成一个新的chunk
  - 遍历module的依赖列表，将依赖的module也加入到chunk中
  - 如果一个依赖module是动态引入的模块，那么就会根据这个module创建一个新的chunk, 继续遍历依赖
  - 重复上面的过程，直到得到所有的chunks

## webpack流程篇：文件生成

