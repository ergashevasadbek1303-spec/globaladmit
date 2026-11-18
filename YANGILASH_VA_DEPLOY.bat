@echo off
chcp 65001 >nul
title GlobalAdmit - Yangilash va GitHub'ga yuklash
echo ========================================================
echo       GlobalAdmit: Yangilash va Deploy Qilish
echo ========================================================
echo.

set "ROOT_DIR=%~dp0"

echo [1/4] Frontend yig'ilmoqda (build)...
cd /d "%ROOT_DIR%frontend"
call npm run build
if %ERRORLEVEL% neq 0 (
    echo [XATO] Frontend build qilishda xatolik yuz berdi!
    pause
    exit /b 1
)

copy /y "%ROOT_DIR%frontend\dist\index.html" "%ROOT_DIR%frontend\dist\404.html" >nul

echo.
echo [2/4] Asosiy kodlar GitHub main branchga yuklanmoqda...
cd /d "%ROOT_DIR%"
git add -A
git commit -m "Auto-update: Latest changes from workspace"
git push origin main

echo.
echo [3/4] Jonli demo (GitHub Pages) yangilanmoqda...
cd /d "%ROOT_DIR%frontend\dist"
if exist .git rd /s /q .git
git init -b gh-pages >nul
git add -A
git commit -m "Auto-deploy to GitHub Pages" >nul
git remote add origin https://github.com/ergashevasadbek1303-spec/globaladmit.git
git push -f origin gh-pages

if exist .git rd /s /q .git

echo.
echo ========================================================
echo  [MUVAFFAQIYATLI] Hammasi GitHub'ga yangilandi!
echo.
echo  - Kodlar: https://github.com/ergashevasadbek1303-spec/globaladmit
echo  - Jonli Demo: https://ergashevasadbek1303-spec.github.io/globaladmit/
echo.
echo  * QR kodlar o'zgarmaydi va har doim eng so'nggi
echo    yangilangan versiyani ochadi!
echo ========================================================
echo.
pause
