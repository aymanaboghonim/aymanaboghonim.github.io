// Performance monitoring and optimization for Ayman Aboghonim's blog
(function() {
    'use strict';
    
    // Performance monitoring
    function initializePerformanceMonitoring() {
        // Core Web Vitals monitoring
        if ('web-vital' in window) {
            import('https://unpkg.com/web-vitals@3.5.2/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
            });
        }
        
        // Page load performance
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            
            const performanceMetrics = {
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                windowLoad: perfData.loadEventEnd - perfData.loadEventStart,
                totalPageLoad: perfData.loadEventEnd - perfData.navigationStart,
                dnsLookup: perfData.domainLookupEnd - perfData.domainLookupStart,
                tcpConnect: perfData.connectEnd - perfData.connectStart,
                serverResponse: perfData.responseEnd - perfData.requestStart
            };
            
            // Log performance in development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.table(performanceMetrics);
            }
            
            // Store performance data
            localStorage.setItem('blog-performance', JSON.stringify(performanceMetrics));
        });
    }
    
    // Image optimization and lazy loading enhancement
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" if not present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add error handling
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Failed to load image:', this.src);
            });
            
            // Add fade-in effect when loaded
            img.addEventListener('load', function() {
                this.style.opacity = '0';
                this.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 10);
            });
        });
    }
    
    // Preload critical resources
    function preloadCriticalResources() {
        const criticalResources = [
            '/assets/css/style.css',
            '/assets/js/custom.js'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }
    
    // Service Worker for caching (Progressive Web App features)
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
    
    // Initialize all performance optimizations
    function init() {
        // Run immediately
        preloadCriticalResources();
        
        // Run when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                optimizeImages();
                initializePerformanceMonitoring();
            });
        } else {
            optimizeImages();
            initializePerformanceMonitoring();
        }
        
        // Register service worker for PWA features
        registerServiceWorker();
    }
    
    // Auto-initialize
    init();
    
    // Export for manual initialization if needed
    window.BlogPerformance = {
        init,
        optimizeImages,
        initializePerformanceMonitoring
    };
})();