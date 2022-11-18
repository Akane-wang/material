# Mode

- 用来指定当前的环境，便于使用webpack内置的函数。

- mode?( = production)：production | development | none;

## mode的内置函数功能

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| development | 设置process.env.NODE_ENV的值为development, 开启NamedChunksPlugin和NamedModulesPlugin. |
| production  | 设置process.env.NODE_ENV的值为production, 开启FlagDependencyUsagePlugin，FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin和TerserPlugin. |
| none        | 不开启任何优化选项                                           |

