@echo off
chcp 65001 >nul
echo 智能启动AI营销文案生成器（Llama AI Agent版）...
echo.

echo 检查项目依赖...
if not exist "node_modules" (
    echo 安装后端依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 后端依赖安装失败
        pause
        exit /b 1
    )
) else (
    echo [成功] 后端依赖已安装
)

if not exist "client\node_modules" (
    echo 安装前端依赖...
    cd client
    call npm install
    cd ..
    if %errorlevel% neq 0 (
        echo [错误] 前端依赖安装失败
        pause
        exit /b 1
    )
) else (
    echo [成功] 前端依赖已安装
)

echo.
echo 检查AI模型配置...

echo 检查Ollama服务...
ollama list >nul 2>&1
if %errorlevel% equ 0 (
    echo [成功] Ollama服务可用
    ollama list | findstr "llama3.1:8b" >nul
    if %errorlevel% equ 0 (
        echo [成功] Llama 3.1 8B模型已安装
        set AI_MODE=LLAMA
    ) else (
        echo [警告] Llama模型未安装，将使用备用模式
        set AI_MODE=FALLBACK
    )
) else (
    echo [警告] Ollama服务未启动，将使用备用模式
    set AI_MODE=FALLBACK
)

echo 检查OpenAI API配置...
if exist ".env" (
    findstr "OPENAI_API_KEY" .env | findstr /v "your_openai_api_key_here" >nul
    if %errorlevel% equ 0 (
        echo [成功] OpenAI API已配置
        if "%AI_MODE%"=="FALLBACK" set AI_MODE=OPENAI
    ) else (
        echo [警告] OpenAI API未配置
    )
) else (
    echo [警告] 环境配置文件不存在
)

echo.
echo AI模型状态: %AI_MODE%
if "%AI_MODE%"=="LLAMA" (
    echo   [推荐] 使用Llama本地模型
) else if "%AI_MODE%"=="OPENAI" (
    echo   [云端] 使用OpenAI API
) else (
    echo   [备用] 使用模拟生成
)

echo.
echo 启动后端服务...
start "AI营销文案生成器 - 后端服务" cmd /k "echo 启动后端服务器... && echo AI模式: %AI_MODE% && npm run server"

echo.
echo 等待后端服务启动...
timeout /t 5 /nobreak > nul

echo.
echo 启动前端服务...
start "AI营销文案生成器 - 前端服务" cmd /k "echo 启动前端服务器... && npm run client"

echo.
echo 等待前端服务启动...
timeout /t 8 /nobreak > nul

echo.
echo 服务启动完成！
echo.
echo 服务状态:
echo   [后端] http://localhost:5000
echo   [前端] http://localhost:3000
echo   [AI模式] %AI_MODE%
echo.
echo 使用说明:
echo   1. 打开浏览器访问: http://localhost:3000
echo   2. 输入产品信息
echo   3. 选择风格和平台
echo   4. 生成专业营销文案
echo.

if "%AI_MODE%"=="FALLBACK" (
    echo 升级建议:
    echo   - 安装Ollama获得完整AI功能: install-ollama.bat
    echo   - 配置OpenAI API作为备用: 编辑.env文件
    echo.
)

echo 相关文档:
echo   - README.md - 项目总览
echo   - QUICK_START_FINAL.md - 快速开始
echo   - DEMO_GUIDE.md - 演示指南
echo   - PROJECT_STATUS.md - 项目状态
echo.

echo 准备就绪！按任意键打开浏览器...
pause >nul

echo 正在打开浏览器...
start http://localhost:3000

echo.
echo 提示: 保持此窗口打开以监控服务状态
echo 按Ctrl+C可停止所有服务
pause
