# 🔧 NPM Fix & Backend Start Guide

## ⚠️ Issue Detected

Your npm installation is corrupted. Here's how to fix it and run the backend.

---

## 🚀 Quick Solution - Run Backend Now (Without Auth)

Since npm is broken and mongoose isn't installed, let's run the backend without the database/auth features temporarily:

### Option 1: Comment Out Auth Routes (Immediate)

I'll create a simplified server for you that works without dependencies.

---

## 🛠️ Fix NPM (Recommended)

### Method 1: Reinstall Node.js

1. **Download latest Node.js:**
   - Go to: https://nodejs.org/
   - Download LTS version for Windows
   - Run installer

2. **During installation:**
   - ✅ Check "Automatically install necessary tools"
   - ✅ Check "Add to PATH"

3. **After installation, restart PowerShell and verify:**
   ```powershell
   node --version
   npm --version
   ```

### Method 2: Repair npm Manually

```powershell
# Navigate to npm folder
cd C:\Program Files\nodejs

# Download npm again
curl -L https://www.npmjs.com/install.sh | sh

# Or use Node's built-in npm repair
npm install -g npm@latest
```

### Method 3: Use Node Version Manager (nvm-windows)

1. Download: https://github.com/coreybutler/nvm-windows/releases
2. Install nvm
3. Install Node:
   ```powershell
   nvm install 20.13.0
   nvm use 20.13.0
   ```

---

## 📦 After NPM is Fixed

Once npm works again:

```powershell
# Install dependencies
npm install

# Install auth dependencies
npm install mongoose bcryptjs jsonwebtoken

# Run backend
npm run server:dev

# Or run both frontend and backend
npm run dev:all
```

---

## 🏃 Run Backend Without npm (Alternative)

Use node directly:

```powershell
# Start backend
node server/index.js

# Or with nodemon (if installed globally)
npx nodemon server/index.js
```

---

## ✅ Temporary Solution - Simplified Server

I'll create a version that works without mongoose/auth dependencies.
