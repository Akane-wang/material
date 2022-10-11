# Q1: js有哪些类型

js的类型分成两种，分别是基础类型，引用类型；

![image-20220818162755436](F:\杂物文档\study\study-notes\images\image-20220818162755436.png)

- null 与 undefined的区别：

  - null 表示空，即此处不应该有值存在
  - undefined表示不存在，即未设置值

- 判断类型的方式有多种：

  - typeof

    ```js
    typeof null // 'object'
    typeof 1 // 'number'
    typeof new Date() //'object'
    typeof 'str' //'string'
    typeof true // 'boolean'
    typeof {} // 'object'
    typeof [] // 'object'
    typeof Function // 'function'
    typeof Symbol() // 'symbol'
    ```

    - typeof null 的值为'object'的原因是一个历史bug

