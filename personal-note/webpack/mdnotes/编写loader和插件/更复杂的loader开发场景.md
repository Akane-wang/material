# 更复杂的loader的开发场景

- loader的参数获取

  - 通过loader-utils的getOptions方法获取

    ```js
    const loaderUtils = require('loader-utils');
    module.exports = function(content) {
        const { name } = loaderUtils.getOptions(this); // 报错，无法通过此方式获取，除非版本回退
        const { name } = this.query // 可用于获取options
    }
    ```

    - 示例代码

      ```js
      module.exports = function(source) {
          console.log(this.query);
          const json = JSON.stringify(source)
          .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029'); // 为了安全起见，ES6模板字符串的问题（存在一定的安全问题，所以做一定的安全处理）
          // return `export default ${json}`;
      
      };
      
      ```

      

- loader异常处理

  - loader同步异常处理

    - loader内直接通过throw抛出

    - 通过this.callback传递错误

      ```js
      this.callback(
      	err: Error } null,
          content: string | Buffer,
              sourceMap?: SourceMap,
              meta?: any
      )
      ```

      - 示例代码

        ```js
        const fs = require('fs');
        const path = require('path');
        module.exports = function(source) {
            console.log(this.query);
            const json = JSON.stringify(source)
            .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029'); // 为了安全起见，ES6模板字符串的问题（存在一定的安全问题，所以做一定的安全处理）
            this.callback(null, json);
            // this.callback(new Error('error'), json, res1, res2); // 抛出错误方式，多个值传出
        
        };
        
        ```

        

  - loader的异步处理

    - 通过this.async来返回一个异步函数

      - 第一个参数是Error, 第二个参数是处理的结果

        ```js
        module.exports = function (input) {
            const callback = this.async();
            // No callback -> return synchronous results
            // if(callback) {...}
            callback(null, input + input)
        }
        ```

        - 示例代码

          ```js
          const fs = require('fs');
          const path = require('path');
          module.exports = function(source) {
              console.log(this.query);
              const json = JSON.stringify(source)
              .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029'); // 为了安全起见，ES6模板字符串的问题（存在一定的安全问题，所以做一定的安全处理）
              const callback = this.async();
              fs.readFile(path.join(__dirname, '../src/demo.txt'), 'utf-8', (error, data) => {
                  if(error) {
                      callback(error, '');
                  }
                  callback(null, data);
              })
          
          };
          
          ```

- 在loader中使用缓存

  - webpack中默认开启loader缓存
    - 可以使用this.cacheable(false)关掉缓存
  - 缓存条件： loader的结果在相同的输入下有确定的输出
    - 有依赖的loader无法使用缓存

- loader如何进行文件输出

  - 通过this.emitFile进行文件写入

    ```js
    ```

    