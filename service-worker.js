const CACHE_NAME = 'firstpwa-v8.5';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/challenge.html',
	'/pages/about.html',
	'/pages/contact.html',
	'/css/materialize.min.css',
	'/css/styles.css',
	'/js/materialize.min.js',
	'/js/script.js',
	'/img/angular.jpx',
	'/img/react.jpx',
	'/img/vue.jpx',
	'/img/firman.jpx',
	'/img/idcamp.jpx',
	'/img/dicoding.jpx',
	'/img/bekraf.jpx',
	'/img/background2.jpx',
	'/img/background3.jpx',
	'/manifest.json',
	'/icons/icon.png',
	'/icons/icon-192x192.png',
	'/icons/facebook.svg',
	'/icons/instagram.svg',
	'/icons/twitter.svg',
	'/icons/github.svg',
	'/icons/linkedin.svg',
	'/icons/menu.svg',
	'/js/api.js',
	'/article.html',
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys()
		.then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener("fetch", function (event) {
	var baseUrl = "https://api.football-data.org/v2/";
	if (event.request.url.indexOf(baseUrl) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then(function (cache) {
				return fetch(event.request).then(function (response) {
					cache.put(event.request.url, response.clone());
					return response;
				})
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request, {
				ignoreSearch: true
			}).then(function (response) {
				return response || fetch(event.request);
			})
		)
	}
});