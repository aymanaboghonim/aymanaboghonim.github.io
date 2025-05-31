# Enhanced Automation with UX/UI Testing (PowerShell)
# For: aymanaboghonim.github.io personal website
# Usage: .\enhanced-ux-testing.ps1 [weekly|monthly|deployment]

param(
    [string]$TestType = "weekly"
)

Write-Host "🚀 Starting Enhanced UX/UI Quality Analysis..." -ForegroundColor Green
Write-Host "Test Type: $TestType" -ForegroundColor Cyan
Write-Host "Target: aymanaboghonim.github.io" -ForegroundColor Cyan
Write-Host "Date: $(Get-Date)" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Yellow

# Change to website directory
Set-Location "d:\Github_personal\aymanaboghonim.github.io"

# Start local development server
Write-Host "📡 Starting local development server..." -ForegroundColor Blue
$serverJob = Start-Job -ScriptBlock { python -m http.server 8080 }
Start-Sleep 3

try {
    switch ($TestType) {
        "deployment" {
            Write-Host "⚡ DEPLOYMENT TESTING (Fast)" -ForegroundColor Yellow
            
            # Quick ESLint check
            Write-Host "🔍 Quick JavaScript check..." -ForegroundColor Blue
            npx eslint assets/js/*.js --max-warnings 0 --quiet
            
            # Quick CSS check
            Write-Host "🎨 Quick CSS check..." -ForegroundColor Blue
            npx stylelint "assets/css/**/*.css" --quiet
            
            # Performance-only Lighthouse
            Write-Host "⚡ Performance check..." -ForegroundColor Blue
            npx lighthouse http://localhost:8080 --only-categories=performance --output=json --output-path=performance-quick.json --quiet --chrome-flags="--headless"
            
            Write-Host "✅ Deployment checks complete!" -ForegroundColor Green
        }
        
        "weekly" {
            Write-Host "📅 WEEKLY COMPREHENSIVE TESTING" -ForegroundColor Yellow
            
            # Full quality analysis
            Write-Host "🔍 Running full quality analysis..." -ForegroundColor Blue
            npx eslint assets/js/*.js --format=stylish > eslint-weekly.txt 2>&1
            npx stylelint "assets/css/**/*.css" "src/**/*.scss" --fix > stylelint-weekly.txt 2>&1
            npx htmlhint index.html offline.html --format=json > htmlhint-weekly.json 2>&1
            
            # Desktop and Mobile Lighthouse
            Write-Host "🖥️ Desktop performance analysis..." -ForegroundColor Blue
            npx lighthouse http://localhost:8080 --preset=desktop --output=html --output-path=lighthouse-desktop-weekly.html --chrome-flags="--headless" --quiet
            
            Write-Host "📱 Mobile performance analysis..." -ForegroundColor Blue
            npx lighthouse http://localhost:8080 --preset=mobile --output=html --output-path=lighthouse-mobile-weekly.html --chrome-flags="--headless" --quiet
            
            # Core Web Vitals extraction
            Write-Host "📊 Extracting Core Web Vitals..." -ForegroundColor Blue
            npx lighthouse http://localhost:8080 --output=json --output-path=core-web-vitals.json --chrome-flags="--headless" --quiet
            
            Write-Host "✅ Weekly analysis complete!" -ForegroundColor Green
        }
        
        "monthly" {
            Write-Host "📆 MONTHLY DEEP UX/UI ANALYSIS" -ForegroundColor Yellow
            
            # All weekly tests first
            Write-Host "Running weekly tests as baseline..." -ForegroundColor Blue
            & "$PSScriptRoot\enhanced-ux-testing.ps1" "weekly"
            
            # Visual regression setup (if not exists)
            if (!(Test-Path "backstop.json")) {
                Write-Host "🎨 Setting up visual regression testing..." -ForegroundColor Blue
                npx backstop init
            }
            
            # Multi-viewport testing
            Write-Host "📱 Multi-device viewport testing..." -ForegroundColor Blue
            $viewports = @("375x667", "768x1024", "1920x1080")
            foreach ($viewport in $viewports) {
                $size = $viewport.Split('x')
                npx lighthouse http://localhost:8080 --output=json --output-path="lighthouse-${viewport}.json" --chrome-flags="--headless --window-size=$($size[0]),$($size[1])" --quiet
            }
            
            # Accessibility deep dive
            Write-Host "♿ Accessibility comprehensive check..." -ForegroundColor Blue
            npx lighthouse http://localhost:8080 --only-categories=accessibility --output=html --output-path=accessibility-deep.html --chrome-flags="--headless" --quiet
            
            # SEO comprehensive analysis
            Write-Host "🔍 SEO comprehensive analysis..." -ForegroundColor Blue
            npx lighthouse http://localhost:8080 --only-categories=seo --output=html --output-path=seo-analysis.html --chrome-flags="--headless" --quiet
            
            Write-Host "✅ Monthly deep analysis complete!" -ForegroundColor Green
        }
    }
    
    # Generate summary report
    Write-Host "📋 Generating summary report..." -ForegroundColor Blue
    $timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
    $summaryReport = @"
# UX/UI Testing Summary Report
**Test Type:** $TestType
**Date:** $(Get-Date)
**Status:** ✅ COMPLETED

## Files Generated:
"@
    
    # List generated files based on test type
    $generatedFiles = Get-ChildItem -Name "*$TestType*", "*lighthouse*", "*eslint*", "*stylelint*" | Where-Object { $_.LastWriteTime -gt (Get-Date).AddHours(-1) }
    foreach ($file in $generatedFiles) {
        $summaryReport += "`n- $file"
    }
    
    $summaryReport | Out-File -FilePath "ux-testing-summary-$timestamp.txt" -Encoding UTF8
    
} finally {
    # Stop development server
    Write-Host "🛑 Stopping development server..." -ForegroundColor Blue
    Stop-Job $serverJob -PassThru | Remove-Job
}

# Final summary
Write-Host "==================================" -ForegroundColor Yellow
Write-Host "📊 UX/UI Testing Complete!" -ForegroundColor Green
Write-Host "Test Type: $TestType" -ForegroundColor Cyan
Write-Host "🔍 Review generated reports for insights" -ForegroundColor White

# Open key reports based on test type
if ($TestType -eq "monthly") {
    Write-Host "📖 Opening comprehensive reports..." -ForegroundColor Blue
    Start-Process "lighthouse-desktop-weekly.html"
    Start-Process "lighthouse-mobile-weekly.html"
    Start-Process "accessibility-deep.html"
}
elseif ($TestType -eq "weekly") {
    Write-Host "📖 Opening weekly reports..." -ForegroundColor Blue
    Start-Process "lighthouse-desktop-weekly.html"
    Start-Process "lighthouse-mobile-weekly.html"
}
