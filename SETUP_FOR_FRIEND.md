# Invoice Generator - Setup Guide

## 📋 What You Need

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Choose the "LTS" version (recommended)

## 🚀 Quick Setup

### Step 1: Install Node.js
1. Go to https://nodejs.org/
2. Download and install the LTS version
3. Restart your computer after installation

### Step 2: Get the App
1. Copy the entire `nextjs-invoice-generator` folder to your computer
2. Place it somewhere easy to find (like Desktop or Documents)

### Step 3: Install Dependencies
1. Open Command Prompt (Windows) or Terminal (Mac/Linux)
2. Navigate to the app folder:
   ```bash
   cd path/to/nextjs-invoice-generator
   ```
3. Install required packages:
   ```bash
   npm install
   ```

### Step 4: Start the App
1. In the same terminal, run:
   ```bash
   npm run dev
   ```
2. Open your web browser and go to: http://localhost:3000
3. The invoice generator should now be running!

## 🎯 How to Use

### Creating an Invoice
1. **Basic Details**: Fill in invoice number, date, and period
2. **Contact Details**: Enter your info and customer info
3. **Items**: Add services/products with quantities and prices
4. **Tax Settings**: Choose between 19% VAT or tax-exempt status
5. **Generate PDF**: Click "Download PDF" to create your invoice

### Key Features
- ✅ **Auto-numbering**: Invoice numbers increment automatically
- ✅ **German format**: Dates in dd.mm.yyyy format
- ✅ **Tax options**: 19% VAT or "nicht umsatzsteuerpflichtig nach §19 UStG"
- ✅ **Professional PDFs**: With your Coachify logo
- ✅ **Data persistence**: Your settings are saved locally

## 🔧 Troubleshooting

### "npm is not recognized"
- Node.js isn't installed properly
- Restart your computer after installing Node.js
- Try reinstalling Node.js

### "Port 3000 is already in use"
- Another app is using port 3000
- Try: `npm run dev -- --port 3001`
- Then go to: http://localhost:3001

### PDF Generation Issues
- Make sure you're using a modern browser (Chrome, Firefox, Edge)
- Check that the Coachify logo file is in the public folder

## 📁 Important Files

- `public/Coachify_Logo_gesamt_gro.PNG` - Your logo (don't delete!)
- `lib/constants.ts` - Your default company information
- Invoice data is saved in your browser's local storage

## 🆘 Need Help?

If something doesn't work:
1. Close the terminal and try again
2. Make sure Node.js is properly installed
3. Check that all files are in the correct folder
4. Contact Kevin if you need assistance

## 🎉 You're Ready!

Once everything is running, you can:
- Create professional invoices
- Generate PDFs with your branding
- Track invoice numbers automatically
- Handle both taxable and tax-exempt invoices

Enjoy using your new invoice generator! 🚀