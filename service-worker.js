// Der service-worker macht die PWA offline-capable

//Falls Ressourcen geupdatet werden, muss der cacheName verändert werden, damit er automatisch erneuert wird bei der nächsten Internetverbindung
var cacheName = 'ePaeko-v6';
var contentToCache = [
  '/ePaeko/',
  '/ePaeko/index.html',
  '/ePaeko/styles.css',
  '/manifest.webmanifest',
  '/ePaeko/ePaeko.js',
  '/ePaeko/img/icon-48.png',
  '/ePaeko/img/icon-192.png',
  '/ePaeko/img/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      return r || fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  var cacheKeeplist = [cacheName];
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
