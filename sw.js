// Service Worker for Ayman Aboghonim's Blog
// Version 1.0.0 - Enhanced caching and offline functionality

const CACHE_NAME = 'ayman-blog-v1.0.0';
const STATIC_CACHE = 'ayman-blog-static-v1.0.0';
const DYNAMIC_CACHE = 'ayman-blog-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/custom.js',
  '/assets/js/performance.js',
  '/manifest.json',
  '/offline.html',
  // Add critical pages
  '/about/',
  '/projects/',
  '/contact/'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Installed successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests
  if (request.method !== 'GET') return;
  
  // Skip external requests
  if (url.origin !== location.origin) return;
  
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Serve from cache
          console.log('Service Worker: Serving from cache', request.url);
          return cachedResponse;
        }
        
        // Network fallback
        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone response for caching
            const responseToCache = response.clone();
            
            // Determine cache strategy
            const cacheName = isStaticAsset(request.url) ? STATIC_CACHE : DYNAMIC_CACHE;
            
            caches.open(cacheName)
              .then(cache => {
                console.log('Service Worker: Caching new resource', request.url);
                cache.put(request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.error('Service Worker: Fetch failed', error);
            
            // Serve offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/offline.html');
            }
            
            // For other requests, return a generic offline response
            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Background sync for when connectivity returns
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform background tasks like updating cache
      updateCache()
    );
  }
});

// Push notifications (if needed in future)
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/assets/images/icon-192x192.png',
    badge: '/assets/images/badge-72x72.png',
    tag: 'blog-notification',
    vibrate: [200, 100, 200],
    actions: [
      {
        action: 'view',
        title: 'View Post',
        icon: '/assets/images/view-icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/images/close-icon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Helper functions
function isStaticAsset(url) {
  return url.includes('/assets/') || 
         url.includes('/css/') || 
         url.includes('/js/') || 
         url.includes('/images/') ||
         url.endsWith('.html') ||
         url.endsWith('.css') ||
         url.endsWith('.js');
}

function updateCache() {
  return caches.open(DYNAMIC_CACHE)
    .then(cache => {
      return cache.keys()
        .then(requests => {
          return Promise.all(
            requests.map(request => {
              return fetch(request)
                .then(response => {
                  if (response && response.status === 200) {
                    return cache.put(request, response);
                  }
                })
                .catch(error => {
                  console.warn('Service Worker: Failed to update cache for', request.url);
                });
            })
          );
        });
    });
}

// Cache cleanup - remove old entries to prevent storage bloat
function cleanupOldCache() {
  return caches.open(DYNAMIC_CACHE)
    .then(cache => {
      return cache.keys()
        .then(requests => {
          if (requests.length > 50) { // Keep only 50 most recent
            return Promise.all(
              requests.slice(50).map(request => cache.delete(request))
            );
          }
        });
    });
}

// Run cleanup periodically
setInterval(cleanupOldCache, 24 * 60 * 60 * 1000); // Every 24 hours
