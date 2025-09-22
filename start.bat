@echo off
echo 启动AI营销文案生成器...
echo.

echo 安装后端依赖...
call npm install

echo.
echo 安装前端依赖...
cd client
call npm install
cd ..

echo.
echo 启动后端服务...
start "后端服务" cmd /k "npm run server"

echo.
echo 等待3秒后启动前端服务...
timeout /t 3 /nobreak > nul

echo.
echo 启动前端服务...
start "前端服务" cmd /k "npm run client"

echo.
echo 服务启动完成！
echo 后端服务: http://localhost:5000
echo 前端服务: http://localhost:3000
echo.
pause
