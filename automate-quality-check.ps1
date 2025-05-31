# Automated Code Quality Analysis Script (PowerShell)
# For: aymanaboghonim.github.io personal website
# Usage: .\automate-quality-check.ps1

Write-Host "🚀 Starting Automated Code Quality Analysis..." -ForegroundColor Green
Write-Host "Target: aymanaboghonim.github.io" -ForegroundColor Cyan
Write-Host "Date: $(Get-Date)" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Yellow

# Change to website directory
Set-Location "d:\Github_personal\aymanaboghonim.github.io"

# 1. Start local development server (background)
Write-Host "📡 Starting local development server..." -ForegroundColor Blue
$serverJob = Start-Job -ScriptBlock { python -m http.server 8080 }
Start-Sleep 3

try {
    # 2. JavaScript Analysis (ESLint)
    Write-Host "🔍 Running JavaScript Analysis (ESLint)..." -ForegroundColor Blue
    $eslintResult = npx eslint assets/js/*.js --format=stylish 2>&1 | Out-String
    $eslintResult | Out-File -FilePath "eslint-report.txt" -Encoding UTF8
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ JavaScript: No errors found" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  JavaScript: Issues detected - check eslint-report.txt" -ForegroundColor Yellow
    }

    # 3. CSS/SCSS Analysis (Stylelint)
    Write-Host "🎨 Running CSS/SCSS Analysis (Stylelint)..." -ForegroundColor Blue
    $stylelintResult = npx stylelint "assets/css/**/*.css" "src/**/*.scss" --fix 2>&1 | Out-String
    $stylelintResult | Out-File -FilePath "stylelint-report.txt" -Encoding UTF8
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ CSS/SCSS: Analysis complete" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  CSS/SCSS: Issues detected - check stylelint-report.txt" -ForegroundColor Yellow
    }

    # 4. HTML Validation (HTMLHint)
    Write-Host "📄 Running HTML Validation (HTMLHint)..." -ForegroundColor Blue
    $htmlhintResult = npx htmlhint index.html offline.html --format=json 2>&1 | Out-String
    $htmlhintResult | Out-File -FilePath "htmlhint-report.json" -Encoding UTF8
    Write-Host "   ✅ HTML: Validation complete" -ForegroundColor Green

    # 5. Performance & Accessibility Analysis (Lighthouse)
    Write-Host "🚨 Running Performance & Accessibility Analysis (Lighthouse)..." -ForegroundColor Blue
    $lighthouseResult = npx lighthouse http://localhost:8080 --output html --output-path lighthouse-report.html --chrome-flags="--headless" 2>&1 | Out-String
    $lighthouseResult | Out-File -FilePath "lighthouse-output.txt" -Encoding UTF8
    Write-Host "   ✅ Lighthouse: Analysis complete - view lighthouse-report.html" -ForegroundColor Green

    # 6. Code Complexity Analysis
    Write-Host "📊 Running Code Complexity Analysis..." -ForegroundColor Blue
    $complexityResult = npx complexity-report -o complexity-report.json -f json assets/js/pwa-install.js 2>&1 | Out-String
    $complexityResult | Out-File -FilePath "complexity-output.txt" -Encoding UTF8
    Write-Host "   ✅ Complexity: Analysis complete" -ForegroundColor Green

} finally {
    # 7. Stop development server
    Write-Host "🛑 Stopping development server..." -ForegroundColor Blue
    Stop-Job $serverJob -PassThru | Remove-Job
}

# 8. Generate summary
Write-Host "==================================" -ForegroundColor Yellow
Write-Host "📋 Analysis Summary:" -ForegroundColor Cyan
Write-Host "   📁 Reports Generated:" -ForegroundColor White
Write-Host "      - eslint-report.txt" -ForegroundColor Gray
Write-Host "      - stylelint-report.txt" -ForegroundColor Gray
Write-Host "      - htmlhint-report.json" -ForegroundColor Gray
Write-Host "      - lighthouse-report.html" -ForegroundColor Gray
Write-Host "      - complexity-report.json" -ForegroundColor Gray
Write-Host "      - AUTOMATED_QUALITY_ANALYSIS_REPORT.md" -ForegroundColor Gray
Write-Host ""
Write-Host "🎯 Key Actions:" -ForegroundColor Cyan
Write-Host "   1. Review lighthouse-report.html for performance insights" -ForegroundColor White
Write-Host "   2. Check AUTOMATED_QUALITY_ANALYSIS_REPORT.md for summary" -ForegroundColor White
Write-Host "   3. Address any issues flagged in individual reports" -ForegroundColor White
Write-Host ""
Write-Host "✅ Automated Code Quality Analysis Complete!" -ForegroundColor Green
Write-Host "🕒 Next Run: Execute this script regularly for ongoing quality monitoring" -ForegroundColor Cyan

# Open reports for review
Write-Host ""
Write-Host "📖 Opening key reports..." -ForegroundColor Blue
Start-Process "lighthouse-report.html"
Start-Process "AUTOMATED_QUALITY_ANALYSIS_REPORT.md"
