@echo off
REM Quick start script for Windows
echo ================================
echo   HireLift Server Quick Start
echo ================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/3] Installing dependencies...
    call npm install
    echo.
) else (
    echo [1/3] Dependencies already installed
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo [2/3] Creating .env file from template...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Please edit .env and add your GEMINI_API_KEY
    echo    Get your key from: https://makersuite.google.com/app/apikey
    echo.
    pause
) else (
    echo [2/3] .env file found
    echo.
)

echo [3/3] Starting development servers...
echo.
echo 🚀 Frontend: http://localhost:3000
echo 🚀 Backend:  http://localhost:5000/api
echo.
echo Press Ctrl+C to stop the servers
echo.

REM Start both frontend and backend
npm run dev:all
