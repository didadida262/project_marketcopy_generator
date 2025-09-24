@echo off
echo 🚀 一键部署AI营销文案生成�?..
echo.

echo 📋 部署步骤:
echo   1. 检查环�?
echo   2. 安装依赖
echo   3. 构建项目
echo   4. 启动服务
echo   5. 验证部署
echo.

echo 🔍 1. 检查环�?..
echo 检查Node.js版本...
node --version
if %errorlevel% neq 0 (
    echo �?Node.js未安装，请先安装Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)
echo �?Node.js环境正常

echo 检查npm版本...
npm --version
if %errorlevel% neq 0 (
    echo �?npm未安�?
    pause
    exit /b 1
)
echo �?npm环境正常
echo.

echo 📦 2. 安装依赖...
echo 安装后端依赖...
call npm install
if %errorlevel% neq 0 (
    echo �?后端依赖安装失败
    pause
    exit /b 1
)
echo �?后端依赖安装完成

echo 安装前端依赖...
cd client
call npm install
if %errorlevel% neq 0 (
    echo �?前端依赖安装失败
    cd ..
    pause
    exit /b 1
)
cd ..
echo �?前端依赖安装完成
echo.

echo 🔨 3. 构建项目...
echo 构建前端项目...
cd client
call npm run build
if %errorlevel% neq 0 (
    echo �?前端构建失败
    cd ..
    pause
    exit /b 1
)
cd ..
echo �?前端构建完成
echo.

echo 🚀 4. 启动服务...
echo 启动后端服务...
start "AI营销文案生成�?- 后端" cmd /k "echo 🚀 启动后端服务�?.. && npm run server"

echo 等待后端服务启动...
timeout /t 5 /nobreak >nul

echo 启动前端服务...
start "AI营销文案生成�?- 前端" cmd /k "echo 🌐 启动前端服务�?.. && npm run client"

echo 等待前端服务启动...
timeout /t 8 /nobreak >nul
echo.

echo 🔍 5. 验证部署...
echo 测试后端服务...
curl -s http://localhost:5000/api/llama/status >nul 2>&1
if %errorlevel% equ 0 (
    echo �?后端服务正常
) else (
    echo ⚠️  后端服务可能未完全启�?
)

echo 测试前端服务...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo �?前端服务正常
) else (
    echo ⚠️  前端服务可能未完全启�?
)
echo.

echo 🎉 部署完成�?
echo.
echo 📊 服务状�?
echo   �?后端服务: http://localhost:5000
echo   �?前端服务: http://localhost:3000
echo   �?项目构建: 完成
echo.
echo 🎯 使用说明:
echo   1. 打开浏览器访�? http://localhost:3000
echo   2. 开始使用AI营销文案生成�?
echo.
echo 🔧 可选配�?
echo   - 安装Ollama: install-ollama.bat
echo   - 配置OpenAI: 编辑.env文件
echo.
echo 📚 相关文档:
echo   - README.md - 项目总览
echo   - DEMO_GUIDE.md - 演示指南
echo.

echo 🚀 准备就绪！按任意键打开浏览�?..
pause >nul

echo 正在打开浏览�?..
start http://localhost:3000

echo.
echo 💡 提示: 保持此窗口打开以监控服务状�?
echo 按Ctrl+C可停止所有服�?
pause
