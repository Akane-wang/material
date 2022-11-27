# Vite的构建原理

- bundle和bundleless的差异

  - 打包速度的对比

    - bundless的冷启动时间大大缩短

    - bundless的HMR速度不受整个项目体积影响

    - bundless的单文件粒度的缓存更优

      ![bundle-bundless](D:\personal\material\personal-note\webpack\mdnotes\images\bundle-bundless.jpg)

  - Vite打包流程-创建构建服务

    ![打包流程](D:\personal\material\personal-note\webpack\mdnotes\images\build-流程.jpg)

- Vite打包流程 —— 静态文件托管服务
  - Vite会利用serveStaticPlugin将整个目录根目录，Public目录设置为静态目录
  - serveStaticPlugin利用koa-etag中间件打etag
  - devServer具备静态文件服务功能

- Vite打包流程——重写模块路径

  - 处理裸导入（bare import）的模块路径，eg: import react from 'react';
  - 浏览器（只有相对路径和绝对路径）无法识别，因此需要重写模块路径

  - 对于bare import，把模块名替换为这个模块的entry path,并在path的开头补上一个/@modules的标识符。
  - 相对路径转绝对路径，方便浏览器请求
  - 补齐文件扩展名和经常被省略的index.xxx
  - 给非js类型（js类型：如js(x)/ts(x)/vue）的文件地址加上一个叫’import'的query参数
  - 给hmr相关的请求地址添加时间戳，避免缓存

- vite打包流程——静态资源打包策略
  - 浏览器不支持js中直接写import css, 图片，json等语法
  - 回顾一下webpack loader的处理策略
    - css: 转换成js的模块，执行模块会在DOM中创建<style>标签并插入css内容
    - 图片：转换成图片路径
    - JSON：转化成js模块，default export = json

- vite打包流程——vue脚本打包策略
  - 获取script内容
  - 如果有style就请求获取style的部分
  - 发送请求获取template的部分
  - 进行渲染

- vite打包流程——css资源打包策略
  - 判断是否是.css文件的请求
  - 判断是否为js中import的css
  - 进行sass/less的编译处理
  - 基于css的源代码保证成js的模块

- vite打包流程——模板打包策略
  - @vue/compiler-dom编译template, 然后返回给浏览器