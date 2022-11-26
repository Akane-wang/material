# webpack-cli源码阅读

- webpack-cli做的事情

  - 引入yargs, 对命令进行定制
  - 分析命令行参数，对各个参数进行转换，组成编译配置项
  - 引用webpack, 根据配置项进行编译和构建

- 从NON_COMPILATION_CMD分析出不需要编译的命令

  - webpack-cli处理不需要经过编译的命令

    ```js
    const {NON_COMPILATION_ARGS} = require("./utils/constants");
    const NON_COMPILATION_CMD = process.argv.find(arg => {
        if(arg === 'serve') {
           		global.process.argv = global.process.argv.filter(a => a!== 'serve');
        		process.argv = global.process.argv;
        }
        return NON_COMPILATION_ARGS.find(a => a === arg);
    });
    if(NON_COMPILATION_CMD) {
        return require("./utils/prompt-command")(NON_COMPILATION_CMD, ...process.argv);
    }
    ```

- NON_COMPILATION_ARGS的内容

  - webpack-cli提供的不需要编译的命令

    ```js
    const NON_COMPILATION_ARGS = [
        "init", // 创建一份webpack配置文件
        "migrate", // 进行webpack版本迁移
        "add", // 往webpack配置文件中增加属性
        "remove",// 往webpack配置文件中删除属性
        "serve", // 运行webpack-serve
        "generate-loader", // 生成webpack loader代码
        "generate-plugin", // 生成webpack plugin代码
        "info" // 返回与本地环境相关的一些信息
    ]
    ```

- webpack-cli使用args分析

  - 参数分组（config/config-args.js)将命令划分为9类
    - Config options: 配置相关参数（文件名称，运行环境等）
    - Basic options: 基础参数（entry设置，debug模式设置，watch监听设置，devtool设置）
    - Module options: 模块参数，给loader设置扩展
    - Output options: 输出参数（输出路径，输出文件名称）
    - Advanced options: 高级用法（记录设置，缓存设置，监听频率，bail等）
    - Resolving options: 解析参数（alias和解析的文件后缀设置）
    - Optimizing options: 优化参数
    - Stats options: 统计参数
    - options: 通用参数（帮助命令，版本信息等）

- webpack-cli执行的结果

  - webpack-cli对配置文件和命令行参数进行转换最终生成配置选项参数options
  - 最终会根据配置参数实例化webpack对象，然后执行构建流程