# Vercel 部署指南

## 部署步骤

### 1. 安装 Vercel CLI
```bash
npm install -g vercel
```

### 2. 登录 Vercel
```bash
vercel login
```

### 3. 部署项目
```bash
vercel
```

### 4. 配置环境变量
在 Vercel 控制台中设置以下环境变量：

#### 必需的环境变量
- `OPENAI_API_KEY`: 您的 OpenAI API 密钥
- `NODE_ENV`: `production`

#### 可选的环境变量
- `AI_MODEL`: `gpt-4-turbo-preview`
- `AI_TEMPERATURE`: `0.7`
- `AI_MAX_TOKENS`: `2000`

### 5. 重新部署
配置环境变量后，重新部署：
```bash
vercel --prod
```

## 项目结构

```
project_marketcopy_generator/
├── vercel.json          # Vercel 配置
├── server.js            # 后端服务器
├── client/              # React 前端
│   ├── package.json
│   ├── public/
│   └── src/
├── ai-model-integration.js
└── package.json
```

## 配置说明

### vercel.json
- 配置了 Node.js 服务器和静态文件构建
- API 路由指向 server.js
- 静态文件从 client/build 提供

### 环境变量设置
1. 访问 Vercel 控制台
2. 选择您的项目
3. 进入 Settings > Environment Variables
4. 添加以下变量：
   - `OPENAI_API_KEY`: 您的实际 API 密钥
   - `NODE_ENV`: production

## 注意事项

1. **API 密钥安全**: 确保在 Vercel 控制台中正确设置环境变量
2. **构建优化**: 前端会自动构建并优化
3. **无服务器**: 后端运行在 Vercel 的无服务器环境中
4. **模拟模式**: 如果没有配置 API 密钥，将自动使用模拟模式

## 故障排除

### 常见问题
1. **构建失败**: 检查 client/package.json 中的依赖
2. **API 错误**: 验证环境变量是否正确设置
3. **静态文件404**: 检查 vercel.json 中的路由配置

### 调试
```bash
# 本地测试 Vercel 环境
vercel dev

# 查看部署日志
vercel logs
```

## 自定义域名
1. 在 Vercel 控制台中添加自定义域名
2. 配置 DNS 记录
3. 等待 SSL 证书自动配置

## 监控和维护
- 使用 Vercel Analytics 监控性能
- 定期检查环境变量和 API 密钥
- 监控 OpenAI API 使用量和费用
