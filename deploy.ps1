# Vercel 部署脚本
Write-Host "开始部署到 Vercel..." -ForegroundColor Green

# 1. 检查 Vercel CLI
Write-Host "1. 检查 Vercel CLI..." -ForegroundColor Yellow
vercel --version

# 2. 登录 Vercel
Write-Host "2. 登录 Vercel..." -ForegroundColor Yellow
Write-Host "请在浏览器中完成登录..." -ForegroundColor Cyan
vercel login

# 3. 部署项目
Write-Host "3. 部署项目..." -ForegroundColor Yellow
vercel

# 4. 提示配置环境变量
Write-Host "4. 配置环境变量..." -ForegroundColor Yellow
Write-Host "请在 Vercel 控制台中设置以下环境变量:" -ForegroundColor Cyan
Write-Host "- OPENAI_API_KEY: 您的 OpenAI API 密钥" -ForegroundColor White
Write-Host "- NODE_ENV: production" -ForegroundColor White

# 5. 生产环境部署
Write-Host "5. 生产环境部署..." -ForegroundColor Yellow
vercel --prod

Write-Host "部署完成！" -ForegroundColor Green
Read-Host "按任意键继续..."
