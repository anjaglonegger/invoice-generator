@echo off
echo Creating distribution package for your friend...
echo.

REM Create a clean distribution folder
if exist "invoice-generator-distribution" rmdir /s /q "invoice-generator-distribution"
mkdir "invoice-generator-distribution"

REM Copy necessary files
echo Copying application files...
xcopy /E /I /Q "app" "invoice-generator-distribution\app\"
xcopy /E /I /Q "components" "invoice-generator-distribution\components\"
xcopy /E /I /Q "context" "invoice-generator-distribution\context\"
xcopy /E /I /Q "lib" "invoice-generator-distribution\lib\"
xcopy /E /I /Q "types" "invoice-generator-distribution\types\"
xcopy /E /I /Q "utils" "invoice-generator-distribution\utils\"
xcopy /E /I /Q "public" "invoice-generator-distribution\public\"

REM Copy configuration files
copy "package.json" "invoice-generator-distribution\"
copy "next.config.ts" "invoice-generator-distribution\"
copy "tsconfig.json" "invoice-generator-distribution\"
copy "tailwind.config.ts" "invoice-generator-distribution\"
copy "postcss.config.mjs" "invoice-generator-distribution\"
copy "components.json" "invoice-generator-distribution\"

REM Copy startup files
copy "start-invoice-generator.bat" "invoice-generator-distribution\"
copy "start-invoice-generator.ps1" "invoice-generator-distribution\"
copy "DESKTOP_SETUP.md" "invoice-generator-distribution\README.md"

echo.
echo ✅ Distribution package created in 'invoice-generator-distribution' folder
echo.
echo Instructions for your friend:
echo 1. Copy the 'invoice-generator-distribution' folder to their computer
echo 2. Make sure they have Node.js installed (https://nodejs.org)
echo 3. Double-click 'start-invoice-generator.bat' to run the app
echo 4. Create a desktop shortcut to the .bat file for easy access
echo.
echo The app will run locally on their computer - no internet required!
echo.
pause