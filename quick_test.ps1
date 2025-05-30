#!/usr/bin/env powershell

# AL-FOLIO Quick Test Script
# Run this after installing Ruby to verify everything works

Write-Host "🚀 AL-FOLIO BLOG TESTING SCRIPT" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Test 1: Verify Ruby Installation
Write-Host "`n📍 Step 1: Verifying Ruby installation..." -ForegroundColor Yellow
try {
    $rubyVersion = ruby --version
    Write-Host "✅ Ruby installed: $rubyVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Ruby not found. Please install Ruby first." -ForegroundColor Red
    Write-Host "   Download from: https://rubyinstaller.org/downloads/" -ForegroundColor Yellow
    exit 1
}

# Test 2: Verify Jekyll Installation
Write-Host "`n📍 Step 2: Checking Jekyll..." -ForegroundColor Yellow
try {
    $jekyllVersion = jekyll --version
    Write-Host "✅ Jekyll installed: $jekyllVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Jekyll not found. Installing..." -ForegroundColor Yellow
    gem install jekyll bundler
}

# Test 3: Install Dependencies
Write-Host "`n📍 Step 3: Installing blog dependencies..." -ForegroundColor Yellow
try {
    bundle install
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Some dependencies failed. This might be OK for GitHub Pages." -ForegroundColor Yellow
}

# Test 4: Validate Configuration
Write-Host "`n📍 Step 4: Validating site configuration..." -ForegroundColor Yellow
if (Test-Path "_config.yml") {
    Write-Host "✅ Configuration file found" -ForegroundColor Green
} else {
    Write-Host "❌ Configuration file missing" -ForegroundColor Red
}

# Test 5: Check Essential Directories
Write-Host "`n📍 Step 5: Checking site structure..." -ForegroundColor Yellow
$requiredDirs = @("_layouts", "_includes", "_sass", "assets", "_pages")
foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        Write-Host "✅ $dir directory exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $dir directory missing" -ForegroundColor Red
    }
}

# Test 6: Start Development Server
Write-Host "`n📍 Step 6: Starting development server..." -ForegroundColor Yellow
Write-Host "🔧 Starting Jekyll server with live reload..." -ForegroundColor Cyan
Write-Host "📱 Your blog will be available at: http://localhost:4000" -ForegroundColor Green
Write-Host "🔄 Files will auto-reload when you make changes" -ForegroundColor Green
Write-Host "⏹️  Press Ctrl+C to stop the server" -ForegroundColor Yellow

Write-Host "`n🎯 READY TO LAUNCH! Running jekyll serve..." -ForegroundColor Magenta

# Start Jekyll with live reload and drafts
try {
    bundle exec jekyll serve --livereload --drafts --host 0.0.0.0
} catch {
    Write-Host "`n⚠️  If you see errors above, try these fixes:" -ForegroundColor Yellow
    Write-Host "   1. Run: bundle update" -ForegroundColor White
    Write-Host "   2. Run: bundle exec jekyll serve --trace" -ForegroundColor White
    Write-Host "   3. Check the troubleshooting guide in SETUP_AND_TESTING_GUIDE.md" -ForegroundColor White
}
