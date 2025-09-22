# AI营销文案生成器 Demo

基于PRD文档开发的AI营销文案生成器演示版本，帮助中小企业快速生成专业的营销文案。

## 功能特性

### 核心功能
- ✅ 产品信息输入和管理
- ✅ 多种文案风格选择（专业商务、活泼亲民、简洁明了等）
- ✅ 多平台适配（电商、社交媒体、广告等）
- ✅ 一键生成多个文案变体
- ✅ 文案评分和反馈系统

### 技术特性
- 前后端分离架构
- React + TypeScript 前端
- Node.js + Express 后端
- 响应式设计，支持移动端
- 模拟AI文案生成（可扩展真实AI API）

## 快速开始

### 环境要求
- Node.js 14+ 
- npm 或 yarn

### 安装和运行

1. **安装后端依赖**
```bash
npm install
```

2. **安装前端依赖**
```bash
cd client
npm install
cd ..
```

3. **启动后端服务**
```bash
npm run server
```

4. **启动前端服务**（新开一个终端）
```bash
npm run client
```

5. **访问应用**
打开浏览器访问 http://localhost:3000

## 使用流程

1. **输入产品信息**：填写产品名称、描述、特点等基本信息
2. **选择风格和平台**：根据需求选择合适的文案风格和目标平台
3. **生成文案**：系统自动生成多个不同角度的文案变体
4. **评分反馈**：对生成的文案进行评分，帮助系统优化

## 项目结构

```
project_marketcopy_generator/
├── server.js              # 后端服务器
├── package.json           # 后端依赖配置
├── client/                # 前端React应用
│   ├── src/
│   │   ├── App.tsx        # 主应用组件
│   │   ├── index.tsx      # 应用入口
│   │   └── index.css      # 样式文件
│   ├── public/
│   │   └── index.html     # HTML模板
│   └── package.json       # 前端依赖配置
└── README.md              # 项目说明
```

## API接口

### 产品管理
- `GET /api/products` - 获取产品列表
- `POST /api/products` - 创建新产品

### 文案生成
- `GET /api/styles` - 获取文案风格列表
- `GET /api/platforms` - 获取平台列表
- `POST /api/generate` - 生成文案
- `POST /api/copywritings/:id/rate` - 评分文案

## 扩展功能

### 集成真实AI API
在 `server.js` 中的 `generateMockCopywritings` 函数可以替换为真实的OpenAI API调用：

```javascript
const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 替换模拟生成函数
async function generateRealCopywritings(product, styleConfig, platformConfig, variantCount) {
  // 调用OpenAI API生成文案
}
```

### 数据库集成
可以集成PostgreSQL或MongoDB来持久化存储数据：

```javascript
// 示例：使用PostgreSQL
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
```

## 部署说明

### Heroku部署
1. 创建Heroku应用
2. 设置环境变量
3. 推送代码到Heroku

### Vercel部署
1. 连接GitHub仓库
2. 配置构建命令
3. 部署前端和后端

## 开发计划

- [ ] 集成真实AI API（OpenAI/Claude）
- [ ] 添加用户认证系统
- [ ] 实现数据库持久化
- [ ] 添加更多文案风格和平台
- [ ] 实现A/B测试功能
- [ ] 添加竞品分析功能
- [ ] 优化移动端体验

## 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT License