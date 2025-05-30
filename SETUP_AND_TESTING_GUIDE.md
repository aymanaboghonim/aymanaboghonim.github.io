# AL-FOLIO SETUP AND TESTING SCRIPT
# Installation and Performance Validation Guide

## STEP 1: INSTALL RUBY AND JEKYLL (Windows)

### Option A: Using RubyInstaller (Recommended)
```powershell
# Download and install Ruby from https://rubyinstaller.org/
# Choose "Ruby+Devkit 3.1.X (x64)" for Windows

# After installation, open a new PowerShell window and run:
gem install jekyll bundler

# Verify installation
ruby --version
jekyll --version
bundle --version
```

### Option B: Using Chocolatey
```powershell
# If you have Chocolatey installed:
choco install ruby
gem install jekyll bundler
```

### Option C: Using Windows Subsystem for Linux (WSL)
```bash
# In WSL Ubuntu:
sudo apt update
sudo apt install ruby-full build-essential zlib1g-dev
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
gem install jekyll bundler
```

## STEP 2: INSTALL DEPENDENCIES AND RUN SITE

### After Ruby is installed:
```powershell
# Navigate to your blog directory
cd "d:\Github_personal\aymanaboghonim.github.io"

# Install dependencies
bundle install

# Start the development server
bundle exec jekyll serve --livereload --drafts

# Your site will be available at: http://localhost:4000
```

## STEP 3: PERFORMANCE TESTING WITH BROWSER TOOLS

### Chrome DevTools Testing
1. **Open Chrome** and navigate to `http://localhost:4000`
2. **Open DevTools** (F12)
3. **Run Lighthouse Audit**:
   - Go to "Lighthouse" tab
   - Check: Performance, Accessibility, Best Practices, SEO
   - Click "Analyze page load"
   - Target scores: 90+ in all categories

### Core Web Vitals Testing
```javascript
// Paste in Chrome DevTools Console:
function measureWebVitals() {
    const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            console.log(`${entry.name}: ${entry.value}ms`);
        });
    });
    observer.observe({entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift']});
}
measureWebVitals();
```

### Mobile Responsiveness Test
```javascript
// Test different screen sizes in Chrome DevTools:
const breakpoints = [
    {name: 'Mobile', width: 375, height: 667},
    {name: 'Tablet', width: 768, height: 1024},
    {name: 'Desktop', width: 1200, height: 800}
];

breakpoints.forEach(bp => {
    console.log(`Testing ${bp.name}: ${bp.width}x${bp.height}`);
    // Use Chrome DevTools Device Toolbar to test each size
});
```

## STEP 4: AUTOMATED TESTING SETUP

### Install Testing Tools
```powershell
# Install Node.js first, then:
npm install -g lighthouse
npm install -g pa11y
npm install -g @lhci/cli

# Run automated tests:
lighthouse http://localhost:4000 --view
pa11y http://localhost:4000
```

### Performance Monitoring Script
```powershell
# Create automated testing script
function Test-BlogPerformance {
    Write-Host "Testing al-folio blog performance..." -ForegroundColor Cyan
    
    # Test page load time
    $start = Get-Date
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4000" -TimeoutSec 10
        $loadTime = (Get-Date) - $start
        Write-Host "✅ Page Load Time: $($loadTime.TotalMilliseconds)ms" -ForegroundColor Green
        
        if ($loadTime.TotalMilliseconds -lt 3000) {
            Write-Host "✅ Performance: EXCELLENT (< 3s)" -ForegroundColor Green
        } elseif ($loadTime.TotalMilliseconds -lt 5000) {
            Write-Host "⚠️ Performance: GOOD (< 5s)" -ForegroundColor Yellow
        } else {
            Write-Host "❌ Performance: NEEDS IMPROVEMENT (> 5s)" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "❌ Error testing performance: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Usage: Test-BlogPerformance
```

## STEP 5: DESIGN VALIDATION CHECKLIST

### Visual Design ✅
- [ ] **Typography**: Clean, readable fonts (16px+ base size)
- [ ] **Color Contrast**: WCAG AA compliance (4.5:1 ratio minimum)
- [ ] **White Space**: Proper spacing and visual hierarchy
- [ ] **Brand Consistency**: Professional color scheme
- [ ] **Layout**: Clean academic-style design

### Responsiveness ✅
- [ ] **Mobile (375px)**: Single column, touch-friendly navigation
- [ ] **Tablet (768px)**: Optimized layout, proper spacing
- [ ] **Desktop (1200px+)**: Full feature layout, sidebar utilization
- [ ] **Touch Targets**: Minimum 44px for interactive elements

### Performance ✅
- [ ] **Page Load**: < 3 seconds on fast connections
- [ ] **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **Image Optimization**: Proper sizing and formats
- [ ] **CSS/JS**: Minified and optimized

### Accessibility ✅
- [ ] **Screen Readers**: Proper semantic HTML
- [ ] **Keyboard Navigation**: Full site accessible without mouse
- [ ] **Alt Text**: All images have descriptive alt attributes
- [ ] **Focus Indicators**: Visible focus states for interactive elements

### SEO ✅
- [ ] **Meta Tags**: Title, description, viewport properly set
- [ ] **Open Graph**: Social media preview optimized
- [ ] **Structured Data**: Schema.org markup for better search results
- [ ] **Sitemap**: XML sitemap generated and accessible

## STEP 6: CONTENT MIGRATION

### Blog Posts Migration
```powershell
# Your existing posts are preserved in _posts/
# Update front matter for al-folio compatibility:

# Before (Chirpy format):
# ---
# title: Post Title
# date: 2024-01-01
# categories: [AI, ML]
# tags: [python, tutorial]
# ---

# After (al-folio format):
# ---
# layout: post
# title: Post Title
# date: 2024-01-01
# description: Brief description for SEO
# tags: ai ml python tutorial
# categories: technical
# ---
```

### Profile Setup
- [ ] **Profile Image**: Add `prof_pic.jpg` to `/assets/img/`
- [ ] **CV**: Update `/data/cv.yml` with your information
- [ ] **Social Links**: Configure in `_config.yml`
- [ ] **About Page**: Customize `/pages/about.md`

## STEP 7: DEPLOYMENT PREPARATION

### GitHub Pages Setup
```yaml
# Add to .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: 3.1
        bundler-cache: true
    - name: Build site
      run: bundle exec jekyll build
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
```

### Pre-deployment Checklist
- [ ] **All tests passing**: Performance, accessibility, validation
- [ ] **Content reviewed**: All pages load correctly
- [ ] **Links working**: Internal and external links verified
- [ ] **Images optimized**: Proper sizes and formats
- [ ] **Analytics configured**: Google Analytics, Search Console

## STEP 8: MONITORING AND OPTIMIZATION

### Continuous Monitoring
```javascript
// Add to Google Analytics for Core Web Vitals tracking
function sendWebVitals() {
  function sendToAnalytics(name, value, id) {
    gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true,
    });
  }

  // Measure and send Core Web Vitals
  import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  });
}

sendWebVitals();
```

## SUCCESS CRITERIA

### Technical KPIs ✅
- **Lighthouse Performance**: 90+
- **Lighthouse Accessibility**: 95+
- **Lighthouse Best Practices**: 95+
- **Lighthouse SEO**: 95+
- **Core Web Vitals**: All metrics in "Good" range

### User Experience ✅
- **Mobile-First**: Excellent mobile experience
- **Fast Loading**: Sub-3-second page loads
- **Accessible**: WCAG AA compliant
- **Professional**: Clean, academic design

Ready to test? Run these commands after installing Ruby:

```powershell
cd "d:\Github_personal\aymanaboghonim.github.io"
bundle install
bundle exec jekyll serve --livereload
```

Then open `http://localhost:4000` and start testing! 🚀
