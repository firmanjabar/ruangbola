const CACHE_NAME = 'firstpwa-v8.10';
var urlsToCache = [
	'/',
	'/favicon.ico',
	'/nav.html',
	'/index.html',
	'/standing.html',
	'/team.html',
	'/pages/home.html',
	'/pages/challenge.html',
	'/pages/about.html',
	'/pages/contact.html',
	'/css/materialize.min.css',
	'/css/styles.css',
	'/js/materialize.min.js',
	'/js/script.js',
	'/img/firman.jpx',
	'/img/background2.jpx',
	'/img/background3.jpx',
	'/img/liga/404.png',
	'/img/liga/BL1.png',
	'/img/liga/BSA.png',
	'/img/liga/CL.png',
	'/img/liga/DED.png',
	'/img/liga/EC.png',
	'/img/liga/ELC.png',
	'/img/liga/FL1.png',
	'/img/liga/PD.png',
	'/img/liga/PL.png',
	'/img/liga/PPL.png',
	'/img/liga/SA.png',
	'/img/liga/WC.png',
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