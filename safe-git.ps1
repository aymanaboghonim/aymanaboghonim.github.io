# Safe Git Operations Script - Handles Windows file locking issues
# Usage Examples:
#   .\safe-git.ps1 add .
#   .\safe-git.ps1 commit -m "Your message"
#   .\safe-git.ps1 push origin main

param(
    [Parameter(ValueFromRemainingArguments)]
    [string[]]$GitArgs
)

if (-not $GitArgs) {
    Write-Host "❌ Please provide git arguments" -ForegroundColor Red
    Write-Host "💡 Examples:" -ForegroundColor Cyan
    Write-Host "   .\safe-git.ps1 add ." -ForegroundColor Gray
    Write-Host "   .\safe-git.ps1 commit -m 'Your message'" -ForegroundColor Gray
    Write-Host "   .\safe-git.ps1 push origin main" -ForegroundColor Gray
    exit 1
}

$gitCommand = "git $($GitArgs -join ' ')"

Write-Host "🔒 Safe Git Operation: $gitCommand" -ForegroundColor Yellow
Write-Host "=" * 50 -ForegroundColor Gray

# Step 1: Pre-git safety check
Write-Host "1️⃣ Pre-operation safety check..." -ForegroundColor Cyan

# Stop all development processes
$processesToStop = @("node", "esbuild", "npm", "yarn", "pnpm", "vite")
$stoppedAny = $false

foreach ($process in $processesToStop) {
    $runningProcesses = Get-Process -Name $process -ErrorAction SilentlyContinue
    if ($runningProcesses) {
        Write-Host "   🔹 Stopping $($runningProcesses.Count) $process process(es)" -ForegroundColor Gray
        $runningProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
        $stoppedAny = $true
    }
}

if ($stoppedAny) {
    Write-Host "   ⏳ Waiting for processes to terminate..." -ForegroundColor Gray
    Start-Sleep -Seconds 3
} else {
    Write-Host "   ✅ No development processes running" -ForegroundColor Green
}

# Step 2: Execute git command
Write-Host "2️⃣ Executing git operation..." -ForegroundColor Cyan
Write-Host "   📝 $gitCommand" -ForegroundColor Gray

Invoke-Expression $gitCommand

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Git operation completed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Git operation failed with exit code: $LASTEXITCODE" -ForegroundColor Red
}

# Step 3: Post-operation status
Write-Host "3️⃣ Current repository status:" -ForegroundColor Cyan
git status --short

Write-Host "=" * 50 -ForegroundColor Gray
Write-Host "🎯 Safe git operation completed!" -ForegroundColor Green
