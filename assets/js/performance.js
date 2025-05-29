// Performance and UX Enhancement Scripts

// Lazy loading for images (if not natively supported)
if ('loading' in HTMLImageElement.prototype === false) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
  document.head.appendChild(script);
}

// Service Worker registration for PWA features
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

// Smooth scroll polyfill for older browsers
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all links
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// Enhanced reading time calculation
function calculateReadingTime() {
  const article = document.querySelector('article, .post-content, .content');
  if (!article) return;
  
  const text = article.textContent || article.innerText;
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  
  const readingTimeElement = document.querySelector('.reading-time');
  if (readingTimeElement) {
    readingTimeElement.textContent = `${readingTime} min read`;
  }
}

// Initialize reading time calculation
document.addEventListener('DOMContentLoaded', calculateReadingTime);

// Copy to clipboard functionality
function setupCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(block => {
    const pre = block.parentElement;
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(block.textContent);
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
    
    pre.appendChild(button);
  });
}

// Initialize copy buttons
document.addEventListener('DOMContentLoaded', setupCopyButtons);

// Progressive enhancement for form validation
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
      input.addEventListener('invalid', function(e) {
        e.target.setCustomValidity('');
        
        if (!e.target.validity.valid) {
          e.target.setCustomValidity('Please fill out this field correctly.');
        }
      });
      
      input.addEventListener('input', function(e) {
        e.target.setCustomValidity('');
      });
    });
  });
});

// Analytics helper (privacy-friendly)
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
}

// Track external link clicks
document.addEventListener('DOMContentLoaded', function() {
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  
  externalLinks.forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('External Link', 'Click', this.href);
    });
  });
});
