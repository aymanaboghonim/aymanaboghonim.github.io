# Enhanced Git Cleanup Script for Windows - Handles locked files
# Usage: .\git-cleanup.ps1

Write-Host "🧹 Starting Enhanced Git cleanup process..." -ForegroundColor Yellow

# Step 1: Kill any running processes that might lock files
Write-Host "1️⃣ Stopping all related processes..." -ForegroundColor Cyan
$processesToKill = @("node", "esbuild", "npm", "yarn", "pnpm", "vite")
foreach ($process in $processesToKill) {
    $runningProcesses = Get-Process -Name $process -ErrorAction SilentlyContinue
    if ($runningProcesses) {
        Write-Host "   🔹 Stopping $($runningProcesses.Count) $process process(es)" -ForegroundColor Gray
        $runningProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
    }
}

Start-Sleep -Seconds 3

# Step 2: Remove build artifacts
Write-Host "2️⃣ Removing build artifacts..." -ForegroundColor Cyan
$dirsToRemove = @("node_modules", "dist", "build", ".vite", ".next", ".nuxt")

foreach ($dir in $dirsToRemove) {
    if (Test-Path $dir) {
        Write-Host "   🔹 Removing $dir..." -ForegroundColor Gray
        try {
            Remove-Item -Path $dir -Recurse -Force -ErrorAction Stop
            Write-Host "   ✅ $dir removed successfully" -ForegroundColor Green
        }
        catch {
            Write-Host "   ⚠️ Some files in $dir are locked, trying robocopy method..." -ForegroundColor Yellow
            $tempDir = Join-Path $env:TEMP "empty_$(Get-Random)"
            New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
            robocopy $tempDir $dir /MIR /R:0 /W:0 /NFL /NDL /NJH /NJS | Out-Null
            Remove-Item -Path $tempDir -Force -ErrorAction SilentlyContinue
            Remove-Item -Path $dir -Force -ErrorAction SilentlyContinue
            if (Test-Path $dir) {
                Write-Host "   ❌ $dir still exists, manual removal may be needed" -ForegroundColor Red
            } else {
                Write-Host "   ✅ $dir removed with robocopy" -ForegroundColor Green
            }
        }
    }
}

# Step 3: Clean git untracked files
Write-Host "3️⃣ Cleaning git untracked files..." -ForegroundColor Cyan
git clean -fd --exclude=node_modules --exclude=dist --exclude=build --exclude=.vite

# Step 4: Reset any staged changes
Write-Host "4️⃣ Resetting staged changes..." -ForegroundColor Cyan
git reset --hard

# Step 5: Optional package reinstall
Write-Host "5️⃣ Checking if package reinstall is needed..." -ForegroundColor Cyan
if ((Test-Path "package.json") -and (-not (Test-Path "node_modules"))) {
    $response = Read-Host "🤔 Would you like to reinstall packages? (y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        Write-Host "📦 Installing packages..." -ForegroundColor Cyan
        npm install
    }
}

Write-Host "🎉 Enhanced Git cleanup completed successfully!" -ForegroundColor Green
Write-Host "📋 Current git status:" -ForegroundColor Cyan
git status
