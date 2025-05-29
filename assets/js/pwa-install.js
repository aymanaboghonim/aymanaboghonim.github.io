// PWA Install Prompt - Enhanced user experience for app installation
// For Ayman Aboghonim's Personal Blog

(function() {
    'use strict';
    
    let deferredPrompt;
    let installButton;
    
    // Check if PWA is installable
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('PWA: Install prompt available');
        
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        
        // Show custom install button
        showInstallButton();
    });
    
    // Handle successful installation
    window.addEventListener('appinstalled', (evt) => {
        console.log('PWA: App was installed successfully');
        hideInstallButton();
        
        // Track installation (optional analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'app_install', {
                'event_category': 'PWA',
                'event_label': 'Blog App Installed'
            });
        }
        
        // Show thank you message
        showInstallSuccessMessage();
    });
    
    function showInstallButton() {
        // Check if button already exists
        if (document.getElementById('pwa-install-button')) return;
        
        // Create install button
        installButton = document.createElement('div');
        installButton.id = 'pwa-install-button';
        installButton.innerHTML = `
            <div class="pwa-install-prompt">
                <div class="pwa-install-content">
                    <i class="fas fa-download"></i>
                    <span>Install App</span>
                </div>
                <button class="pwa-install-close" aria-label="Close install prompt">×</button>
            </div>
        `;
        
        // Add styles
        installButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 50px;
            padding: 12px 20px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: slideInUp 0.3s ease-out;
        `;
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInUp {
                from {
                    transform: translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .pwa-install-prompt {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .pwa-install-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .pwa-install-close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                line-height: 1;
                transition: background 0.2s;
            }
            
            .pwa-install-close:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            #pwa-install-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
            }
            
            @media (max-width: 768px) {
                #pwa-install-button {
                    bottom: 15px;
                    right: 15px;
                    padding: 10px 16px;
                    font-size: 13px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add to page
        document.body.appendChild(installButton);
        
        // Add click handlers
        const installContent = installButton.querySelector('.pwa-install-content');
        const closeButton = installButton.querySelector('.pwa-install-close');
        
        installContent.addEventListener('click', handleInstallClick);
        closeButton.addEventListener('click', handleCloseClick);
        
        // Auto-hide after 30 seconds
        setTimeout(() => {
            if (installButton && installButton.parentNode) {
                hideInstallButton();
            }
        }, 30000);
    }
    
    function hideInstallButton() {
        if (installButton && installButton.parentNode) {
            installButton.style.animation = 'slideInUp 0.3s ease-out reverse';
            setTimeout(() => {
                if (installButton && installButton.parentNode) {
                    installButton.parentNode.removeChild(installButton);
                }
            }, 300);
        }
    }
    
    function handleInstallClick() {
        if (!deferredPrompt) return;
        
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA: User accepted the install prompt');
            } else {
                console.log('PWA: User dismissed the install prompt');
            }
            deferredPrompt = null;
            hideInstallButton();
        });
    }
    
    function handleCloseClick(e) {
        e.stopPropagation();
        hideInstallButton();
        
        // Remember user dismissed (don't show again for 7 days)
        localStorage.setItem('pwa-install-dismissed', Date.now() + (7 * 24 * 60 * 60 * 1000));
    }
    
    function showInstallSuccessMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1001;
                background: #10b981;
                color: white;
                padding: 16px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                animation: slideInDown 0.3s ease-out;
            ">
                <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
                App installed successfully! 🎉
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideInDown 0.3s ease-out reverse';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 3000);
    }
    
    // Check if already dismissed recently
    function shouldShowInstallPrompt() {
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (dismissed && Date.now() < parseInt(dismissed)) {
            return false;
        }
        return true;
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    function initialize() {
        // Only show install prompt if conditions are met
        if (!shouldShowInstallPrompt()) {
            console.log('PWA: Install prompt recently dismissed, not showing');
            return;
        }
        
        // Check if already running as PWA
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
            console.log('PWA: Already running as installed app');
            return;
        }
        
        // Check if on mobile (more likely to install)
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            console.log('PWA: Mobile device detected, install prompt enabled');
        }
    }
    
})();
