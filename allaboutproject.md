# Vue Admin Template 项目说明

## 项目简介

这是一个基于 Vue 2.6 + Element UI 的管理后台模板项目，提供了完整的用户管理、表格操作、文章管理等功能。

## 技术栈

- **前端框架**: Vue 2.6.10
- **UI 组件库**: Element UI 2.13.2
- **状态管理**: Vuex 3.1.0
- **路由管理**: Vue Router 3.0.6
- **HTTP 客户端**: Axios 0.18.1
- **构建工具**: Vue CLI 4.4.4
- **Mock 服务**: MockJS 1.0.1-beta3

## 项目结构

```
vue-admin-template/
├── src/
│   ├── api/           # API 接口定义
│   ├── components/    # 公共组件
│   ├── layout/        # 布局组件
│   ├── router/        # 路由配置
│   ├── store/         # Vuex 状态管理
│   ├── styles/        # 全局样式
│   ├── utils/         # 工具函数
│   └── views/         # 页面组件
├── mock/              # Mock 数据服务
└── public/            # 静态资源
```

## 主要功能

### 1. 用户认证
- 登录/登出
- Token 管理
- 权限控制

### 2. 表格管理
- 数据列表展示
- 分页功能
- 搜索过滤
- 增删改查操作

### 3. 文章管理
- 文章列表
- 文章详情
- 文章创建/编辑
- 文章状态管理

## API 接口说明

### 表格相关接口
- `GET /vue-admin-template/table/list` - 获取表格数据列表

### 文章相关接口
- `GET /vue-element-admin/article/list` - 获取文章列表
- `GET /vue-element-admin/article/detail` - 获取文章详情
- `POST /vue-element-admin/article/create` - 创建文章
- `POST /vue-element-admin/article/update` - 更新文章
- `GET /vue-element-admin/article/pv` - 获取文章访问量

## 环境配置

### 开发环境
```bash
npm run dev
```

### 生产构建
```bash
npm run build:prod
```

## Mock 服务配置

项目使用 MockJS 提供模拟数据服务，配置文件位于 `mock/` 目录下：

- `mock/index.js` - Mock 服务入口文件
- `mock/mock-server.js` - Mock 服务器配置
- `mock/article.js` - 文章相关 Mock 数据
- `mock/table.js` - 表格相关 Mock 数据
- `mock/user.js` - 用户相关 Mock 数据

## 常见问题

### 1. Mock 接口 404 问题
**问题**: 部署后请求 Mock 接口返回 404
**原因**: Mock 服务仅在开发环境生效，生产环境需要配置真实的后端 API
**解决方案**: 
- 开发环境：确保 Mock 文件正确注册
- 生产环境：配置 `vue.config.js` 中的 proxy 代理到真实后端

### 2. 环境变量配置
**问题**: API 基础路径配置错误
**解决方案**: 创建 `.env.development` 和 `.env.production` 文件配置 `VUE_APP_BASE_API`

## 调试建议

1. 检查浏览器开发者工具的网络面板，确认请求 URL 是否正确
2. 查看控制台是否有错误信息
3. 确认 Mock 服务是否正常启动（开发环境）
4. 检查 API 接口路径是否与 Mock 配置一致

## 更新日志

- 2024-01-XX: 修复 Mock 服务注册问题
- 2024-01-XX: 添加环境变量配置
- 2024-01-XX: 完善项目文档
