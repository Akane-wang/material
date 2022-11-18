# 自动清理构建目录产物

- 通过npm scripts

  - `rm -rf ./dist && webpack`
  - `rimraf ./dist && webpack`

- 插件

  - clean-webpack-plugin: 默认删除output指定的输出目录

    ```js
    // 安装
    npm i clean-webpack-plugin -D
    // 引用
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    module.exports = {
        plugin: [
            new CleanWebpackPlugin()
        ]
    }
    ```

    

  - webpack@5改成了在output里增加clean配置；

    ```js
    output: {
        //...
        clean: true
    }
    ```

    
