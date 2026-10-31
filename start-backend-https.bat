@echo off
echo ====================================================
echo    GlobalAdmit HTTPS Xavfsiz Backend Server
echo ====================================================
cd /d "%~dp0backend"
if not exist .env (
    echo XATO: .env fayli topilmadi!
    pause
    exit /b 1
)
python run_https.py
pause
