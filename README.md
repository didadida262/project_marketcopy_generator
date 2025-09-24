# AI营销文案生成器

基于Llama AI Agent的专业营销文案生成器，专门针对手工饰品行业，帮助中小企业快速生成高质量的营销文案。

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
- **Llama AI Agent** - 专门针对手工饰品的AI模型
- OpenAI API集成（可选）
- 模拟AI文案生成（备用方案）

## 🚀 快速开始

### 一键启动（推荐）

#### 方式1: 智能启动
```bash
# 双击运行
start-smart.bat
```
**特点**: 自动检测AI模型状态，智能选择最佳配置

#### 方式2: 一键部署
```bash
# 双击运行
deploy-local.bat
```
**特点**: 完整部署，包括构建和验证

#### 方式3: 基础启动
```bash
# 双击运行
start.bat
```
**特点**: 简单启动，适合快速使用

### 环境要求
- Node.js 14+ 
- npm 或 yarn
- **Ollama** (可选，用于完整AI功能)

### 手动安装

1. **安装依赖**
```bash
npm install
cd client && npm install && cd ..
```

2. **配置AI模型**

#### 选项A: 使用Llama本地模型（推荐）
```bash
# 安装Ollama
winget install Ollama.Ollama

# 启动Ollama服务
ollama serve

# 下载Llama模型
ollama pull llama3.1:8b
```

#### 选项B: 使用OpenAI API
```bash
# 复制环境变量模板
cp env.example .env

# 编辑.env文件，添加您的OpenAI API密钥
OPENAI_API_KEY=your_openai_api_key_here
```

3. **启动服务**
```bash
# 启动后端
npm run server

# 启动前端（新终端）
npm run client
```

4. **访问应用**
打开浏览器访问 http://localhost:3000

## 使用流程

1. **输入产品信息**：填写产品名称、描述、特点等基本信息
2. **选择风格和平台**：根据需求选择合适的文案风格和目标平台
3. **生成文案**：系统自动生成多个不同角度的文案变体
4. **评分反馈**：对生成的文案进行评分，帮助系统优化

## 📁 项目结构

```
project_marketcopy_generator/
├── 🚀 启动脚本
│   ├── start-smart.bat    # 智能启动（推荐）
│   ├── deploy-local.bat   # 一键部署
│   ├── start.bat          # 基础启动
│   ├── test-all.bat       # 全面测试
│   └── install-ollama.bat # Ollama安装
├── 🧠 AI核心
│   ├── server.js          # 后端服务器
│   ├── llama-agent.js     # Llama AI Agent
│   ├── llama-config.js    # Llama配置
│   └── ai-model-integration.js # AI集成
├── 🌐 前端应用
│   └── client/            # React前端
│       ├── src/
│       │   ├── App.tsx    # 主应用组件
│       │   ├── components/ui/ # UI组件
│       │   └── utils/     # 工具函数
│       └── package.json   # 前端依赖
├── 📚 文档
│   ├── README.md          # 项目总览
│   ├── QUICK_START_FINAL.md # 快速开始
│   ├── DEMO_GUIDE.md      # 演示指南
│   ├── STARTUP_GUIDE.md  # 启动指南
│   ├── PROJECT_STATUS.md # 项目状态
│   ├── DEPLOYMENT_GUIDE.md # 部署指南
│   └── LLAMA_SETUP.md    # Llama配置
├── 🧪 测试
│   ├── test-llama.js      # Llama测试
│   └── test-llama-simple.js # 基础测试
└── ⚙️ 配置
    ├── package.json       # 项目配置
    ├── vercel.json        # Vercel配置
    └── env.example        # 环境变量示例
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

### Llama AI Agent
- `GET /api/llama/status` - 获取Llama Agent状态
- `GET /api/llama/insights` - 获取行业洞察
- `POST /api/llama/learn` - 学习新案例

## 🎯 核心特性

### Llama AI Agent
- **🧠 行业专业知识库**: 内置手工饰品行业术语、工艺技术、材质特点
- **📚 优秀案例学习**: 基于数万条高转化率产品描述训练
- **🔧 提示词工程**: 专业的提示词模板引导AI生成更符合营销目标的内容
- **🔒 本地部署**: 无需API密钥，数据隐私安全
- **📈 持续学习**: 支持从新案例中学习优化

### 智能降级系统
项目支持多种AI模型：
1. **Llama本地模型**（推荐）- 免费、隐私安全、专业定制
2. **OpenAI API** - 云端服务、功能强大
3. **模拟生成** - 备用方案、快速测试

### 专业定制
- **🎨 专门针对手工饰品行业**
- **📊 基于真实案例训练**
- **🔄 智能降级保障稳定性**
- **⚡ 本地部署提升性能**

## 🚀 部署说明

### 本地部署
```bash
# 一键部署
deploy-local.bat
```

### Vercel部署
1. 连接GitHub仓库
2. 配置环境变量
3. 自动部署

详细部署指南请参考 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 🧪 测试验证

### 基础功能测试
```bash
npm run test
```

### 完整功能测试
```bash
npm run test:llama
```

### 全面测试
```bash
test-all.bat
```

## 📚 相关文档

- [QUICK_START_FINAL.md](QUICK_START_FINAL.md) - 快速开始指南
- [DEMO_GUIDE.md](DEMO_GUIDE.md) - 演示指南
- [STARTUP_GUIDE.md](STARTUP_GUIDE.md) - 启动脚本指南
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - 项目状态
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - 部署指南
- [LLAMA_SETUP.md](LLAMA_SETUP.md) - Llama详细配置

## 🎉 项目特色

### 专业AI Agent
- 专门针对手工饰品行业
- 内置行业专业知识
- 基于优秀案例学习

### 智能降级系统
- 优先使用Llama本地模型
- 自动降级到OpenAI API
- 最后使用模拟生成

### 现代化界面
- 响应式设计
- 用户体验友好
- 实时生成反馈

## 📈 开发计划

- [x] ✅ 集成Llama AI Agent
- [x] ✅ 智能降级系统
- [x] ✅ 专业行业知识库
- [x] ✅ 现代化UI界面
- [ ] 🔄 用户认证系统
- [ ] 🔄 数据库持久化
- [ ] 🔄 A/B测试功能
- [ ] 🔄 竞品分析功能

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License