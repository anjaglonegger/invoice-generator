#!/usr/bin/env pwsh

Write-Host ""
Write-Host "╔══════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║        INVOICE GENERATOR             ║" -ForegroundColor Green  
Write-Host "║        Rechnungs-Generator           ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js first:" -ForegroundColor Yellow
    Write-Host "👉 Go to: https://nodejs.org" -ForegroundColor Cyan
    Write-Host "👉 Download the LTS version" -ForegroundColor Cyan
    Write-Host "👉 Install with default settings" -ForegroundColor Cyan
    Write-Host "👉 Restart your computer" -ForegroundColor Cyan
    Write-Host "👉 Then run this file again" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Check if dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies (first time setup)..." -ForegroundColor Yellow
    Write-Host "This may take a few minutes..." -ForegroundColor Yellow
    Write-Host ""
    
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Installation failed!" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    Write-Host "✅ Dependencies installed!" -ForegroundColor Green
    Write-Host ""
}

Write-Host "🚀 Starting Invoice Generator..." -ForegroundColor Cyan
Write-Host ""
Write-Host "The app will open in your browser at:" -ForegroundColor White
Write-Host "👉 http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Keep this window open while using the app" -ForegroundColor Yellow
Write-Host "⚠️  Close this window to stop the app" -ForegroundColor Yellow
Write-Host ""

# Start the application
Start-Process "http://localhost:3000"
npm run build | Out-Null
npm start

Write-Host ""
Write-Host "App stopped. Press any key to exit..." -ForegroundColor Yellow
Read-Host