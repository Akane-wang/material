# 持续集成和Travis CI

## 持续集成的作用

- 优点：
  - 快速发现错误
  - 防止分支大幅偏离主干
- 核心措施是，代码集成到主干之前，必须通过自动化测试，只要有一个测试用例失败，就不能集成

## github最流行的CI

- travis CI
- Circle CI
- Jenkins
- AppVeyor
- ...

## 接入Travis CI

- `https://travis-ci.org/`使用github账号登录
- 在`https://travis-ci.org/account/repositories`为项目开启
- 项目根目录下新增`.travis.yml`
  - travis.yml文件内容
    - install 安装依赖
    - script运行测试用例