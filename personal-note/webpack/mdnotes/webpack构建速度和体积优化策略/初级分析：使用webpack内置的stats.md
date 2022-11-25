# 初级分析：使用webpack内置的stats

- stats: 构建的统计信息

  ```js
  "scripts": {
      "build:stats": "webpack --env production --json > stats.json"
  }
  ```

- node.js中使用

  - 颗粒度太粗，看不出问题所在