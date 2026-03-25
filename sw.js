// Bob — Service Worker
// Caches all app files for offline use. Syncs via Firebase when online.

const CACHE_NAME = 'bob-v2';
const FILES_TO_CACHE = [
  './bob.html',
  './delegate.html',
  './bob-logo.png',
  './manifest.json',
  './firebase-config.js',
  './new_tasks.js',
  './initiatives.js'
];

// Install: cache files individually so one missing file doesn't crash everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        FILES_TO_CACHE.map(url =>
          cache.add(url).catch(() => {}) // silently skip missing files
        )
      );
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network, cache new responses
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = event.request.url;
  if (url.includes('firebase') || url.includes('gstatic') || url.includes('googleapis')) {
    event.respondWith(fetch(event.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});

// Background sync
self.addEventListener('sync', event => {
  if (event.tag === 'bob-sync') {
    event.waitUntil(
      self.clients.matchAll().then(clients =>
        clients.forEach(client => client.postMessage({ type: 'SYNC_REQUESTED' }))
      )
    );
  }
});
