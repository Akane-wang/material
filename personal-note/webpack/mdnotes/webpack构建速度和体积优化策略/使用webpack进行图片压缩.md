# 使用webpack进行图片压缩

- 图片压缩
  - 要求：基于Node库的imagemin或者tinypng API
    - Imagemin
      - 优点分析
        - 有很多定制选项
        - 可以引入更多第三方优化插件，例如pngquant
        - 可以处理多种图片格式
      - 压缩原理
        - pngquant: 是一款png压缩器，通过将图像转为具有alpha通道（通常比24/32位png文件小60-80%）的更高效的8位png格式，可显著减小文件大小
        - pngcrush: 其主要目的是通过尝试不同的压缩级别和png过滤方法来降低png IDAT数据流的大小
        - optipng: 其设计灵感来源于pngcrush, optipng可将图像文件重新压缩位更小尺寸，而不会丢失任何信息
        - tinypng: 也是将24位png文件转化为更小有索引的8位图片，同时所有非必要的metadata也会被剥离掉
    
  - 使用：配置image-webpack-loader(webpack@5, 没下下来该loader)
  
    ```js
    const prodConfig = {
        module: {
            rules: [
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name][hash:8].[ext]', // ext: 后缀
                                outputPath: 'img',
                                esModule: false, // 服务端渲染时，不应该使用es模块语法，因此需要关闭掉
                            }
                        },
                        {
                            // 压缩图片
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                optipng: {
                                    enabled: false
                                },
                                pdgquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false
                                },
                                webp: {
                                    quality: 75
                                }
                            }
                        }
                    ],
            ]
        }
    };
    module.exports = prodConfig;
    ```
  
    