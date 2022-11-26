# Tapable插件架构与Hooks设计

- webpack的本质

  - webpack可以将其理解是一种基于事件流的编程范例，一系列的插件运行

- 先看一段代码

  - 核心对象Compiler继承Tapable

    ```js
    class Compiler extends Tapable {
        //...
    }
    ```

    

  - 核心对象Compilation继承Tapable

    ```js
    class Compilation extends Tapable {
        //...
    }
    ```

- Tapable 是什么

  - Tapable是一共类似于Node.js的EventEmitter的库，主要是控制狗子函数的发布与订阅，控制着webpack的插件系统

  - Tapable库暴露了很多Hooks（钩子）类，为插件提供挂载的钩子

    ```js
    const {
        SyncHook, // 同步钩子
        SyncBailHook, // 同步熔断钩子
        SyncWaterfallHook, // 同步流水钩子
        SyncLoopHook, //同步循环钩子
        AsyncParallelHook, // 异步并发钩子
        AsyncParallelBailHook, // 异步并发熔断钩子
        AsyncSeriesHook, // 异步串行钩子
        AsyncSeriesBailHook, // 异步串行熔断钩子
        AsyncSeriesWaterfallHook // 异步串行流水钩子
    } = require('tapable');
    ```

- Tapable hooks类型

  | type          | function                                                |
  | ------------- | ------------------------------------------------------- |
  | Hook          | 所有钩子的后缀                                          |
  | Waterfall     | 同步方法，但是它会传值给下一个函数                      |
  | Bail          | 熔断：当函数有任何返回值，就会在当前执行函数停止        |
  | Loop          | 监听函数返回true表示继续循环，返回undefined表示结束循环 |
  | Sync          | 同步方法                                                |
  | AsyncSeries   | 异步串行钩子                                            |
  | AsyncParallel | 异步并行执行钩子                                        |

- Tapable的使用-new Hooks新建钩子

  - Tapable暴露出来的都是类方法，new一个类方法获得我们需要的钩子

  - class接收数组参数options, 非必传。类方法会根据传参，接受同样数量的参数

    ```js
    const hooks1 = new SyncHook(['arg1', 'arg2', 'arg3'])
    ```

- Tapable的使用-钩子的绑定与执行

  - Tabpack提供了同步与异步绑定钩子的方法，并且他们都有绑定事件和执行事件对应的方法

    | Async*                           | Sync*      |
    | -------------------------------- | ---------- |
    | 绑定：tapAsync / tapPromise /tap | 绑定：tap  |
    | 执行：callAsync / promise        | 执行：call |
    |                                  |            |

- Tapable的使用-hook基本用法示例

  ```js
  const hook1 = new SyncHook(['arg1', 'arg2', 'arg3']);
  // 绑定事件到webpack事件流
  hook1.tap('hook1', (arg1, arg2,arg3) => console.log(arg1, arg2, arg3)) // 1, 2, 3
  // 执行绑定的事件
  hook1.call(1,2,3)
  ```

- Tapable的使用-实际例子演示

  - 定义一个Car方法，在内部hooks上新建钩子，分别是同步钩子accelerate, brake(accelerate接受一个参数)， 异步钩子calculateRoutes
  - 使用钩子对应的绑定和执行方法
  - calculateRoutes使用tapPromise可以返回一个promise对象