@echo off
echo ====================================================
echo     GlobalAdmit loyihasini GitHubga yuklash
echo ====================================================

if exist "%~dp0.git" (
    cd /d "%~dp0"
) else if exist "%~dp0..\globaladmit\.git" (
    cd /d "%~dp0..\globaladmit"
)

echo Joriy papka: %CD%
git remote remove origin 2>nul
git remote add origin https://github.com/ergashevasadbek1303-spec/globaladmit.git
git branch -M main

echo.
echo GitHubga yuklanmoqda (Brauzer ochilsa, GitHub hisobingizga ruxsat bering)...
git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo ====================================================
    echo [MUVAFFAQIYATLI] Loyiha GitHubga yuklandi!
    echo Havola: https://github.com/ergashevasadbek1303-spec/globaladmit
    echo ====================================================
) else (
    echo.
    echo [XATOLIK] Yuklashda xatolik yuz berdi.
)
pause
