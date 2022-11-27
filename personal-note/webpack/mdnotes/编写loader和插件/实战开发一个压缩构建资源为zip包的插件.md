# 实战开发一个压缩构建资源为zip包的插件

- 要求：

  - 生成的zip包文件名称可以插件传入
  - 需要使用compiler对象上的特地hooks进行资源的生成

- 准备知识： Node.js里面将文件压缩为zip包

  - 使用jszip

  - jszip使用示例

    ```js
    var zip = new JSZip();
    zip.file('hello.txt', 'hello world');
    var img = zip.folder('images');
    img.file('smile.gif', imgData, {base64: true});
    zip.generateAsync({type: 'blob'}).then(function(content) {
        saveAs(content, 'example.zip');
    })
    ```

- 复习：Compiler上负责文件生成的hooks

  - Hooks是emit， 是一个异步的hook(AsyncSeriesHook)
    - 可以将zip资源包设置到compilation.assets对象上

- plugin-demo: zipPlugin

  ```js
  const JSZip = require('jszip');
  const RawSource = require('webpack-sources').RawSource;
  const path = require('path');
  const zip = new JSZip();
  module.exports = class ZipPlugin {
      constructor (options) {
          this.options = options;
      }
      apply(compiler) {
          compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
              const folder = zip.folder(this.options.filename);
              for(let filename in compilation.assets) {
                  const source = compilation.assets[filename].source();
                  folder.file(filename, source);
              }
  
              zip.generateAsync({
                  type: 'nodebuffer'
              }).then((content) => {
                  const outputPath = path.join(compilation.options.output.path, this.options.filename + '.zip');
                  const outputRelativePath = path.relative(
                      compilation.options.output.path,
                      outputPath
                  );
                  compilation.assets[outputRelativePath] = new RawSource(content);
                  callback();
              });
          });
      }
  }
  ```

  - 使用

    ```js
    plugins: [
        new ZipPlugin({
            filename: 'offline', // 定义打包name
        })
    ]
    ```

    