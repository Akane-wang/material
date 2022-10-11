# ecmascript和JavaScript的关系

# Es6与ECMAScript2015的关系

# 语法提案的批准流程

# ECMAScript的历史

- Node.js是JavaScript的服务器运行环境，它对ES6的支持度更高，除了那些默认打开的功能，还有一些语法已经实现但是默认没有打开。
- 查看Node.js默认没有打开的ES6实验性语法
  - node --v8-options | findstr harmony

# Bable转码器

- 将ES6的代码转为ES5的代码，从而在老版本的浏览器执行
- 安装babel
  - npm install --save-dev @babel/core

## 配置文件 .babelrc

- babel的配置文件是.babelrc,存放在项目的根目录下，使用babel的第一步，就是配置这个文件
- 该文件用于设置转码规则和插件
  ```js
  {
      "presets":[], // 设定转码规则，官方提供规则集，安装方法： npm install --save-dev @babel/preset-env
      "plugins":[] 
  }
  ```
-  "presets":设定转码规则，官方提供规则集.
  - 安装方法:
    - 最新转码规则
      - npm install --save-dev @babel/preset-env
    - react 转码规则
      - npm install --save-dev @babel/preset-react
  - 然后将这些规则加入.babelrc
    ```js
        {
            "presets":[
                "@babel/env",
                "@babel/preset-react"
            ],
            "plugins":[] 
        }
    ```

## 命令行转码

- babel提供命令行工具@babel/cli，用于命令行转码
  - 安装命令
    - `npm install --save-dev @babel/cli`
  - 基本用法
    - 转码结果输出到标准输出
      - npx babel example.js
    - 转码结果写入一个文件
      - --out-file 或 -o参数指定输出文件
      - npx babel example.js -o compiled.js或者npx babel example.js -o compiled.js
    - 整个目录转码
      - --out-dir 或 -d 参数指定输出目录
      - npx babel src --out-dir lib 或者npx babel src -d lib
    - -s 参数生成source map文件
      - npx babel src -d lib -s

## babel-node

- @babel/node模块的babel-node命令，提供一个支持es6的REPL环境，支持Node的REPL环境的所有功能，可以直接运行ES6代码
- 安装模块
  - `npm install --save-dev @babel/node`
- 执行babel-node就进入REPL环境
  - npx babel-node
  - `> (x=>x*2)(1)` => `2`

## @babel/register模块

- 改写require命令，为它加上一个钩子，每当使用require加载.js,.jsx,.es,.es6后缀名的文件，就会先用babel转码
- @babel/register只会对require命令加载的文件转码，而不会对当前文件转码，由于是实时转码，所以只适合在开发环境使用

## polyfill

- 默认只转换新的JavaScript句法（syntax），不转换新的API
- 安装命令
  - `npm install --save-dev core-js regenerator-runtime`
  - 然后再脚本头部，加入如下两行代码
    ```js
    import 'core-js';
    import 'regenerator-runtime/runtime';
    //或者
    require('core-js');
    require('regenerator-runtime/runtime');
    ```
## 浏览器环境
- babel可用于浏览器环境，使用@babel/standalone模块提供的浏览器脚本，将其插入网页
- 网页实时将es6转码为es5，对性能会有影响，生产环境需要加载已经转码完成的脚本
- babel提供一个REPL在线编译器，可以在线将ES6代码转为ES5代码，转换后的代码，可以直接作为es5代码插入网页运行