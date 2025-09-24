@echo off
chcp 65001 >nul
echo 启动AI营销文案生成器（Llama AI Agent版）...
echo.

echo 检查依�?..
if not exist "node_modules" (
    echo 安装后端依赖...
    call npm install
) else (
    echo �?后端依赖已安�?
)

if not exist "client\node_modules" (
    echo 安装前端依赖...
    cd client
    call npm install
    cd ..
) else (
    echo �?前端依赖已安�?
)

echo.
echo 🔍 检查AI模型状�?..
echo 检查Llama Agent状�?..
timeout /t 1 /nobreak > nul

echo.
echo 🖥�?启动后端服务...
start "AI营销文案生成�?- 后端服务" cmd /k "echo 🚀 启动后端服务�?.. && npm run server"

echo.
echo �?等待后端服务启动...
timeout /t 5 /nobreak > nul

echo.
echo 🌐 启动前端服务...
start "AI营销文案生成�?- 前端服务" cmd /k "echo 🌐 启动前端服务�?.. && npm run client"

echo.
echo �?等待前端服务启动...
timeout /t 8 /nobreak > nul

echo.
echo 🎉 服务启动完成�?
echo.
echo 📊 服务状�?
echo   �?后端服务: http://localhost:5000
echo   �?前端服务: http://localhost:3000
echo   �?Llama AI Agent: 已集�?
echo.
echo 🎯 使用说明:
echo   1. 打开浏览器访�? http://localhost:3000
echo   2. 输入产品信息
echo   3. 选择风格和平�?
echo   4. 生成专业营销文案
echo.
echo 🔧 可选配�?
echo   - 安装Ollama获得完整AI功能: install-ollama.bat
echo   - 配置OpenAI API作为备用: 编辑.env文件
echo.
echo 📚 相关文档:
echo   - README.md - 项目总览
echo   - LLAMA_QUICK_START.md - 快速开�?
echo   - DEMO_GUIDE.md - 演示指南
echo.
pause
