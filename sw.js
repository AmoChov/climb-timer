// sw.js
const CACHE_NAME = 'climb-timer-v1';
const ASSETS = [
  'app.html',
  'manifest.json',
  'sw.js',
  'countdown.mp3',
  'finish.mp3',
  'phase.mp3',
  'prepare.mp3',
  'icon-192.png',
  'icon-512.png'
];

// Inštalácia – nacachuj všetko
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Aktivácia – čistka starých cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch – najprv cache, ak nie je, potom sieť
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
