@echo off
chcp 65001 >nul
title GlobalAdmit - Start Platform
echo ========================================================
echo          GlobalAdmit Platformasi Ishga Tushirilmoqda...
echo ========================================================
echo.

set "ROOT_DIR=%~dp0"

echo [1/3] Backend ishga tushirilmoqda (Port 8000)...
start "GlobalAdmit Backend (Port 8000)" cmd /k "chcp 65001 >nul && cd /d "%ROOT_DIR%backend" && python -m uvicorn main:app --reload --port 8000"

timeout /t 3 /nobreak >nul

echo [2/3] Frontend ishga tushirilmoqda (Port 5173)...
start "GlobalAdmit Frontend (Port 5173)" cmd /k "chcp 65001 >nul && cd /d "%ROOT_DIR%frontend" && npm run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Brauzerda ochilmoqda: http://localhost:5173
start http://localhost:5173

echo.
echo ========================================================
echo  GlobalAdmit muvaffaqiyatli ochildi!
echo  Frontend: http://localhost:5173
echo  Backend:  http://localhost:8000/api/docs
echo ========================================================
echo.
timeout /t 5
