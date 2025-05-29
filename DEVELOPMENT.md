# Development & Deployment Guide
## Ayman Aboghonim's Personal Blog

This guide covers local development setup, testing, and deployment for your Jekyll-based blog.

## 🚀 Quick Start

### Option 1: GitHub Codespaces (Recommended)
1. Go to your repository on GitHub
2. Click "Code" → "Codespaces" → "Create codespace"
3. Wait for the environment to load
4. Run: `bundle install && bundle exec jekyll serve`
5. Open the preview URL to see your site

### Option 2: Local Development with Ruby

#### Windows Setup
1. **Install Ruby:**
   - Download from [RubyInstaller](https://rubyinstaller.org/)
   - Choose Ruby+Devkit 3.1.x (x64)
   - Run the installer and follow prompts

2. **Install Jekyll and dependencies:**
   ```bash
   gem install jekyll bundler
   cd path/to/aymanaboghonim.github.io
   bundle install
   ```

3. **Run locally:**
   ```bash
   bundle exec jekyll serve
   # or with live reload:
   bundle exec jekyll serve --livereload
   ```

4. **Open in browser:**
   ```
   http://localhost:4000
   ```

#### macOS/Linux Setup
```bash
# Install rbenv (Ruby version manager)
brew install rbenv ruby-build  # macOS
# or for Ubuntu/Debian:
# sudo apt update && sudo apt install rbenv

# Install Ruby
rbenv install 3.1.0
rbenv global 3.1.0

# Install Jekyll
gem install jekyll bundler
cd path/to/aymanaboghonim.github.io
bundle install
bundle exec jekyll serve
```

## 🔧 Development Workflow

### Making Changes
1. Edit files in your preferred editor
2. Jekyll will automatically rebuild (with `--livereload`)
3. Refresh browser to see changes
4. Commit and push to GitHub when ready

### Testing Before Deployment
```bash
# Build site (check for errors)
bundle exec jekyll build

# Serve locally
bundle exec jekyll serve --drafts

# Check HTML validity (optional)
bundle exec htmlproofer ./_site
```

## 📱 PWA Features

### Current Implementation
- ✅ **Service Worker**: Offline functionality with smart caching
- ✅ **Web App Manifest**: Install prompts and app-like behavior  
- ✅ **Icons**: All required sizes (72px to 512px) generated
- ✅ **Offline Page**: Custom offline experience with navigation
- ✅ **Performance Optimization**: Asset caching and compression

### Testing PWA Features
1. **Open Developer Tools** (F12)
2. **Application Tab** → Manifest / Service Workers
3. **Lighthouse Tab** → PWA audit
4. **Test offline**: Network tab → Offline checkbox

### Install as App
- Desktop: Chrome → Three dots → "Install Ayman Blog"  
- Mobile: "Add to Home Screen" prompt should appear

## 🛠️ Maintenance Tasks

### Update Dependencies
```bash
bundle update
```

### Regenerate Icons (if needed)
```bash
python create_icons.py
```

### Clear Jekyll Cache
```bash
bundle exec jekyll clean
```

### Performance Check
- Run Lighthouse audit in Chrome DevTools
- Check Core Web Vitals in Google Search Console
- Monitor loading times with built-in performance.js

## 📊 Analytics & Monitoring

### GitHub Pages Analytics
- Check repository Insights → Traffic
- Monitor visitor patterns and popular content

### Performance Monitoring  
- Google Search Console integration
- Core Web Vitals tracking via performance.js
- Lighthouse CI for automated audits

## 🚢 Deployment

### Automatic Deployment (Current Setup)
1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Site updates in ~2-5 minutes
4. Check deployment status in repository Actions tab

### Manual Deployment Check
```bash
# Validate all files before deployment
python validate_blog.py
```

## 📝 Content Guidelines

### Writing New Posts
1. Create file: `_posts/YYYY-MM-DD-title.md`
2. Add front matter:
   ```yaml
   ---
   title: "Your Post Title"
   date: 2024-01-01 12:00:00 +0000
   categories: [AI, Career, Development]
   tags: [machine-learning, tips, coding]
   description: "Brief description for SEO"
   ---
   ```
3. Write content in Markdown
4. Test locally before pushing

### SEO Best Practices
- Use descriptive titles and headings
- Add meta descriptions
- Optimize images (use WebP when possible)
- Include internal links between posts
- Use structured data (schema.org)

## 🐛 Troubleshooting

### Common Issues

**Jekyll won't start:**
```bash
bundle install --redownload
bundle exec jekyll clean
bundle exec jekyll serve
```

**CSS not loading:**
- Check `_config.yml` for correct theme setting
- Clear browser cache
- Rebuild site: `jekyll clean && jekyll build`

**PWA not installing:**
- Check manifest.json syntax
- Ensure HTTPS is working
- Verify all icon files exist
- Check browser console for errors

**Slow site performance:**
- Optimize images (use imageoptim.com)
- Enable GZIP compression
- Minimize JavaScript and CSS
- Use WebP images where possible

### Getting Help
- Jekyll docs: https://jekyllrb.com/docs/
- Chirpy theme: https://github.com/cotes2020/jekyll-theme-chirpy
- GitHub Pages: https://docs.github.com/en/pages

## 📋 File Structure Reference

```
aymanaboghonim.github.io/
├── _config.yml          # Jekyll configuration
├── _posts/              # Blog posts
├── _tabs/               # Navigation pages
├── assets/
│   ├── css/style.scss   # Custom styles
│   ├── images/          # Images and icons
│   └── js/              # JavaScript files
├── manifest.json        # PWA manifest
├── sw.js               # Service worker
├── offline.html        # Offline page
└── create_icons.py     # Icon generator script
```

---

**Last Updated:** January 2024  
**Blog Version:** v1.0.0  
**Jekyll Theme:** Chirpy
