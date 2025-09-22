# Vercel 部署配置说明

## 🚀 **特殊配置要求**

### 1. **项目设置**
在Vercel控制台中设置：
- **Framework Preset**: `Other`
- **Root Directory**: `./` (根目录)
- **Build Command**: `npm run build`
- **Output Directory**: `client/build`

### 2. **环境变量配置**
必须在Vercel控制台设置以下环境变量：

#### 必需变量
```
OPENAI_API_KEY=sk-your-actual-api-key-here
NODE_ENV=production
```

#### 可选变量
```
AI_MODEL=gpt-4-turbo-preview
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=2000
```

### 3. **构建配置**
- **Node.js Version**: 18.x 或更高
- **Build Timeout**: 60秒
- **Function Timeout**: 30秒

### 4. **路由配置**
- API路由: `/api/*` → `server.js`
- 静态文件: `/*` → `client/build/*`

## 📁 **文件结构要求**

```
project_marketcopy_generator/
├── vercel.json              # Vercel配置
├── .vercelignore           # 忽略文件
├── server.js               # 后端服务器
├── package.json            # 根目录依赖
├── client/                 # 前端目录
│   ├── package.json        # 前端依赖
│   ├── public/
│   ├── src/
│   └── build/              # 构建输出
└── ai-model-integration.js # AI集成
```

## ⚙️ **部署步骤**

### 方法1: 通过Vercel网站
1. 连接GitHub仓库
2. 选择项目
3. 配置环境变量
4. 设置构建配置
5. 部署

### 方法2: 通过CLI
```bash
# 安装CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel

# 生产部署
vercel --prod
```

## 🔧 **常见问题解决**

### 1. **构建失败**
- 检查`client/package.json`中的依赖
- 确保`npm run build`能成功运行
- 检查Node.js版本

### 2. **API路由404**
- 检查`vercel.json`中的路由配置
- 确保`server.js`正确导出

### 3. **静态文件404**
- 检查`client/build`目录是否存在
- 确保构建输出正确

### 4. **环境变量问题**
- 在Vercel控制台正确设置
- 重启部署后生效

## 📊 **性能优化**

### 1. **构建优化**
- 使用`npm ci`而不是`npm install`
- 启用构建缓存

### 2. **运行时优化**
- 设置合适的函数超时时间
- 优化API响应时间

### 3. **静态资源优化**
- 启用CDN
- 压缩静态文件

## 🔒 **安全配置**

### 1. **环境变量安全**
- 不要在代码中硬编码API密钥
- 使用Vercel环境变量管理

### 2. **API安全**
- 添加CORS配置
- 限制API调用频率

## 📈 **监控和维护**

### 1. **性能监控**
- 使用Vercel Analytics
- 监控API响应时间

### 2. **错误监控**
- 查看Vercel函数日志
- 设置错误告警

### 3. **成本控制**
- 监控OpenAI API使用量
- 设置使用限制
