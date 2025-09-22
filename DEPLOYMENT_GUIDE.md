# 部署指南

## 方法一：通过 Vercel 网站部署（推荐）

### 1. 准备代码
确保所有文件都已提交到 Git 仓库：
```bash
git add .
git commit -m "准备部署到 Vercel"
git push origin main
```

### 2. 访问 Vercel
1. 打开 https://vercel.com
2. 使用 GitHub 账户登录
3. 点击 "New Project"
4. 选择您的 Git 仓库

### 3. 配置项目
- **Framework Preset**: Other
- **Root Directory**: 保持默认
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `client/build`

### 4. 设置环境变量
在项目设置中添加：
- `OPENAI_API_KEY`: 您的 OpenAI API 密钥
- `NODE_ENV`: `production`

### 5. 部署
点击 "Deploy" 开始部署

## 方法二：使用 Vercel CLI

### 1. 安装 CLI
```bash
npm install -g vercel
```

### 2. 登录
```bash
vercel login
```

### 3. 部署
```bash
vercel
```

### 4. 配置环境变量
在 Vercel 控制台中设置环境变量

### 5. 生产部署
```bash
vercel --prod
```

## 方法三：使用部署脚本

### Windows
```bash
# 运行批处理文件
deploy.bat

# 或运行 PowerShell 脚本
.\deploy.ps1
```

## 项目配置

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ]
}
```

## 环境变量

### 必需变量
- `OPENAI_API_KEY`: OpenAI API 密钥
- `NODE_ENV`: `production`

### 可选变量
- `AI_MODEL`: `gpt-4-turbo-preview`
- `AI_TEMPERATURE`: `0.7`
- `AI_MAX_TOKENS`: `2000`

## 部署后检查

1. **访问应用**: 检查部署的 URL 是否正常
2. **API 测试**: 测试 `/api/products` 端点
3. **前端功能**: 测试文案生成功能
4. **环境变量**: 确认环境变量已正确设置

## 故障排除

### 常见问题
1. **构建失败**: 检查 `client/package.json` 依赖
2. **API 错误**: 验证环境变量设置
3. **静态文件 404**: 检查 `vercel.json` 配置

### 调试命令
```bash
# 查看部署日志
vercel logs

# 本地测试
vercel dev
```

## 自定义域名

1. 在 Vercel 控制台添加域名
2. 配置 DNS 记录
3. 等待 SSL 证书配置

## 监控和维护

- 使用 Vercel Analytics 监控性能
- 定期检查环境变量
- 监控 OpenAI API 使用量
