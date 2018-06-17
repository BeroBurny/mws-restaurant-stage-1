const CACHE_VERSION = 1;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(`restaurant-v${CACHE_VERSION}`)
      .then(cache => cache.addAll([
        '/restaurant.html',
        '/index.html',
        'css/styles.css',
        'js/main.js',
        'js/dbhelper.js',
        'js/restaurant_info.js',
        'img/',
        'data/restaurants.json',
      ])).catch(error => {
      console.log('Failed to open Cache \n' + error);
    })
  );
});