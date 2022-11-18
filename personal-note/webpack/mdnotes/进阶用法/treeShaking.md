# 摇树优化

- 概念：一个模块可能有多个方法，只要其中的某个方法使用到了，则整个文件都会被打包到bundle里面去，tree shaking就是只把用到的方法打入bundle, 没用到的方法会在uglify阶段被擦除。
- 使用：webpack默认支持，在.babelrc里设置modules: false即可
  - `mode: production`的情况下默认开启
  - 要求：
  
    - 必须是ES6语法，CJS的方式不支持
    - 引用的方法是不能有副作用的
  
    ```js
    // 有任意方法（a, b）于某文件(tree-shaking.js)下：
    export function a() {
        return 'this is a';
    }
    
    export function b() {
        return 'this is b';
    }
    // 在index.js内引入该方法但是不使用
    import { a } from './tree-shaking'; // 此时mode: production；打包出来的内容是没有a和b方法的内容的
    
    // 在index.js内使用a方法，mode: production；
    const textA = a(); // 结论是： a 和 b都被打包到页面了。
    
    ```
  
    - 如何能引用一个就打包一个进入，其他的摇掉呢？？？
- DCE（Elimination）
  - 代码不会被执行，不可到达
  - 代码执行的结果不会被用到
  - 代码只会影响死变量（只写不读）

## Tree-shaking原理

- 利用ES6模块的特点
  - import的模块名只能是字符串常量
  - import binding是immutable的
- 代码擦除：uglify阶段删除无用代码