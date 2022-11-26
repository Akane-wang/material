# 动手编写一个简易webpack

- 模块化：增强代码可读性和可维护性

  - 传统的网页开发转变成web apps开发
  - 代码复杂度在逐步增高
  - 分离的js文件/ 模块，便于后续代码的维护性
  - 部署时希望把代码优化成几个http请求

- 常见的几种模块化方式

  - ES module

    - 静态引入

    ```js
    import * as largeNumber from 'large-number';
    //...
    largeNumber.add('999', '1');
    ```

    

  - CommonJS

    - 动态引入

      ```js
      const largeNumbers = require('large-number');
      largeNumber.add('999', '1');
      ```

      

  - AMD

    - 借鉴commonJS, 是浏览器端经常用到的规范

      ```js
      require(['large-number'], function(large-number) {
          //...
          largeNumber.add('999', '1');
      });
      ```

- AST基础知识

  - 抽象语法树（abstract syntax tree或缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指变成语言的源代码，树上的每个节点都表示源代码中的一种结构

- 动手实现一个简易的webpack
  - 可以将ES6语法转换成ES5的语法
    - 通过babylon生成AST
    - 通过babel-core将AST重新生成源码
  - 可以分析模块之间的依赖关系
    - 通过babel-tracerse的ImportDeclaration方法获取依赖属性
  - 生成的JS文件可以在浏览器中运行