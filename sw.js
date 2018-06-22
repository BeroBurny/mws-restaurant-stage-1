const CACHE_VERSION = 1;
const URL = '';

self.addEventListener('install', event => {
  console.log('Installing service Worker.');
  event.waitUntil(
    caches.open(`restaurant-v${CACHE_VERSION}`)
      .then(cache => cache.addAll([
        `${URL}/restaurant.html`,
        `${URL}/index.html`,
        `${URL}/data/restaurants.json`,
        `${URL}/css/`,
        `${URL}/js/`,
        `${URL}/img/`,
      ])).catch(error => {
      console.log('Failed to open Cache \n' + error);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      const fetchRequest = event.request.clone();
      return response || fetch(fetchRequest).then(fetchResponse => {
        const cloneResponse = fetchResponse.clone();
        // Check if we received a valid response
        if(!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
          return fetchResponse;
        }
        caches.open(`restaurant-v${CACHE_VERSION}`).then(cache => {
          cache.put(event.request, cloneResponse);
        });

        return fetchResponse;
      });
    })
  );
});