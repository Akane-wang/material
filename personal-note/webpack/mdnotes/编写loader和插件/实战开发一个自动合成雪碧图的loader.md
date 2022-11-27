# 实战开发一个自动合成雪碧图的loader

- 支持的语法

  ![sprite-lang](D:\personal\material\personal-note\webpack\mdnotes\images\sprite-lang.jpg)

- 准备知识：如何将两张图片合成一张图片

  - 使用spritesmith

    ```js
    const sprites = ['./image/1.png', './image/2.jpg'];
    Spritesmith.run({src: sprites}, function handleResult(err, result) {
        result.image;
        result.coordinates;
        result.properties;
    })
    ```

- demo

  ```js
  // demo文件样式
  .img1 {
      background: url('./images/black-boy.jpg?__sprite');
  }
  
  .img2 {
      background: url('./images/rubish-cat.jpg?__sprite');
  }
  ```

  

  ```js
  // loader/sprite-loader.js
  const fs = require('fs');
  const path = require('path');
  const Spritesmith = require('spritesmith');
  
  module.exports = function(source) {
      const callback = this.async();
      const imgs = source.match(/url\((\S*)\?__sprite/g); // 获取到css样式文件里的对应字段并进行匹配
      const matchedImgs = [];
  
      // 总的来说就是将获取到的图片引用地址（url(...)这些匹配数据）匹配出来以后，即拿到了对应的地址，转成绝对地址以后，放到matchedImgs里
      for(let i = 0; i < imgs.length; i++) {
          const img = imgs[i].match(/url\('(\S*)\?__sprite/)[1].replace(/\.\/images\//, 'src/images/');
          matchedImgs.push(path.join(process.cwd(), img));
      }
  
      Spritesmith.run({src: matchedImgs}, (err, result) => {
          if(err) {
              console.log(err);
          }
  
          // 将图片合并以后，放到dist/sprite.jpg里
          fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.jpg'), result.image);
          source = source.replace(/url\((\S*)\?__sprite/g, (match) => { // 将匹配的文件的地址（url('./images/rubish-cat.jpg?__sprite')等）替换成合成的图片
              return `url("dist/sprite.jpg")`;
          });
          // 将替换后的结果写入原样式文件即可
          fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), source);
          callback(null, source);
      })
  }
  ```

  