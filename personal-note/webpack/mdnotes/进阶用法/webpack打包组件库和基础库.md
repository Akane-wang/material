# webpack打包组件库和基础库

- 有一个库，比如是组件库，或者是某个功能库

- 对webpack.config.js做对应配置

  ```js
  module.exports = {
      output: {
          filename: '[name].js',
          library: { // 暴露从入口导出的内容
              name: 'name', // 打包出去的名字
              type: 'umd', // 兼容各种环境，即用户可以通过以下方式使用打包后的库：CommonJS, AMD,ESModule,Script标签引用全局变量的方式去引用这个库
              export: 'default', // 指定哪一个导出应该被暴露为一个库
  
          },
      }
  }
  ```

- 如何只对.min压缩

  ```js
  1.设置mode: 'none' // 不启动自动压缩
  // 2.配置optimization
  module.exports = {
      entry: {
        'name': './src/index.js',
         'name.min': './src/index.js'
      },
      optimization: {
      	minimize: true,
          minimizer: [
              new TerserPlugin({
                  include: /\.min\.js$/, // 压缩打包结果符合`.min`.js的文件
              })
          ]
  	}
  }
  // 3.再在入口根据process.ENV == production | development执行不同的打包结果
  ```

  