# 初探reconciler

reconciler是React核心逻辑所在的模块，中文名叫协调器。协调是diff算法的意思。

- reconciler的作用：

  - JQuery工作原理（过程驱动）：

    

  - 前端框架架构与工作原理（状态驱动）：

    - 消费jsx
    - 没有编译优化
    - 开放通用api供不同宿主环境使用

  - 核心模块消费jsx的过程

    - 当前已知的数据结构：ReactElement(JSCX转换playground)
    - ReactElement如果作为核心模块操作的数据结构，存在的问题：
      - 无法表达节点之间的关系
      - 字段有限，不好扩展（比如无法表达状态）
    - 所以需要一种新的数据结构，其特点（这就是FiberNode(虚拟DOM的实现)）：
      - 介于ReactElement与真实UI节点之间；
      - 能够表达节点之间的关系
      - 方便扩展（不仅作为数据存储单元，也能作为工作单元）
    - 当前我们了解的节点类型
      - jsx
      - ReactElement
      - FiberNode
      - DOMElement
    - reconciler的工作方式
      - 对于同一个节点，比较其ReactElement与fiberNode，生成子fiberNode, 并根据比较的结果生成不同标记（插入，删除，移动……），对应不同宿主环境api的执行。
      - 当所有ReactElement比较完后，会生成一棵fiberNode树，一共会存在两棵fiberNode树
        - current: 与视图中真实UI对应的fiberNode树
        - workInProgress: 触发更新后，正在reconciler中计算的fiberNode树
        - [双缓冲技术介绍](https://blog.csdn.net/wwwlyj123321/article/details/126447825)
    - JSX消费的顺序
      - [DFS 深度优先遍历与 BFS 广度优先遍历详解](https://houbb.github.io/2020/01/23/data-struct-learn-08-dfs-bfs)
        - 以DFS（深度优先遍历）的顺序遍历ReactElement，这意味着
          - 如果有子节点，遍历子节点
          - 如果没有子节点，遍历兄弟节点
          - 这是个递归的过程，存在递归两个阶段
            - 递：beginWork
            - 归：complateWork

​		