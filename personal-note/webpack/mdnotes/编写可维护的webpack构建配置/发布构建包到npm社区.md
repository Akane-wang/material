# 发布构建包到npm社区

## 发布到npm

- 添加用户： npm adduser
- 升级版本
  - 升级布丁版本号： npm version patch
  - 升级小版本号：npm version minor
  - 升级大版本号：npm version major
- 发布版本：npm publish

### 发布过程

- 登录

  `npm config set registry https://registry/npmjs.org/` // 设置源

  `npm login`

  username:

  password：

  email： 

  `npm publish`