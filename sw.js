const CACHE_NAME = 'safesource-main-v3';
const STATIC_ASSETS = [
  '/main',
  '/manifest-main.json',
  '/icons/main-192.png',
  '/icons/main-512.png',
  '/consumer',
  '/manufacturer',
  '/farmer',
  '/retailer'
];

self.addEventListener('install', (event) => {
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

// Aggregate data from all apps
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'network-aggregate') {
    event.waitUntil(aggregateNetworkData());
  }
});

async function aggregateNetworkData() {
  // In production, this would aggregate data from all app endpoints
  console.log('🌐 Aggregating network data from all apps');
}