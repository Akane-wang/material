# webpack启动过程分析

- 开始：从webpack命令行说起

  - 通过npm scripts 运行webpack
    - 开发环境：npm run dev
    - 生产环境：npm run build
  - 通过webpack直接运行
    - webpack entry.js bundle.js

- 查找webpack入口文件

  - 在命令行运行以上命令后，npm会让命令工具进入node_modules/.bin目录查找是否存在webpack.sh或者webpack.cmd文件，如果存在就执行，如果不存在就抛出错误
  - 实际入口文件是：node_modules/webpack/bin/webpack.js

- 分析webpack的入口文件：webpack.js

  ```js
  process.exitCode = 0; // 正常执行返回
  const runCommand = (command, args) => {...}; // 运行某个命令
  const isInstalled = packageName => {...}; // 判断某个包是否安装
  const CLIs = [...]; // webpack可用的CLI: webpack-cli和webpack-command
  const installedClis = CLIs.filter(cli => cli.installed); // 判断是否两个CLI是否安装了
  if(installedClis.length === 0){...}else if (installedClis.length === 1) {...} else {...} // 根据安装数量进行处理
  ```

- 启动后的结果

  - webpack最终找到webpack-cli(webpack-command)这个npm 包，并且执行CLI