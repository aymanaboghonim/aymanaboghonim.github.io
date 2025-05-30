# Git File Locking Solution for Windows

This directory contains enhanced scripts to handle the recurring `esbuild.exe` file locking issues during git operations on Windows.

## 🛠️ Available Scripts

### 1. `safe-git.ps1` - **RECOMMENDED**
**The all-in-one solution for safe git operations**

```powershell
# Examples:
.\safe-git.ps1 add .
.\safe-git.ps1 commit -m "Your commit message"
.\safe-git.ps1 push origin main
.\safe-git.ps1 pull origin main
.\safe-git.ps1 merge feature-branch
```

**What it does:**
- Automatically stops all Node.js/esbuild processes before git operations
- Executes your git command safely
- If file locking occurs, runs emergency cleanup and retries
- Shows repository status after completion

### 2. `pre-git.ps1` - Preventative Check
**Run before manual git commands to prevent issues**

```powershell
# Check and prepare for git operations:
.\pre-git.ps1

# Or run a git command through it:
.\pre-git.ps1 "git add ."
```

### 3. `git-cleanup.ps1` - Emergency Cleanup
**Enhanced version of your original cleanup script**

```powershell
# When you're stuck with locked files:
.\git-cleanup.ps1
```

**What it does:**
- Stops all development processes (node, esbuild, npm, yarn, vite)
- Removes build artifacts (node_modules, dist, build, .vite)
- Uses robocopy for stubborn locked files
- Cleans git untracked files
- Optionally reinstalls packages

## 🚀 Quick Start Guide

### For Regular Git Operations:
```powershell
# Instead of: git add .
.\safe-git.ps1 add .

# Instead of: git commit -m "message"
.\safe-git.ps1 commit -m "message"

# Instead of: git push origin main
.\safe-git.ps1 push origin main
```

### When You're Stuck:
1. Run the cleanup script:
   ```powershell
   .\git-cleanup.ps1
   ```

2. Then use safe-git for your operations:
   ```powershell
   .\safe-git.ps1 add .
   .\safe-git.ps1 commit -m "Fixed file locking issues"
   .\safe-git.ps1 push origin main
   ```

## 🔧 Common Scenarios

### Scenario 1: "Permission denied" during git add
```powershell
# This will handle it automatically:
.\safe-git.ps1 add .
```

### Scenario 2: Can't delete node_modules
```powershell
# Enhanced cleanup with robocopy:
.\git-cleanup.ps1
```

### Scenario 3: Development server is running
```powershell
# Safe-git will stop it automatically:
.\safe-git.ps1 add .
```

### Scenario 4: Multiple build processes stuck
```powershell
# Cleanup handles node, esbuild, npm, yarn, pnpm, vite:
.\git-cleanup.ps1
```

## 🛡️ Prevention Tips

1. **Always use `safe-git.ps1`** instead of direct git commands
2. **Stop development servers** before manual git operations:
   ```powershell
   # Stop dev server with Ctrl+C, then:
   .\safe-git.ps1 add .
   ```
3. **Regular cleanup** if you notice slowdowns:
   ```powershell
   .\git-cleanup.ps1
   ```

## 📋 Files Protected

The enhanced `.gitignore` now prevents these from being tracked:
- `node_modules/` and all package manager logs
- `dist/`, `build/`, `.vite/`, `.next/`, `.nuxt/`
- Cache and temporary files
- Process and lock files
- Windows-specific files

## 🆘 If All Else Fails

1. **Nuclear option** - Remove everything and start fresh:
   ```powershell
   .\git-cleanup.ps1
   # When prompted, choose 'y' to reinstall packages
   ```

2. **Manual process termination**:
   ```powershell
   Get-Process -Name "*node*","*esbuild*" | Stop-Process -Force
   ```

3. **Check what's using your files**:
   ```powershell
   # Install handle.exe from Sysinternals, then:
   handle.exe node_modules
   ```

## ✅ Success Indicators

You'll know the scripts are working when you see:
- ✅ Green checkmarks in the output
- 🎯 "Safe git operation completed!"
- No "Permission denied" or "unable to create file" errors
- Clean `git status` output at the end

Remember: **Use `safe-git.ps1` for all your git operations** to prevent issues before they happen!
