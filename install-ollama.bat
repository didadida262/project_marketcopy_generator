@echo off
echo 🚀 安装Ollama和Llama模型...
echo.

echo 1. 安装Ollama...
winget install Ollama.Ollama
if %errorlevel% neq 0 (
    echo �?Ollama安装失败，请手动下载安装
    echo 下载地址: https://ollama.ai/download
    pause
    exit /b 1
)

echo �?Ollama安装成功
echo.

echo 2. 启动Ollama服务...
start "Ollama Service" cmd /c "ollama serve"
timeout /t 3 /nobreak >nul

echo 3. 下载Llama模型...
echo 正在下载llama3.1:8b模型，这可能需要几分钟...
ollama pull llama3.1:8b
if %errorlevel% neq 0 (
    echo �?模型下载失败，请检查网络连�?
    pause
    exit /b 1
)

echo �?模型下载成功
echo.

echo 4. 测试Llama功能...
node test-llama.js

echo.
echo 🎉 Ollama安装和配置完成！
echo 现在可以使用完整的Llama AI功能�?
pause
