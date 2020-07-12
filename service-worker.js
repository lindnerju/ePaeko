/* Der service-worker macht die PWA offline-capable*/

//Falls Ressourcen geupdatet werden, muss der cacheName verändert werden, damit er automatisch erneuert wird bei der nächsten Internetverbindung
var cacheName = 'ePaeko-v2';
var contentToCache = [
  '/ePaeko/',
  '/ePaeko/index.html',
  '/ePaeko/styles.css',
  '/ePaeko/ePaeko.js',
  '/ePaeko/img/icon-48.png',
  '/ePaeko/img/icon-192.png',
  '/ePaeko/img/icon-512.png'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching all files');
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
