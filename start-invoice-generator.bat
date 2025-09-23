@echo off
title Invoice Generator
color 0A
echo.
echo  ╔══════════════════════════════════════╗
echo  ║        INVOICE GENERATOR             ║
echo  ║        Rechnungs-Generator           ║
echo  ╚══════════════════════════════════════╝
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo 👉 Go to: https://nodejs.org
    echo 👉 Download the LTS version
    echo 👉 Install with default settings
    echo 👉 Restart your computer
    echo 👉 Then run this file again
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found!
echo.

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies (first time setup)...
    echo This may take a few minutes...
    echo.
    call npm install
    if errorlevel 1 (
        echo ❌ Installation failed!
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed!
    echo.
)

echo 🚀 Starting Invoice Generator...
echo.
echo The app will open in your browser at:
echo 👉 http://localhost:3000
echo.
echo ⚠️  Keep this window open while using the app
echo ⚠️  Close this window to stop the app
echo.

REM Start the application
start "" "http://localhost:3000"
call npm run build >nul 2>&1
call npm start

echo.
echo App stopped. Press any key to exit...
pause >nul