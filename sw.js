// sw.js
const CACHE_NAME = 'climb-timer-v2';
const ASSETS = [
  '/',
  'index.html',
  'manifest.json',
  'sw.js',
  'timer.ico',
  'timer.png',
  'logo-bouldrovka.png',
  'logo-bouldrovka-white.png',
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
  self.clients.claim();
});

// Fetch – najprv cache, ak nie je, potom sieť
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('index.html').then((cached) => cached || fetch(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
