# 代码分割和动态import

- 意义：对于大的web应用来讲，将所有的代码都放在一个文件中显然是不够有效的，特别是当你的某些代码块是在某些特殊的时候才会被使用到。webpack有一个功能就是将你的代码库分割成chunks（语块），当代码运行到需要他们的时候再进行加载。

- 适用场景：

  - 抽离相同代码到一个共享块
  - 脚本懒加载，使得初始下载的代码更小

- 懒加载js脚本的方式

  - CommonJS: require.ensure

  - ES6: 动态import(目前没有原生支持，需要babel转换)

    - 安装babel插件

      `npm i @babel/plugin-syntax-dynamic-import -D`

      ```js
      // .babelrc
      {
          "plugins": [
              "@babel/plugin-syntax-dynamic-import", // 添加进.babelrc
          ]
      }
      ```

    - 新建一个文件作为动态加载的文件

      ```js
      // test.js
      import React from 'react';
      
      export default() => <div>动态import</div>;
      ```

    - 在某页面中引入该文件

      ```js
      'use strict';
      
      import React from 'react';
      import ReactDOM from 'react-dom';
      import '../../style/search.less';
      import logo from '../../images/aligado.jpeg';
      
      import { a } from './tree-shaking';
      class Search extends React.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  Text: null
              };
          }
          // 动态加载的方法
          loadComponent() {
              // import()动态加载，出来的结果是一共promise
              import('./test.js').then((Text) => {
                  this.setState({
                      Text: Text.default
                  });
              });
          }
          render() {
              const { Text } = this.state;
              return (
                  <div>
                      <div class="search">
                          { Text ? <Text /> : null }
                      </div>
                      <img src={logo}
                          onClick={ this.loadComponent.bind(this) }
                      />
                  </div>
              );
          }
      }
      
      ReactDOM.render(<Search />, document.getElementById('root'));
      
      ```

    - 打包结果如下

      - 红框部分则是动态引入的部分，点击图片则可动态引入该js

      ![](D:\personal\material\personal-note\webpack\mdnotes\images\dynamic-import-res.jpg)