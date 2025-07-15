@echo off
echo Starting local development server...
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Server will start at http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    start http://localhost:8000
    python -m http.server 8000
) else (
    REM Check if Node.js is available
    node --version >nul 2>&1
    if %errorlevel% == 0 (
        echo Installing serve package...
        npm install -g serve
        echo Server will start at http://localhost:3000
        echo.
        echo Press Ctrl+C to stop the server
        echo.
        start http://localhost:3000
        serve -s . -l 3000
    ) else (
        echo Please install Python or Node.js to run the development server.
        echo.
        pause
    )
)