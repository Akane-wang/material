# entry && output
- 使用方式
  - 单页面应用
  ```js
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js' // 可写死
    }
  ```
  - 多页面应用
  ```js
    entry: {
        'index': './src/index.js',
        'search': './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js' // [name]：占位符，即为index.js, search.js
    }
  ```