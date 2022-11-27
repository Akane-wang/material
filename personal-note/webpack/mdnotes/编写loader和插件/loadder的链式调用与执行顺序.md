# loader的链式调用与执行顺序

- 一个最简单的loader代码结构

  - 定义：loader只是一个导出为函数的JavaScript模块

    ```js
    module.exports = function(source) {
        return source;
    }
    ```

- 多Loader时的执行顺序

  - 多个loader串行执行，顺序从后到前

- 函数组合的两种情况

  - Unix中的pipline

  - Compose(webpack采取的是这种)

    ```js
    compose = (f, g) => (...args) => f(g(..args));
    ```

    