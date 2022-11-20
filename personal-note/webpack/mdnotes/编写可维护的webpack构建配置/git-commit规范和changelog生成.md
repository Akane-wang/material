# git commit规范和changelog生成

- 良好的git commit规范优势

  - 加快code review的流程
  - 根据git commit 的元数据生成changelog
  - 后续维护者可以知道feature被修改的原因

- 技术方案

  ![git-commit提交规范](D:\personal\material\personal-note\webpack\mdnotes\images\git-commit提交规范.jpg)

- 提交格式要求

  ```js
  <type>(<scope>): <subject>
         <blank line>
         <body>
         <blank line>
         <footer>
  ```

  - type代表某次提交的类型，比如是修复一个bug还是增加一个新的feature, 所有的type类型如下：
    - feat： 新增feature
    - fix: 修复bug
    - docs: 仅仅修改了文档，比如readme, changelog, contribute等
    - style: 修改空格，格式缩进，逗号等，不改变代码逻辑
    - refactor: 代码重构，没有加新功能或者修复bug
    - perf: 优化相关，比如提升性能，体验
    - test: 测试用例，包括单元测试，集成测试等
    - chore: 改变构建流程，或者增加依赖库，工具等
    - revert: 回滚到上一个版本