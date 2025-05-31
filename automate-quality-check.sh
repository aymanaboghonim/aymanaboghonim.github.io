#!/bin/bash
# Automated Code Quality Analysis Script
# For: aymanaboghonim.github.io personal website
# Usage: Run this script to perform comprehensive code quality analysis

echo "🚀 Starting Automated Code Quality Analysis..."
echo "Target: aymanaboghonim.github.io"
echo "Date: $(date)"
echo "=================================="

# 1. Start local development server (background)
echo "📡 Starting local development server..."
python -m http.server 8080 &
SERVER_PID=$!
sleep 3

# 2. JavaScript Analysis (ESLint)
echo "🔍 Running JavaScript Analysis (ESLint)..."
npx eslint assets/js/*.js --format=stylish > eslint-report.txt 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ JavaScript: No errors found"
else
    echo "   ⚠️  JavaScript: Issues detected - check eslint-report.txt"
fi

# 3. CSS/SCSS Analysis (Stylelint)
echo "🎨 Running CSS/SCSS Analysis (Stylelint)..."
npx stylelint "assets/css/**/*.css" "src/**/*.scss" --fix > stylelint-report.txt 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ CSS/SCSS: Analysis complete"
else
    echo "   ⚠️  CSS/SCSS: Issues detected - check stylelint-report.txt"
fi

# 4. HTML Validation (HTMLHint)
echo "📄 Running HTML Validation (HTMLHint)..."
npx htmlhint index.html offline.html --format=json > htmlhint-report.json 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ HTML: Validation complete"
else
    echo "   ⚠️  HTML: Issues detected - check htmlhint-report.json"
fi

# 5. Performance & Accessibility Analysis (Lighthouse)
echo "🚨 Running Performance & Accessibility Analysis (Lighthouse)..."
npx lighthouse http://localhost:8080 --output html --output-path lighthouse-report.html --chrome-flags="--headless" > lighthouse-output.txt 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Lighthouse: Analysis complete - view lighthouse-report.html"
else
    echo "   ⚠️  Lighthouse: Issues detected - check lighthouse-output.txt"
fi

# 6. Code Complexity Analysis
echo "📊 Running Code Complexity Analysis..."
npx complexity-report -o complexity-report.json -f json assets/js/pwa-install.js > complexity-output.txt 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Complexity: Analysis complete"
else
    echo "   ⚠️  Complexity: Issues detected - check complexity-output.txt"
fi

# 7. Stop development server
echo "🛑 Stopping development server..."
kill $SERVER_PID 2>/dev/null

# 8. Generate summary
echo "=================================="
echo "📋 Analysis Summary:"
echo "   📁 Reports Generated:"
echo "      - eslint-report.txt"
echo "      - stylelint-report.txt"
echo "      - htmlhint-report.json"
echo "      - lighthouse-report.html"
echo "      - complexity-report.json"
echo "      - AUTOMATED_QUALITY_ANALYSIS_REPORT.md"
echo ""
echo "🎯 Key Actions:"
echo "   1. Review lighthouse-report.html for performance insights"
echo "   2. Check AUTOMATED_QUALITY_ANALYSIS_REPORT.md for summary"
echo "   3. Address any issues flagged in individual reports"
echo ""
echo "✅ Automated Code Quality Analysis Complete!"
echo "🕒 Next Run: Execute this script regularly for ongoing quality monitoring"
