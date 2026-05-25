@echo off
echo === HSE Management System Setup (Windows) ===
echo.
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed. Download from https://nodejs.org
    pause
    exit /b 1
)
echo [1/2] Installing dependencies...
npm install
echo.
echo [2/2] Starting development server...
echo   Open http://localhost:3000 in your browser.
echo.
npm run dev
pause
