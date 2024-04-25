self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
  });
  
  self.addEventListener('push', event => {
    const data = event.data.json();
    const title = data.title;
    const body = data.body;
    event.waitUntil(
      self.registration.showNotification(title, {
        body,
      })
    );
  });
  
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('my-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/pdf.js',
          '/style.css',
        ]);
      })
    );
  });
  