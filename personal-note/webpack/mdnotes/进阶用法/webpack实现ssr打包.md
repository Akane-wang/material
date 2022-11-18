# webpack实现ssr打包

- 渲染：HTML + CSS + JS + Data => 渲染后的HTML

- 服务端

  - 所有模板等资源都存储在服务端
  - 内网机器拉取数据更快
  - 一个HTML返回所有数据

- 浏览器和服务器交互流程

  ![浏览器和服务器交互流程](D:\personal\material\personal-note\webpack\mdnotes\images\ssr.jpg)

## 客户端渲染 VS 服务端渲染

|          | 客户端渲染                                   | 服务端渲染             |
| -------- | -------------------------------------------- | ---------------------- |
| 请求     | 多个请求（HTML， 数据等）                    | 1个请求                |
| 加载过程 | HTML & 数据串行加载                          | 1个请求返回HTML & 数据 |
| 渲染     | 前端渲染                                     | 服务端渲染             |
| 可交互   | 图片等静态资源加载完成，js逻辑执行完成可交互 |                        |

- 总结：服务端渲染（ssr)的核心是减少请求
- SSR优势：
  - 减少白屏时间
  - 对seo友好
- SSR代码实现思路
  - 服务端
    - 使用react-dom / server的renderToString方法将React组件渲染成字符串
    - 服务端路由返回对应的模板
  - 客户端
    - 打包出针对服务端的组件
- webpack ssr打包存在的问题
  - 浏览器的全局变量（node.js中没有document, window)
    - 组件适配： 将不兼容的组件根据打包环境进行适配
    - 请求适配：将fetch或ajax发送请求的写法改成isomorphic-fetch 或 axios
  - 样式问题（node.js无法解析css)
    - 方案一：服务端打包通过ignore-loader忽略掉css的解析
    - 方案二：将style-loader替换成isomorphic-style-loader

## 实现服务器端渲染

- 服务器端渲染总的来说就是，将原来打包的结果以服务器端调用的方式启动；然后就可以在浏览器端查看了。其中可能会有一定的改动，那么，接下来的实现就是，如何开启一个服务器端渲染。

  - 一、新建一个给服务器端使用的react组件

    - 需要注意两个点
      - 引入react包，或者logo 和样式的方式有所改动，需要使用require
      - 导出的方式有所改动，不支持ReactDOM了，此处用的是`module.exports = <Search />`

    ```js
    // page/search/index-server.js
    const React = require('react');
    require('../../style/search.less');
    const logo = require('../../images/aligado.jpeg');
    
    class Search extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                Text: null
            };
        }
        loadComponent() {
            require('./test.js').then((Text) => {
                this.setState({
                    Text: Text.default
                });
            });
        }
        render() {
            const {Text } = this.state;
            return (
                <div>
                    <div className="search">
                        { Text ? <Text /> : null } // text组件只是一段文案，一个组件返回一段文案即可
                    </div>
                    <img
                        src={ logo }
                        onClick={ this.loadComponent.bind(this) }
                    />
                </div>
            );
        }
    }
    
    module.exports = <Search />;
    
    ```

- 二、配置打包方式

  - 新建服务端专属的打包方式: 新建webpack.ssr.js

    - 其实该打包方式是webpack.prod.js的变种，改了一点点东西
      - 入口改动：原来的入口是是index.js, 但是我们新建了index-server.js，即为服务端的入口
      - page拦截：不是所有页面都有服务端入口的
      - output改动：file-hash改成了file-server.js
      - output的library.type = umd是必不可少的，为了在各个环境下运行成功而需要保证兼容性
      - file-loader / url-loader： 资源打包时，要注意不能使用es模块打包，需要关掉，否则会导致图片无法正确获取

    ```js
    'use strict';
    
    const glob = require('glob');
    const path = require('path');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // webpack@5压缩
    const HTMLWebpackPlugin = require('html-webpack-plugin');
    
    const setMPA = () => {
        const entry = {};
        const htmlWebpackPlugins = [];
        const entryFiles = glob.sync('./src/page/*/index-server.js'); // 入口改动
    
        Object.keys(entryFiles)
            .map((index) => {
                const entryFile = entryFiles[index];
    
                const match = entryFile.match(/src\/page\/(.*)\/index-server\.js/); // 入口改动
                const pageName = match && match[1];
    
                if (pageName) { // 不是所有页面都有服务端入口的，所以这里做了一个拦截
                    entry[pageName] = entryFile;
                    htmlWebpackPlugins.push(
                        new HTMLWebpackPlugin({
                            template: `./src/page/${pageName}/index.html`,
                            filename: `${pageName}.html`,
                            chunks: [pageName, 'vendors'],
                            inject: true,
                            minify: {
                                html: true,
                                collapseInlineTagWhitespace: true,
                                preserveLineBreaks: true,
                                minifyCSS: true,
                                minifyJS: true,
                                removeComments: false
                            }
                        }),
                    )
                }
            });
        return {
            entry,
            htmlWebpackPlugins
        }
    }
    
    const { entry, htmlWebpackPlugins } = setMPA();
    
    module.exports = {
        entry: entry,
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name]-server.js', // file-hash改成了file-server.js
            clean: true, // 打包时自动清理dist目录
            library: {
               type: 'umd' // library为了兼容性是必不可少的
            },
            globalObject: 'this', // umd下的构建在浏览器和nodejs皆可用
            publicPath: ''
        },
        mode: 'production', // 'development' | 'production', wds需要在开发环境而非生产环境下; production默认开启tree-shaking
        optimization: {
            minimize: false, // 开发环境配置
            minimizer: [
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            "default"
                        ]
                    }
                }),
            ],
    
            // 资源分离
            splitChunks: {
                chunks: 'all', // async(异步引入的库分离，默认) | initial （同步引入的库分离） | all（所有引入的库分离，推荐）
                cacheGroups: {
                    commons: {
                        test: /(react|react-dom)/,
                        name: 'vendors',
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        'babel-loader',
                        // 'eslint-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
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
                        },
                        {
                            loader: 'px2rem-loader',
                            options: {
                                remUnit: 75, // 1rem = 75px
                                remPrecision: 8, // px转成rem时小数点的位数
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name][hash:8].[ext]', // ext: 后缀
                            outputPath: 'img',
                            esModule: false, // 服务端渲染时，不应该使用es模块语法，因此需要关闭掉
                        }
                    }],
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({ // 提取css成独立的文件
                filename: '[name][contenthash:8].css'
            }),
        ].concat(htmlWebpackPlugins)
    }
    
    ```

  - package.json配置调用脚本：

    `"build:ssr": "webpack --config webpack.ssr.js"`

  - 到此，即可运行npm run build:ssr打包给服务端调用的dist包了；打包结束以后的启动方式参考【启动服务端渲染】

- 启动服务端渲染

  - 新建服务端渲染的启动文件：server/index.js

    ```js
    const express = require('express');
    const { renderToString } = require('react-dom/server');
    
    const SSR = require('../dist/search-server');
    
    const renderMarkup = (str) => {
        return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Hello Word</title>
            </head>
            <body>
                <div id="root">
                    ${str}
                </div>
            </body>
        </html>`;
    }
    
    const server = (port) => {
        const app = express();
        app.use(express.static('dist'));
        app.get('/search', (req, res) => {
            res.status(200).send(renderMarkup(renderToString(SSR)));
        });
    
        app.listen(port, () => {
            console.log('server is running on port: ' + port);
        });
    }
    server(process.env.PORT || 3000);
    ```

  - 调用： `node server/index.js`启动成功
  - 在浏览器页面输入链接查看即可：`127.0.0.1:3000/search`

### 问题

- 样式不显示

  - 使用打包出来的浏览器端html为模板

  - 设置占位符，动态插入组件

    - 实现原理是：使用原模板，原模板是已经在打包时就通过html-webpack-plugin把需要注入的样式或者是其他东西都插进去了，所以使用原模板，再把用于服务端的打包结果插进模板即可

    ```js
    // server/index.js
    const express = require('express');
    const { renderToString } = require('react-dom/server');
    const SSR = require('../dist/search-server');
    
    const path = require('path');
    const fs = require('fs');
    
    const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
    const renderMarkup = (str) => {
        return template.replace('<!--HTML_PLACEHOLDER-->', str);
    }
    
    const server = (port) => {
        const app = express();
        app.use(express.static('dist'));
        app.get('/search', (req, res) => {
            res.status(200).send(renderMarkup(renderToString(SSR)));
        });
    
        app.listen(port, () => {
            console.log('server is running on port: ' + port);
        });
    }
    server(process.env.PORT || 3000);
    
    ```

    ```html
    // src/page/search/index.html 模板
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello Word</title>
    </head>
    <body>
        <div id="root">
            <!--HTML_PLACEHOLDER--> // 设置占位符
        </div>
    </body>
    <script type="text/javascript">
        <%=require('raw-loader!babel-loader!../../../node_modules/lib-flexible/flexible.js')%>
    </script>
    </html>
    ```

- 首屏数据如何显示

  - 服务端获取数据

  - 替换占位符

    ```html
    // src/page/search/index.html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hello Word</title>
        </head>
        <body>
            <div id="root">
                <!--HTML_PLACEHOLDER-->
            </div>
        </body>
        <script type="text/javascript">
            <%=require('raw-loader!babel-loader!../../../node_modules/lib-flexible/flexible.js')%>
        </script>
        <!-- INITIAL_DATA_PLACEHOLDER --> // 添加数据占位符
    </html>
    ```

    ```js
    const express = require('express');
    const { renderToString } = require('react-dom/server');
    const SSR = require('../dist/search-server');
    const path = require('path');
    
    const fs = require('fs');
    
    const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
    
    const data = require('./data.json'); // 拿到mock的数据
    const renderMarkup = (str) => {
        const dataScript = `<script>window.initialData = ${JSON.stringify(data)}</script>` // 插入script标签内
        return template.replace('<!--HTML_PLACEHOLDER-->', str)
            .replace('<!-- INITIAL_DATA_PLACEHOLDER -->', dataScript); // 替换获取并经过加工的数据
    }
    
    const server = (port) => {
        const app = express();
        app.use(express.static('dist'));
        app.get('/search', (req, res) => {
            res.status(200).send(renderMarkup(renderToString(SSR)));
        });
    
        app.listen(port, () => {
            console.log('server is running on port: ' + port);
        });
    }
    server(process.env.PORT || 3000);
    
    ```

    