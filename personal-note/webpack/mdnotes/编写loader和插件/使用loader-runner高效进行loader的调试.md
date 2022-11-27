# 使用loader-runner高效进行loader的调试

- loader-runner介绍

  - 定义：loader-runner允许你在不安装webpack的情况下运行loaders
  - 作用
    - 作为webpack的依赖，webpack中使用它执行loader
    - 进行loader的开发和调试

- loader-runner的使用

  ```js
  import { runLoaders } from 'loader-runner';
  runLoaders({
      resource: "/abs/path/to/file.txt?query", // String： 资源的绝对路径（可以增加查询字符串）
      loaders: ["/abs/path/to/loader.js?query"], // String[]: loader的绝对路径（可以增加查询字符串）
      context: { // 基础上下文之外的额外loader上下文
          minimize: true
      },
      readRecource: fs.readFile.bind(fs) // 读取资源的函数
  }, function(err, result) {
      //err: Error?
      // result.result: Buffer |String
  })
  ```

- 开发一个row-loader(功能：将一个文件转换为一个string)

  ```js
  //src/raw-loader.js
  module.exports = function(source) {
      const json = JSON.stringify(source)
      .replace(/\u2028/g, '\\u2028') // 为了安全起见，ES6模板字符串的问题（存在一定的安全问题，所以做一定的安全处理）
      .replace(/\u2029/g, '\\u2029');
      
      return `export default ${json}`;
  };
  
  //src/demo.txt
  footbar
  ```

- 使用loader-runner调试loader

  ```js
  //run-loader.js
  const fs = require('fs');
  const fs = require('fs');
  const path = require('path');
  const { runLoaders } = require('loader-runner');
  runLoaders(
      {
          resource: path.join(__dirname, '../src/demo.txt'), // 资源绝对路径
          loaders: [path.resolve(__dirname, './raw-loader.js')],
          context: {
              minimize: true
          },
          readResource: fs.readFile.bind(fs),
      },
      (err, result) => {
          err ? console.log(err) : console.log(result)
      }
  )
  ```

  