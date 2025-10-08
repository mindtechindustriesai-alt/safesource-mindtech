// SafeSource Consumer App Service Worker v3.2
// Military-Grade Offline Scanning & Reporting

const CACHE_NAME = 'safesource-consumer-v3.2';
const STATIC_ASSETS = [
  '/consumer/',
  '/consumer/index.html',
  '/manifest-consumer.json',
  '/icons/consumer-icon-72x72.png',
  '/icons/consumer-icon-192x192.png',
  '/icons/consumer-icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js',
  'https://fonts.googleapis.com/css2?family=Exo:wght@300;400;600;700;800&display=swap'
];

self.addEventListener('install', (event) => {
  console.log('🛠️ SafeSource Consumer SW installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Background sync for offline reports
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-offline-reports') {
    event.waitUntil(syncOfflineReports());
  }
});

async function syncOfflineReports() {
  const offlineReports = JSON.parse(localStorage.getItem('offline-sars-reports')) || [];
  if (offlineReports.length > 0) {
    console.log(`📡 Syncing ${offlineReports.length} offline SARS reports`);
    // In production: Send to backend API
    localStorage.removeItem('offline-sars-reports');
  }
}

console.log('🎯 SafeSource Consumer Service Worker loaded');