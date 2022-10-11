# let 命令

## 基本用法

- 循环体内部有自己的作用域

## 不存在变量提升

- `var`命令会发生`变量提升`的现象，即变量可以在声明之前使用，值为`undefined`
- `let`命令改变这种语法行为，所声明的变量一定要在声明后使用，否则报错

## 暂时性死区

- 本质：只要一进入当前作用域，索要使用的变量就已经存在了，但是不可获取，只有等到声明变量的哪一行代码出现，才可以获取和使用该变量
- ES6明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量从一开始就形成了封闭作用域，凡是在声明之前就使用这些变量就会报错。
  - 在代码块内，使用let命令声明变量之前，该变量都是不可用的，这在语法上，称为`暂时性死区（简称TDZ）`
  - ES6规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前使用该变量，导致意料之外的行为。
  - 只要块级作用域内存在let命令，它所声明的变量就绑定这个区域，不再受外部影响

    ```js
    var tmp = 123;

    if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp;
    }
    ```
    ```js
    if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
    }
    ```
- 在let命令声明变量之前，都属于变量的暂时性死区
- 暂时性死区也意味着typeof不再是一个百分之百安全的操作
    ```js
    typeof x;// ReferenceError
    let x;
    ```

## 不允许重复声明

- `let`不允许在相同作用域内，重复声明同一个变量
  - 因此，不能在函数内部重新声明参数

# 块级作用域

## 为什么需要块级作用域

### 在ES5中，会出现以下问题

- 内层变量覆盖外层变量
  - 变量提升导致的
    ```js
    var tmp = new Date();

    function f() {
    console.log(tmp); // undefined
    if (false) {
        var tmp = 'hello world';
    }
    }

    f(); // undefined
    ```
- 用来计数的循环变量泄漏为全局变量
    ```js
     var s = 'hello';

    for (var i = 0; i < s.length; i++) {
    console.log(s[i]);
    }

    console.log(i); // 5
    ```

## es6的块级作用域

- `let`为JavaScript新增了块级作用域
  - 外层代码块不受内层代码块影响
  - 允许块级作用域的任意嵌套
    - 内层作用域可以定义外层作用域的同名变量
  - 块级作用域的出现，使得获得广泛应用的匿名立即执行函数表达式（匿名IIFE）不再必要
    ```js
    <!-- IIFE 写法 -->
    (function(){
        var tmp = ...;
        ...
    }());
    <!-- 块级作用域写法 -->
    {
        let tmp = ...;
        ...
    }
    ```

## 块级作用域与函数声明

- ES5规定，函数只能在顶层作用域和函数作用域中声明，不能在块级作用域声明
  - 以下两种情况是违法的：（但浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域中声明函数，因此上面两种情况实际都能运行，不会报错）
  ```js
  // 情况一
    if (true) {
    function f() {}
    }

    // 情况二
    try {
    function f() {}
    } catch(e) {
    // ...
    }

  ```
- ES6引入了块级作用域，明确允许在块级作用域之中声明函数，ES6规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用
- ES6（以下三条规则只对ES6的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当做let处理）：
  - 允许在块级作用域内声明函数
  - 函数声明类似于`var`,即会提升到全局作用域或函数作用域的头部
  - 同时，函数声明还会提升到所在的块级作用域的头部
- 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数，如果确实需要，应该写成函数表达式，而非声明语句
- ES6的块级作用域必须有大括号，否则不认为存在块级作用域
- 函数声明在严格模式下，只能声明在当前作用域的顶层

# const命令

## 基本用法

- `const`声明的变量必须立即初始化，不能留到以后赋值。对于`const`来说，只声明不赋值就会报错。
- const的作用域和let命令相同，只在声明所在的块级作用域内有效
- const声明的常量不存在提升，存在暂时性死区，只能在声明的位置后面使用

## 本质
- const本质保证的是变量指向的那个存储地址所保存的数据不得改动，对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。对于复合类型的数据（对象和数组等），变量指向的是内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的，即总是指向另一个固定的地址，至于它指向的数据结构是不是可变的，就完全不能控制。
- 如果真的想将对象冻结，应该使用Object.freeze方法
  ```js
  <!-- 彻底冻结对象的函数 -->
    var constantize = (obj) => {
        Object.freeze(obj);
        Object.keys(obj).forEach( (key, i) => {
            if ( typeof obj[key] === 'object' ) {
            constantize( obj[key] );
            }
        });
    };
  ```

## ES6声明变量的六种方法

- ES5：var、function
- ES6： let、const、import、class、var、function

# 顶级对象的属性

- 顶层对象：
  - 浏览器： window对象
  - Node: global对象
- ES5中顶层对象的属性与全局变量是等价的
- 顶层对象的属性与全局变量挂钩，这样的设计带来了几个很大的问题：
  - 没法在编译时就报出变量未声明的错误，只有运行时才知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）
  - coder很容易就创建全局变量（打字出错）
  - 顶层对象的属性是到处可读写的，非常不利于模块化编程
  - window对象有实体含义，指的是浏览器的窗口对象；顶层对象时一个有实体含义的对象，是不合适的
- ES6中为了改变这一点，为了保持兼容性：
  - var 命令和function命令声明的全局变量，依旧是顶层对象的属性
  - let、const、class声明的全局变量，不属于顶层对象的属性
  ```js
    var a = 1;
    // 如果在 Node 的 REPL 环境，可以写成 global.a
    // 或者采用通用方法，写成 this.a
    window.a // 1

    let b = 1;
    window.b // undefined
  ```

# globalThis对象

- JavaScript语言存在一个顶层对象，提供全局环境（全局作用域），所有代码都是在这个环境中运行，但是顶层对象在各种实现里面是不统一的。
  - 浏览器：顶层对象时window，但是Node和Web Worker没有window
  - 浏览器和WebWorker里，self也指向顶层对象，但是Node没有self
  - Node里面，顶层对象时global，但是其他环境都不支持
- 同一段代码为了能够在各种环境都能取到顶层对象，现在一般是使用this变量，但是有局限性
  - 全局环境：this返回顶层对象，Node模块和ES6中，this返回的是当前模块
  - 函数里的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象，严格模式下，this会返回undefined
  - 不管严格模式还是普通模式，new Function('return this')()总是返回全局对象，但是如果浏览器用了CSP（内容安全策略），那么eval，new Function这些方法都可能无法使用。
- 综上：很难找到一种方法可以在所有情况下都取到顶层对象，下面是两种勉强可以使用的方法
 ```js
 // 方法一
(typeof window !== 'undefined' ? window : (typeof process === 'object' && typeof require === 'function' && typeof global === 'object') ? global : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
 ```
- ES2020在语言标准的层面，引入globalThis作为顶层对象，即任何环境下globalThis都存在，都可以从它拿到顶层对象，指向全局环境下的this
- 垫片库global-this模拟了这个提案，可以在所有环境拿到globalThis。
