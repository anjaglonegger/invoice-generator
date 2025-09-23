# Invoice Generator - Desktop Setup Guide

## Option 1: Simple Desktop Shortcut (Easiest)

### Prerequisites
- Node.js installed (download from https://nodejs.org)

### Setup Steps
1. Copy this entire folder to your friend's computer
2. Double-click `start-invoice-generator.bat`
3. Wait for installation and startup (first time takes a few minutes)
4. The app will open in their default browser at http://localhost:3000
5. Create a desktop shortcut to `start-invoice-generator.bat` for easy access

### Usage
- Double-click the desktop shortcut to start the app
- The app runs locally - no internet required after setup
- Close the command window to stop the app

---

## Option 2: Full Desktop App (Advanced)

### Build Electron App
```bash
npm install
npm run dist
```

This creates a proper desktop application in the `dist` folder that can be installed like any other Windows program.

### Features
- ✅ Desktop shortcut automatically created
- ✅ Start menu entry
- ✅ Proper Windows installer
- ✅ No browser required
- ✅ Professional app experience

---

## Troubleshooting

### If Node.js is not installed:
1. Go to https://nodejs.org
2. Download the LTS version
3. Install with default settings
4. Restart computer
5. Try running the batch file again

### If port 3000 is busy:
- Close other applications that might use port 3000
- Or edit the batch file to use a different port

### For technical users:
- Run `npm run dev` for development mode
- Run `npm run build && npm start` for production mode
- Run `npm run dist` to create desktop installer

---

## What this app does:
- Creates professional German invoices (Rechnungen)
- Generates PDF files
- Works completely offline
- Stores no data online (privacy-friendly)
- Supports proper German tax formatting