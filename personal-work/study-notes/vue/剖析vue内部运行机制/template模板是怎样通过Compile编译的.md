# Compile

- compile编译分成三个部分,分别是parse,optimize,generate,最终得到render function
  - parse: 用正则等方式将template模板中进行字符串解析，得到指令、class、style等数据，形成AST(在计算机科学中，抽象语法树(abstact syntax tree或者缩写为AST),或者语法树(syntax tree),是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源码。)
  - optimize
  - generate
