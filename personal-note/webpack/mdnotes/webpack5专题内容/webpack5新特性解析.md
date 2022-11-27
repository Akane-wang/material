# webpack5新特性解析

- node.js必须是10以上才能使用webpack5

- 功能清除：清理启用的能力

  - 所有在webpack里被废弃的能力都被清除，因此需要确保webpack4没有打印警告
  - require.includes语法已经被废弃
    - 作用：加载一个模块，但是不马上执行，实现模块预加载，防止重复加载
    - 可以通过Rule.parser.requireIncludes将行为改为允许，废弃或禁用

- 功能清除：不再为Node.js模块引入polyfill

  - 之前的版本是：如果某个模块依赖Node.js里的核心模块，那么这个模块被引入的时候回把node.js整个polyfill顺带引入

- 长期缓存：确定的模块Id，chunk和导出名称

  - 在生产模式下，默认的chunkIds: “dedterministic", moduleIds: "determinnistic", 设置成deterministic时默认最小3位数字会被使用

    ![chunkIds-moduleIds](D:\personal\material\personal-note\webpack\mdnotes\images\chunkIds-moduleIds.jpg)

- 持久化缓存
  - 在webpack4里面，可以使用cache-loader将编译结果写入硬盘缓存，还可以使用babel-loader,设置option.cacheDirectory将babel-loader编译的结果写进磁盘
  - webpack5缓存策略
    - 默认开启缓存，缓存默认在内存里。可以对cache进行设置
    - 缓存淘汰策略：文件缓存存储在node_modules/.cache/webpack，最大500MB，缓存时常两星期，旧的缓存先淘汰
- 构建优化：tree shaking优化-嵌套的tree shaking
- 代码生成：支持生成ES6代码
  - webpack4之前只生成es5的代码，webpack5则现在既可以生成es5又可以生成es6/es2015代码
  - 两种设置方式：5<=ecmaVersion <= 11 或 2009 =< ecmaVersion <= 2020

 - 开创性的特性：模块联邦
   - 发明者： zack jackson
   - 基本解释：使一个JavaScript应用在运行过程中可以动态加载另一个应用的代码，并支持共享依赖（CDN），不再需要本地安装npm包
     - remote: 被依赖方，被host消费的webpack构建
     - host: 依赖方，消费其他remote的webpack构建
     - *注：一个应用可以是host, 也可以是remote, 也可以既是host也是remote*
 - 开创性的特性：ModuleFederationPlugin介绍
   - webpack内部通过ModuleFederationPlugin插件将多个应用结合起来
     - name: 必须，唯一id, 作为输出的模块名，使用时通过${name}/${expose}方式使用
     - library:必须，其中这里的name为作为umd的name;
     - remotes: 可选，表示作为Host时，去消费哪些remote;
     - shared: 可选，优先用host的依赖，如果host没有，再用自己的；
     - main.js: 应用主文件
     - remoteEntry.js: 作为remote时被引用的文件