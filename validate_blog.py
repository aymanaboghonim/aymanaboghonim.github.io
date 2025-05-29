#!/usr/bin/env python3
"""
Blog Validation Script for Ayman Aboghonim's Personal Blog
Checks configuration, assets, PWA features, and deployment readiness
"""

import json
import os
import sys
from pathlib import Path
import re
import urllib.request
import urllib.error

class BlogValidator:
    def __init__(self, blog_path):
        self.blog_path = Path(blog_path)
        self.errors = []
        self.warnings = []
        self.success_count = 0
        
    def log_success(self, message):
        """Log a successful check"""
        print(f"✅ {message}")
        self.success_count += 1
        
    def log_warning(self, message):
        """Log a warning"""
        print(f"⚠️  {message}")
        self.warnings.append(message)
        
    def log_error(self, message):
        """Log an error"""
        print(f"❌ {message}")
        self.errors.append(message)
        
    def check_required_files(self):
        """Check if all required files exist"""
        print("\n🔍 Checking required files...")
        
        required_files = [
            '_config.yml',
            'manifest.json', 
            'sw.js',
            'offline.html',
            'assets/css/style.scss',
            'assets/js/custom.js',
            'assets/js/performance.js'
        ]
        
        for file_path in required_files:
            full_path = self.blog_path / file_path
            if full_path.exists():
                self.log_success(f"Found {file_path}")
            else:
                self.log_error(f"Missing required file: {file_path}")
                
    def check_pwa_icons(self):
        """Check PWA icon files"""
        print("\n🎨 Checking PWA icons...")
        
        required_sizes = [72, 96, 128, 144, 152, 192, 384, 512]
        icons_dir = self.blog_path / 'assets' / 'images'
        
        if not icons_dir.exists():
            self.log_error("Icons directory not found: assets/images")
            return
            
        for size in required_sizes:
            icon_file = icons_dir / f"icon-{size}x{size}.png"
            if icon_file.exists():
                # Check file size
                file_size = icon_file.stat().st_size
                if file_size > 0:
                    self.log_success(f"Icon {size}x{size} present ({file_size:,} bytes)")
                else:
                    self.log_error(f"Icon {size}x{size} exists but is empty")
            else:
                self.log_error(f"Missing PWA icon: icon-{size}x{size}.png")
                
    def check_manifest_json(self):
        """Validate manifest.json"""
        print("\n📋 Checking manifest.json...")
        
        manifest_path = self.blog_path / 'manifest.json'
        if not manifest_path.exists():
            self.log_error("manifest.json not found")
            return
            
        try:
            with open(manifest_path, 'r', encoding='utf-8') as f:
                manifest = json.load(f)
                
            # Check required fields
            required_fields = ['name', 'short_name', 'start_url', 'display', 'icons']
            for field in required_fields:
                if field in manifest:
                    self.log_success(f"Manifest has required field: {field}")
                else:
                    self.log_error(f"Manifest missing required field: {field}")
                    
            # Check icons reference
            if 'icons' in manifest:
                icon_count = len(manifest['icons'])
                self.log_success(f"Manifest references {icon_count} icons")
                
                # Verify icon files exist
                icons_dir = self.blog_path / 'assets' / 'images'
                for icon in manifest['icons']:
                    if 'src' in icon:
                        icon_path = self.blog_path / icon['src'].lstrip('/')
                        if icon_path.exists():
                            self.log_success(f"Icon file exists: {icon['src']}")
                        else:
                            self.log_error(f"Icon file missing: {icon['src']}")
                            
        except json.JSONDecodeError as e:
            self.log_error(f"Invalid JSON in manifest.json: {e}")
        except Exception as e:
            self.log_error(f"Error reading manifest.json: {e}")
            
    def check_service_worker(self):
        """Check service worker configuration"""
        print("\n⚙️ Checking service worker...")
        
        sw_path = self.blog_path / 'sw.js'
        if not sw_path.exists():
            self.log_error("Service worker not found: sw.js")
            return
            
        try:
            with open(sw_path, 'r', encoding='utf-8') as f:
                sw_content = f.read()
                
            # Check for required components
            checks = [
                ('CACHE_NAME', 'Cache name defined'),
                ('addEventListener.*install', 'Install event handler'),
                ('addEventListener.*activate', 'Activate event handler'), 
                ('addEventListener.*fetch', 'Fetch event handler'),
                ('offline\.html', 'Offline page fallback'),
                ('caches\.open', 'Cache API usage')
            ]
            
            for pattern, description in checks:
                if re.search(pattern, sw_content, re.IGNORECASE):
                    self.log_success(description)
                else:
                    self.log_warning(f"Service worker may be missing: {description}")
                    
        except Exception as e:
            self.log_error(f"Error reading service worker: {e}")
            
    def check_offline_page(self):
        """Check offline page"""
        print("\n📴 Checking offline page...")
        
        offline_path = self.blog_path / 'offline.html'
        if not offline_path.exists():
            self.log_error("Offline page not found: offline.html")
            return
            
        try:
            with open(offline_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Check for basic HTML structure
            checks = [
                ('<html', 'HTML document structure'),
                ('<head', 'HTML head section'),
                ('<title', 'Page title'),
                ('<body', 'HTML body section'),
                ('offline', 'Offline-related content'),
                ('navigator\.onLine', 'Online/offline detection')
            ]
            
            for pattern, description in checks:
                if re.search(pattern, content, re.IGNORECASE):
                    self.log_success(f"Offline page has: {description}")
                else:
                    self.log_warning(f"Offline page missing: {description}")
                    
        except Exception as e:
            self.log_error(f"Error reading offline page: {e}")
            
    def check_config_yml(self):
        """Check Jekyll configuration"""
        print("\n⚙️ Checking _config.yml...")
        
        config_path = self.blog_path / '_config.yml'
        if not config_path.exists():
            self.log_error("Jekyll configuration not found: _config.yml")
            return
            
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Check for important settings
            checks = [
                ('title:', 'Site title configured'),
                ('description:', 'Site description configured'),
                ('url:', 'Site URL configured'),
                ('baseurl:', 'Base URL configured'),
                ('remote_theme:', 'Theme configured'),
                ('timezone:', 'Timezone configured')
            ]
            
            for pattern, description in checks:
                if re.search(pattern, content, re.IGNORECASE):
                    self.log_success(description)
                else:
                    self.log_warning(f"Config may be missing: {description}")
                    
        except Exception as e:
            self.log_error(f"Error reading _config.yml: {e}")
            
    def check_css_scss(self):
        """Check CSS/SCSS files"""
        print("\n🎨 Checking CSS/SCSS...")
        
        style_path = self.blog_path / 'assets' / 'css' / 'style.scss'
        if style_path.exists():
            self.log_success("Main SCSS file found")
            
            try:
                with open(style_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Check for SCSS compilation issues
                if '@import' in content:
                    self.log_success("SCSS imports detected")
                    
                if 'jekyll-theme-chirpy' in content:
                    self.log_warning("Direct theme import found - may cause compilation issues")
                    
            except Exception as e:
                self.log_error(f"Error reading style.scss: {e}")
        else:
            self.log_error("Main SCSS file not found: assets/css/style.scss")
            
    def check_javascript_files(self):
        """Check JavaScript files"""
        print("\n📜 Checking JavaScript files...")
        
        js_files = [
            'assets/js/custom.js',
            'assets/js/performance.js'
        ]
        
        for js_file in js_files:
            js_path = self.blog_path / js_file
            if js_path.exists():
                self.log_success(f"JavaScript file found: {js_file}")
                
                # Basic syntax check
                try:
                    with open(js_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    # Look for common JS patterns
                    if any(pattern in content for pattern in ['function', '=>', 'const ', 'let ', 'var ']):
                        self.log_success(f"{js_file} contains JavaScript code")
                    else:
                        self.log_warning(f"{js_file} may be empty or invalid")
                        
                except Exception as e:
                    self.log_error(f"Error reading {js_file}: {e}")
            else:
                self.log_warning(f"JavaScript file not found: {js_file}")
                
    def check_posts_directory(self):
        """Check posts directory and structure"""
        print("\n📝 Checking posts...")
        
        posts_dir = self.blog_path / '_posts'
        if posts_dir.exists():
            post_files = list(posts_dir.glob('*.md'))
            self.log_success(f"Posts directory found with {len(post_files)} posts")
            
            if len(post_files) == 0:
                self.log_warning("No posts found in _posts directory")
            else:
                # Check a few posts for proper format
                for i, post_file in enumerate(post_files[:3]):  # Check first 3 posts
                    try:
                        with open(post_file, 'r', encoding='utf-8') as f:
                            content = f.read()
                            
                        if content.startswith('---'):
                            self.log_success(f"Post has front matter: {post_file.name}")
                        else:
                            self.log_warning(f"Post missing front matter: {post_file.name}")
                            
                    except Exception as e:
                        self.log_error(f"Error reading post {post_file.name}: {e}")
        else:
            self.log_warning("Posts directory not found: _posts")
            
    def generate_report(self):
        """Generate final validation report"""
        print("\n" + "="*60)
        print("📊 VALIDATION REPORT")
        print("="*60)
        
        total_checks = self.success_count + len(self.warnings) + len(self.errors)
        
        print(f"✅ Successful checks: {self.success_count}")
        print(f"⚠️  Warnings: {len(self.warnings)}")
        print(f"❌ Errors: {len(self.errors)}")
        print(f"📊 Total checks: {total_checks}")
        
        if len(self.errors) == 0 and len(self.warnings) == 0:
            print("\n🎉 Perfect! Your blog is ready for deployment!")
            return True
        elif len(self.errors) == 0:
            print(f"\n✅ Good! Your blog is ready with {len(self.warnings)} minor warnings.")
            return True
        else:
            print(f"\n⚠️  Issues found: {len(self.errors)} errors need to be fixed.")
            
            if self.errors:
                print("\n🔧 Errors to fix:")
                for error in self.errors:
                    print(f"   • {error}")
                    
            if self.warnings:
                print("\n💡 Warnings to consider:")
                for warning in self.warnings:
                    print(f"   • {warning}")
                    
            return False
            
    def run_all_checks(self):
        """Run all validation checks"""
        print("🔍 Starting blog validation...")
        print(f"📁 Blog path: {self.blog_path}")
        
        # Run all checks
        self.check_required_files()
        self.check_config_yml()
        self.check_manifest_json()
        self.check_pwa_icons()
        self.check_service_worker()
        self.check_offline_page()
        self.check_css_scss()
        self.check_javascript_files()
        self.check_posts_directory()
        
        # Generate final report
        return self.generate_report()

def main():
    """Main validation function"""
    # Get blog path
    if len(sys.argv) > 1:
        blog_path = sys.argv[1]
    else:
        blog_path = Path(__file__).parent
        
    # Run validation
    validator = BlogValidator(blog_path)
    success = validator.run_all_checks()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
