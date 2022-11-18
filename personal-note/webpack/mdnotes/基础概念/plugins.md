# plugins

- 插件用于bundle文件的优化，资源管理和环境变量注入
- 作用于整个构建过程

## 常见plugins

| 名称                     | xxxxxxxxxx   entry: {      'index': './src/index.js',      'search': './src/search.js'  },  output: {      path: path.join(__dirname, 'dist'),      filename: '[name].js' // [name]：占位符，即为index.js, search.js  }js |
| ------------------------ | ------------------------------------------------------------ |
| CommonsChunkPlugin       | 将chunks相同的模块代码提取成公共js                           |
| ClearWebpackPlugin       | 清理构建目录                                                 |
| ExtractTextWebpackPlugin | 将css从bundle文件里提取成一个独立的css文件                   |
| CopyWebpackPlugin        | 将文件或者文件夹拷贝到构建的输出目录                         |
| HtmlWebpackPlugin        | 创建html文件去承载输出的bundle                               |
| UglifyjsWebpackPlugin    | 压缩js                                                       |
| ZipWebpackPlugin         | 将打包出的资源生成一个zip包                                  |

