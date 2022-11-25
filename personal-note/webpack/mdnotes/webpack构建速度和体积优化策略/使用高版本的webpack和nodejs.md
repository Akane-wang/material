# 使用高版本的webpack和node.js

- webpack4优化原因
  - v8带来的优化
    - for of 替代forEach
    - Map和Set替代Object
    - includes替代indexOf
  - 默认使用更快的md4 hash算法
  - webpack AST 可以直接从loader传递给AST,减少解析时间
  - 使用字符串方法替代正则表达式

