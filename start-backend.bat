@echo off
echo ========================================
echo    GlobalAdmit Backend ishga tushmoqda
echo ========================================
cd /d "%~dp0backend"
if not exist .env (
    echo XATO: .env fayli topilmadi!
    echo .env.example faylidan nusxa ko'chiring va SECRET_KEY ni o'zgartiring.
    pause
    exit /b 1
)
uvicorn main:app --reload --port 8000
pause
