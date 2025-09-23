@echo off
echo ========================================
echo    Coachify Invoice Generator
echo ========================================
echo.
echo Starting the invoice generator...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    echo This may take a few minutes on first run...
    echo.
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies!
        echo.
        pause
        exit /b 1
    )
)

echo.
echo Starting the app...
echo The invoice generator will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the app when you're done.
echo.

npm run dev

pause