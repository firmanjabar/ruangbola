importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
	console.log(`Workbox berhasil dimuat 🎉`);
} else {
	console.log(`Workbox gagal dimuat 😬`);
}

workbox.precaching.precacheAndRoute([
	'/',
	'/favicon.ico',
	'/css/materialize.min.css',
	'/js/idb/lib/idb.js',
	'/js/materialize.min.js',
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
	'/icons/icon.png',
	'/icons/icon-192x192.png',
	'/icons/menu.svg',
	{
		url: '/css/styles.css',
		revision: '2'
	},
	{
		url: '/index.html',
		revision: '2'
	},
	{
		url: '/manifest.json',
		revision: '1'
	},
	{
		url: '/nav.html',
		revision: '1'
	},
	{
		url: '/standing.html',
		revision: '1'
	},
	{
		url: '/team.html',
		revision: '1'
	},
	{
		url: '/pages/about.html',
		revision: '1'
	},
	{
		url: '/pages/contact.html',
		revision: '1'
	},
	{
		url: '/pages/home.html',
		revision: '1'
	},
	{
		url: '/pages/saved.html',
		revision: '1'
	},
	{
		url: '/js/script.js',
		revision: '1'
	},
	{
		url: '/js/api.js',
		revision: '1'
	},
	{
		url: '/js/getCompetitions.js',
		revision: '2'
	},
	{
		url: '/js/getLastMatch.js',
		revision: '1'
	},
	{
		url: '/js/getMatchToday.js',
		revision: '1'
	},
	{
		url: '/js/getStandings.js',
		revision: '1'
	},
	{
		url: '/js/getTeam.js',
		revision: '1'
	},
	{
		url: '/js/getNextMatch.js',
		revision: '1'
	},
	{
		url: '/js/getSavedTeam.js',
		revision: '2'
	},
	{
		url: '/js/cek_sw.js',
		revision: '1'
	},
	{
		url: '/js/ruang_bola_db.js',
		revision: '1'
	},
	{
		url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
		revision: '1'
	},
]);

workbox.routing.registerRoute(
	/^https:\/\/api\.football\-data\.org\/v2\//,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'football-data-api',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
			}),
		],
	})
);

workbox.routing.registerRoute(
	/\.(?:png|jpx|css|svg)$/,
	workbox.strategies.cacheFirst({
		cacheName: 'images',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 25,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
			}),
		],
	})
);

self.addEventListener('push', function (event) {
	var body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	var options = {
		body: body,
		icon: 'icons/icon.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});