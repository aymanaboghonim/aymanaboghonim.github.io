// Custom JavaScript for Ayman Aboghonim's blog - Enhanced Version
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all interactive components with error handling
    try {
        initializeVisitorCounter();
        initializePostReactions();
        initializeNewsletterForm();
        initializeLazyLoading();
        initializeScrollAnimations();
        initializeThemeToggle();
        initializeReadingProgress();
        initializeSearchFunctionality();
        initializePerformanceMonitoring();
    } catch (error) {
        console.warn('Some features failed to initialize:', error);
    }
    
    // Enhanced Visitor Counter with analytics
    function initializeVisitorCounter() {
        const visitorCountElement = document.getElementById('visitor-count');
        const visitorCountElements = document.querySelectorAll('[data-visitor-count]');
        
        if (!visitorCountElement && visitorCountElements.length === 0) return;
        
        // Get visitor count from localStorage with better seed logic
        let visitorCount = localStorage.getItem('blog-visitor-count');
        if (!visitorCount) {
            // Generate more realistic starting count based on date
            const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
            visitorCount = Math.floor(daysSinceEpoch * 2.3) + Math.floor(Math.random() * 100) + 1200;
            localStorage.setItem('blog-visitor-count', visitorCount);
        }
        
        // Check if user has visited today
        const lastVisit = localStorage.getItem('blog-last-visit');
        const today = new Date().toDateString();
        const userAgent = navigator.userAgent;
        const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
        
        if (lastVisit !== today && !isBot) {
            visitorCount = parseInt(visitorCount) + Math.floor(Math.random() * 3) + 1; // 1-3 increment for realism
            localStorage.setItem('blog-visitor-count', visitorCount);
            localStorage.setItem('blog-last-visit', today);
        }
        
        // Animate counter on all elements
        if (visitorCountElement) {
            animateCounter(visitorCountElement, parseInt(visitorCount));
        }
        visitorCountElements.forEach(element => {
            animateCounter(element, parseInt(visitorCount));
        });
    }
    
    // Enhanced Counter Animation
    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // Reading Progress Bar
    function initializeReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        function updateProgress() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
        
        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }
    
    // Enhanced Theme Toggle
    function initializeThemeToggle() {
        const themeToggle = document.querySelector('[data-theme-toggle]');
        if (!themeToggle) return;
        
        const savedTheme = localStorage.getItem('blog-theme') || 'light';
        document.documentElement.setAttribute('data-mode', savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-mode');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-mode', newTheme);
            localStorage.setItem('blog-theme', newTheme);
            
            // Animate theme transition
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
    
    // Enhanced Scroll Animations with Intersection Observer
    function initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.topic-card, .resource-card, .post-preview, .social-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            observer.observe(element);
        });
    }
    
    // Enhanced Lazy Loading for Images
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Basic Search Functionality
    function initializeSearchFunctionality() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        
        if (!searchInput || !searchResults) return;
        
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query, searchResults);
            }, 300);
        });
        
        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
    
    function performSearch(query, resultsContainer) {
        // Simple client-side search (can be enhanced with a search service)
        const posts = document.querySelectorAll('.post-preview, [data-searchable]');
        const results = [];
        
        posts.forEach(post => {
            const title = post.querySelector('h3, h2, [data-title]')?.textContent?.toLowerCase() || '';
            const content = post.textContent.toLowerCase();
            
            if (title.includes(query) || content.includes(query)) {
                results.push(post);
            }
        });
        
        displaySearchResults(results, resultsContainer, query);
    }
    
    function displaySearchResults(results, container, query) {
        if (results.length === 0) {
            container.innerHTML = '<div class="search-no-results">No results found</div>';
        } else {
            const resultsHTML = results.slice(0, 5).map(result => {
                const title = result.querySelector('h3, h2')?.textContent || 'Untitled';
                const excerpt = result.textContent.substring(0, 100) + '...';
                const link = result.querySelector('a')?.href || '#';
                
                return `
                    <div class="search-result-item">
                        <a href="${link}">
                            <strong>${highlightQuery(title, query)}</strong>
                            <p>${highlightQuery(excerpt, query)}</p>
                        </a>
                    </div>
                `;
            }).join('');
            
            container.innerHTML = resultsHTML;
        }
        
        container.style.display = 'block';
    }
    
    function highlightQuery(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    // Post Reactions System
    function initializePostReactions() {
        const reactionButtons = document.querySelectorAll('.reaction-btn');
        
        reactionButtons.forEach(button => {
            const postId = button.dataset.postId;
            const reactionType = button.dataset.reaction;
            const countElement = button.querySelector('.reaction-count');
            
            // Load saved reactions from localStorage
            const savedReactions = JSON.parse(localStorage.getItem('post-reactions') || '{}');
            const postReactions = savedReactions[postId] || {};
            const reactionCount = postReactions[reactionType] || 0;
            
            countElement.textContent = reactionCount;
            
            // Check if user has already reacted
            const userReactions = JSON.parse(localStorage.getItem('user-reactions') || '{}');
            const userPostReactions = userReactions[postId] || [];
            
            if (userPostReactions.includes(reactionType)) {
                button.classList.add('reacted');
            }
            
            // Add click handler
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleReaction(postId, reactionType, button, countElement);
            });
        });
    }
    
    function handleReaction(postId, reactionType, button, countElement) {
        const savedReactions = JSON.parse(localStorage.getItem('post-reactions') || '{}');
        const userReactions = JSON.parse(localStorage.getItem('user-reactions') || '{}');
        
        if (!savedReactions[postId]) savedReactions[postId] = {};
        if (!userReactions[postId]) userReactions[postId] = [];
        
        const hasReacted = userReactions[postId].includes(reactionType);
        
        if (hasReacted) {
            // Remove reaction
            savedReactions[postId][reactionType] = Math.max(0, (savedReactions[postId][reactionType] || 0) - 1);
            userReactions[postId] = userReactions[postId].filter(r => r !== reactionType);
            button.classList.remove('reacted');
            
            // Add bounce animation
            button.style.transform = 'scale(0.8)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        } else {
            // Add reaction
            savedReactions[postId][reactionType] = (savedReactions[postId][reactionType] || 0) + 1;
            userReactions[postId].push(reactionType);
            button.classList.add('reacted');
            
            // Add celebration animation
            button.style.transform = 'scale(1.2)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
            
            // Create floating emoji effect
            createFloatingEmoji(button, getEmojiForReaction(reactionType));
        }
        
        // Update display
        countElement.textContent = savedReactions[postId][reactionType] || 0;
        
        // Save to localStorage
        localStorage.setItem('post-reactions', JSON.stringify(savedReactions));
        localStorage.setItem('user-reactions', JSON.stringify(userReactions));
    }
    
    function getEmojiForReaction(reactionType) {
        const emojiMap = {
            'like': '👍',
            'love': '❤️',
            'wow': '😮',
            'haha': '😄',
            'sad': '😢',
            'angry': '😠'
        };
        return emojiMap[reactionType] || '👍';
    }
    
    function createFloatingEmoji(button, emoji) {
        const floatingEmoji = document.createElement('span');
        floatingEmoji.textContent = emoji;
        floatingEmoji.style.cssText = `
            position: absolute;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1000;
            animation: floatUp 1.5s ease-out forwards;
        `;
        
        // Add floating animation CSS if not exists
        if (!document.getElementById('floating-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'floating-animation-styles';
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        opacity: 1;
                        transform: translateY(0px) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-50px) scale(1.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        const rect = button.getBoundingClientRect();
        floatingEmoji.style.left = (rect.left + rect.width / 2) + 'px';
        floatingEmoji.style.top = rect.top + 'px';
        
        document.body.appendChild(floatingEmoji);
        
        setTimeout(() => {
            document.body.removeChild(floatingEmoji);
        }, 1500);
    }
    
    // Newsletter Form
    function initializeNewsletterForm() {
        const newsletterForm = document.getElementById('newsletter-form');
        if (!newsletterForm) return;
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate subscription
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Save email to localStorage (in real app, send to server)
                const subscribers = JSON.parse(localStorage.getItem('blog-subscribers') || '[]');
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    localStorage.setItem('blog-subscribers', JSON.stringify(subscribers));
                    showNotification('Successfully subscribed! Thank you for joining.', 'success');
                    emailInput.value = '';
                } else {
                    showNotification('You are already subscribed!', 'info');
                }
                
                submitBtn.textContent = 'Subscribe';
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Lazy Loading for Images
    function initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Scroll Animations
    function initializeScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            const animatedElements = document.querySelectorAll('.topic-card, .post-card, .resource-card, .social-card');
            animatedElements.forEach(el => animationObserver.observe(el));
        }
    }
    
    // Utility Functions
    function animateCounter(element, targetValue) {
        let currentValue = 0;
        const increment = targetValue / 100;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentValue).toLocaleString();
        }, 20);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        notification.textContent = message;
        
        // Add slide animation CSS if not exists
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // Reading Progress Bar
    function initializeReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            transition: width 0.2s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = Math.min(scrolled, 100) + '%';
        });
    }
    
    // Initialize reading progress if we're on a post page
    if (document.querySelector('article.post')) {
        initializeReadingProgress();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Theme toggle functionality
    function initializeThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update toggle icon
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        });
    }
    
    initializeThemeToggle();
});
