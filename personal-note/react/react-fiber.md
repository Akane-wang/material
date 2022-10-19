# Fiber为何会成为react的选择
** 关键词：Fiber的历史，优点，原理； 实现逻辑，在react中的实现，解决的问题 **
## fiber的结构是什么
- fiber的主要结构如下：
    ```react
        export interface Fiber<P = any> { // 25个属性
            tag?: WorkTag; // fiber的类型，根据ReactElement的type进行生成，在react内部共定义了25种tag
            key?: Key | null; // 和reactElement组件的key一致
            elementType?: any; // 和reactElement组件的type一致
            type?: any; // 和fiber.elementType一致；为兼容热更新会对function,class,forwardRef类型的ReactElement做一定处理，此时将会有别于elementType
            stateNode: any; // 与fiber关联的局部状态节点（HostComponent类型指向与fiber节点对应的dom节点；根节点fiber.stateNode指向firstRoot; class类型节点其stateNode指向的是class实例）
            return: Fiber; // 父节点
            child: Fiber | null; // 指向第一个子节点
            sibling: Fiber | null; // 指向下一个兄弟节点
            index?: number; // fiber在兄弟节点中的索引，如果是单节点，则默认为0
            props: P;
            base: Fiber | null;
            flags: Flags;
        }
    ```
    1. Type: 中reactElement中得来，是其中的type值，一般为div, p这种普通节点；或者函数名，类名，以及fragment
    2. Return: fiber的父节点
    3. Child：fiber的子节点
    4. Sibling: fiber的下一个兄弟节点
    5. Props: reactElement中的props属性，包括children, config……

 - Fiber一般有两个，一个是下一次要渲染的节点，一个是当前dom对应的fiber节点；初始时一般为null

  - ReactElement结构对象是由jsx通过createElement方法转变而来；一个jsx对应一个reactElement对象；一个reactElement对象对应一个fiber树；一个fiber树对应一个dom树；

1. 第一步jsx转变为reactElement对象的过程省略；
2. 第二步：如何将reactElement转变成fiber树；
- 初次创建：
  - ReactElment被创建成fiber树；再挂载到
## fiber在react中如何使用，如何从reactElement变成dom节点
## fiber在react中的作用，解决了react的什么痛点
## 平时coder写代码的时候，要如何注意，才能尽量的实现优雅的代码；如做到提升性能；如何优化等
