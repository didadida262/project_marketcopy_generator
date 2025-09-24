@echo off
echo 修复启动脚本编码问题...
echo.

echo 设置控制台编码为UTF-8...
chcp 65001 >nul

echo 修复start.bat...
powershell -Command "(Get-Content 'start.bat') -replace '🚀', '' -replace '📦', '' -replace '✅', '[成功]' -replace '❌', '[错误]' -replace '⚠️', '[警告]' -replace '🔍', '' -replace '🖥️', '' -replace '🌐', '' -replace '⏳', '' -replace '🎉', '' -replace '📊', '' -replace '🎯', '' -replace '🔧', '' -replace '📚', '' -replace '🚀', '' -replace '💡', '' | Set-Content 'start.bat'"

echo 修复start-smart.bat...
powershell -Command "(Get-Content 'start-smart.bat') -replace '🚀', '' -replace '📦', '' -replace '✅', '[成功]' -replace '❌', '[错误]' -replace '⚠️', '[警告]' -replace '🔍', '' -replace '🖥️', '' -replace '🌐', '' -replace '⏳', '' -replace '🎉', '' -replace '📊', '' -replace '🎯', '' -replace '🔧', '' -replace '📚', '' -replace '🚀', '' -replace '💡', '' | Set-Content 'start-smart.bat'"

echo 修复deploy-local.bat...
powershell -Command "(Get-Content 'deploy-local.bat') -replace '🚀', '' -replace '📦', '' -replace '✅', '[成功]' -replace '❌', '[错误]' -replace '⚠️', '[警告]' -replace '🔍', '' -replace '🖥️', '' -replace '🌐', '' -replace '⏳', '' -replace '🎉', '' -replace '📊', '' -replace '🎯', '' -replace '🔧', '' -replace '📚', '' -replace '🚀', '' -replace '💡', '' | Set-Content 'deploy-local.bat'"

echo 修复test-all.bat...
powershell -Command "(Get-Content 'test-all.bat') -replace '🧪', '' -replace '📋', '' -replace '🔍', '' -replace '✅', '[成功]' -replace '❌', '[错误]' -replace '⚠️', '[警告]' -replace '📊', '' -replace '🚀', '' | Set-Content 'test-all.bat'"

echo 修复install-ollama.bat...
powershell -Command "(Get-Content 'install-ollama.bat') -replace '🚀', '' -replace '✅', '[成功]' -replace '❌', '[错误]' -replace '🎉', '' | Set-Content 'install-ollama.bat'"

echo.
echo 修复完成！
echo 现在可以正常使用启动脚本了
echo.
pause
