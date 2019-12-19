importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
	console.log(`Workbox berhasil dimuat 🎉`);
} else {
	console.log(`Workbox gagal dimuat 😬`);
}

//This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([
	'/favicon.ico',
	'/css/materialize.min.css',
	'/js/idb/lib/idb.js',
	'/js/materialize.min.js',
	'/img/firman.jpx',
	'/img/offline.svg',
	'/img/yes.png',
	'/img/no.png',
	{
		url: '/img/background2.jpx',
		revision: '3'
	}, {
		url: '/img/background3.jpx',
		revision: '3'
	},
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
		revision: '3'
	},
	{
		url: '/index.html',
		revision: '3'
	},
	{
		url: '/offline.html',
		revision: '3'
	},
	{
		url: '/manifest.json',
		revision: '3'
	},
	{
		url: '/nav.html',
		revision: '3'
	},
	{
		url: '/standing.html',
		revision: '3'
	},
	{
		url: '/team.html',
		revision: '3'
	},
	{
		url: '/pages/about.html',
		revision: '3'
	},
	{
		url: '/pages/contact.html',
		revision: '3'
	},
	{
		url: '/pages/home.html',
		revision: '3'
	},
	{
		url: '/pages/saved.html',
		revision: '3'
	},
	{
		url: '/js/script.js',
		revision: '3'
	},
	{
		url: '/js/api.js',
		revision: '3'
	},
	{
		url: '/js/getCompetitions.js',
		revision: '3'
	},
	{
		url: '/js/getLastMatch.js',
		revision: '3'
	},
	{
		url: '/js/getMatchToday.js',
		revision: '3'
	},
	{
		url: '/js/getStandings.js',
		revision: '3'
	},
	{
		url: '/js/getTeam.js',
		revision: '3'
	},
	{
		url: '/js/getNextMatch.js',
		revision: '3'
	},
	{
		url: '/js/getSavedTeam.js',
		revision: '3'
	},
	{
		url: '/js/cek_sw.js',
		revision: '3'
	},
	{
		url: '/js/ruang_bola_db.js',
		revision: '3'
	},
]);

/**
 * Add on install
 */
self.addEventListener('install', (event) => {
	const urls = ['/offline.html'];
	const cacheName = workbox.core.cacheNames.runtime;
	event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)))
});

const offlinePage = '/offline.html';
/**
 * Pages to cache
 */
workbox.routing.registerRoute(new RegExp('/'),
	async ({
		event
	}) => {
		try {
			return await workbox.strategies.networkFirst({
				cacheName: 'ruang-bola',
				plugins: [
					new workbox.expiration.Plugin({
						maxEntries: 60,
						maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
					}),
				],
			}).handle({
				event
			});
		} catch (error) {
			return caches.match(offlinePage);
		}
	}
);

workbox.routing.registerRoute(
	/^https:\/\/api\.football\-data\.org\/v2\//,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'football-data-api',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 120,
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

self.addEventListener('notificationclick', function (event) {
	event.notification.close();
	if (!event.action) {
		// Penguna menyentuh area notifikasi diluar action
		console.log('Notification Clicked.');
		return;
	}
	switch (event.action) {
		case 'yes-action':
			console.log('Pengguna memilih action yes.');
			// buka tab baru
			clients.openWindow('/#saved');
			break;
		case 'no-action':
			console.log('Pengguna memilih action no');
			break;
		default:
			console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
			break;
	}
});