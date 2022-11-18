# PostCss（后缀处理器）插件AutoPrefixer自动补齐CSS3前缀

- 浏览器内核导致css3需要考虑兼容性问题，则需要添加前缀

  - IE: Trident(-ms)
  - 火狐：Geko(-moz)
  - 谷歌：Webkit(-webkit)
  - Presto(-o)

- 使用

  - 安装：`npm i postcss-loader autoprefixer -D`

  - 添加到config配置里；注意postcss-loader的写法，与webpack@4的写法不是很相同

    ```js
    module.exports = {
        entry: {
            //...
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name][chunkhash:8].js',
            clean: true // 打包时自动清理dist目录
        },
        mode: 'production', // 'development' | 'production', wds需要在开发环境而非生产环境下
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        // 'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader, // 'style-loader', // 与mini-css-extract-plugin不能共存, style-loader替换成MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require('autoprefixer')({
                                            overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']// 指定需要兼容的浏览器版本 browser 替换成overrideBrowserslist；否则会报错
                                        })
                                    ]
                                }
                            }
                        }
                    ]
                },
            ]
        }
    }
    ```

    