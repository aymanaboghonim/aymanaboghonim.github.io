# Ruby Installation Guide for AL-FOLIO

## Step 1: Download and Install Ruby

1. **Download Ruby from https://rubyinstaller.org/downloads/**
   - Choose **"Ruby+Devkit 3.1.X (x64)"** (recommended version)
   - This includes both Ruby and the DevKit needed for gem compilation

2. **Run the installer:**
   - Check "Add Ruby executables to your PATH"
   - Check "Associate .rb and .rbw files with this Ruby installation"
   - Install to default location (usually `C:\Ruby31-x64\`)

3. **Complete the DevKit installation:**
   - At the end of installation, a command prompt will open
   - Press ENTER to run `ridk install`
   - Choose option 3 (MSYS2 and MINGW development toolchain)
   - Let it complete the installation

## Step 2: Verify Installation

Open a NEW PowerShell window and run:
```powershell
ruby --version
gem --version
```

## Step 3: Install Jekyll and Bundler

```powershell
gem install jekyll bundler
```

## Step 4: Navigate to Blog Directory

```powershell
cd "d:\Github_personal\aymanaboghonim.github.io"
```

## Step 5: Install Dependencies

```powershell
bundle install
```

## Step 6: Start Development Server

```powershell
bundle exec jekyll serve --livereload --drafts
```

Your blog will be available at: http://localhost:4000

## Troubleshooting

If you encounter SSL certificate issues:
```powershell
gem install certified
export SSL_CERT_FILE=C:\Ruby31-x64\lib\ruby\3.1.0\rubygems\ssl_certs\GlobalSignRootCA.pem
```

If bundle install fails, try:
```powershell
bundle config --local build.nokogiri --use-system-libraries
bundle install
```
