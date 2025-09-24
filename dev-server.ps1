# Development Server Management Script
# Run this script to start the development server with proper error handling

Write-Host "🚀 Starting Development Server..." -ForegroundColor Green

# Kill any existing Node processes that might be using the ports
Write-Host "🔧 Cleaning up existing processes..." -ForegroundColor Yellow
taskkill /f /im node.exe 2>$null
taskkill /f /im vite.exe 2>$null

# Wait a moment for processes to close
Start-Sleep -Seconds 2

# Check if port 5173 is available
$portCheck = netstat -ano | findstr :5173
if ($portCheck) {
    Write-Host "⚠️  Port 5173 is in use, Vite will find an alternative port..." -ForegroundColor Yellow
}

# Start the development server
Write-Host "🌐 Starting Vite development server..." -ForegroundColor Green
pnpm run dev

Write-Host "✅ Development server stopped." -ForegroundColor Red