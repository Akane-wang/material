# 速度分析：使用speed-measure-webpack-plugin

- 可以看到每个loader和插件执行耗时

  ```js
  const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
  const smp = new SpeedMeasurePlugin();
  const webpackConfig = smp.wrap({
      entry: entry,
      output: {},
      module: {
          rules: [
              // ...        ]
      }
      plugins: [
          new MyPlugin(),
          new MyOtherPlugin()
      ]
  });
  ```

  