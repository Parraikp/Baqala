// Minimal service worker — enables "Add to Home Screen" / install prompt.
// Caches the app shell so it also opens instantly and works offline for viewing.
const CACHE_NAME = 'baqala-trader-v1';
const ASSETS = ['./index.html', './order.html', './manifest.json', './order-manifest.json', './icon-192.png', './icon-512.png', './icon-order-192.png', './icon-order-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network first, fall back to cache (so data stays fresh when online)
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
