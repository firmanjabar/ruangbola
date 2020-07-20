importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox berhasil dimuat 🎉`);
} else {
  console.log(`Workbox gagal dimuat 😬`);
}

//This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js",
  "/",
  "/favicon.ico",
  "/css/materialize.min.css",
  "/js/idb/lib/idb.js",
  "/js/materialize.min.js",
  "/img/firman.jpx",
  "/img/offline.svg",
  "/img/yes.png",
  "/img/no.png",
  {
    url: "/img/background2.jpx",
    revision: "4",
  },
  {
    url: "/img/liga/404.png",
    revision: "4",
  },
  {
    url: "/img/liga/BL1.png",
    revision: "4",
  },
  {
    url: "/img/liga/BSA.png",
    revision: "4",
  },
  {
    url: "/img/liga/CL.png",
    revision: "4",
  },
  {
    url: "/img/liga/DED.png",
    revision: "4",
  },
  {
    url: "/img/liga/EC.png",
    revision: "4",
  },
  {
    url: "/img/liga/ELC.png",
    revision: "4",
  },
  {
    url: "/img/liga/FL1.png",
    revision: "4",
  },
  {
    url: "/img/liga/PD.png",
    revision: "4",
  },
  {
    url: "/img/liga/PL.png",
    revision: "4",
  },
  {
    url: "/img/liga/PPL.png",
    revision: "4",
  },
  {
    url: "/img/liga/SA.png",
    revision: "4",
  },
  {
    url: "/img/liga/WC.png",
    revision: "4",
  },
  "/icons/icon.png",
  "/icons/icon-192x192.png",
  "/icons/maskable_icon.png",
  {
    url: "/css/styles.css",
    revision: "4",
  },
  {
    url: "/index.html",
    revision: "4",
  },
  {
    url: "/offline.html",
    revision: "4",
  },
  {
    url: "/manifest.json",
    revision: "4",
  },
  {
    url: "/nav.html",
    revision: "4",
  },
  {
    url: "/standing.html",
    revision: "4",
  },
  {
    url: "/team.html",
    revision: "4",
  },
  {
    url: "/pages/about.html",
    revision: "4",
  },
  {
    url: "/pages/contact.html",
    revision: "4",
  },
  {
    url: "/pages/home.html",
    revision: "4",
  },
  {
    url: "/pages/saved.html",
    revision: "4",
  },
  {
    url: "/js/script.js",
    revision: "4",
  },
  {
    url: "/js/api.js",
    revision: "4",
  },
  {
    url: "/js/firebase.js",
    revision: "4",
  },
  {
    url: "/js/getCompetitions.js",
    revision: "4",
  },
  {
    url: "/js/getLastMatch.js",
    revision: "4",
  },
  {
    url: "/js/getMatchToday.js",
    revision: "4",
  },
  {
    url: "/js/getStandings.js",
    revision: "4",
  },
  {
    url: "/js/getTeam.js",
    revision: "4",
  },
  {
    url: "/js/getNextMatch.js",
    revision: "4",
  },
  {
    url: "/js/getSavedTeam.js",
    revision: "4",
  },
  {
    url: "/js/cek_sw.js",
    revision: "4",
  },
  {
    url: "/js/ruang_bola_db.js",
    revision: "4",
  },
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
    revision: "4",
  },
  {
    url: "https://fonts.googleapis.com/icon?family=Material+Icons&display=swap",
    revision: "4",
  },
  {
    url:
      "https://fonts.googleapis.com/css?family=Fascinate|Montserrat:400,400,500,600,700&display=swap",
    revision: "4",
  },
]);

/**
 * Add on install
 */
self.addEventListener("install", (event) => {
  const urls = ["/offline.html"];
  const cacheName = workbox.core.cacheNames.runtime;
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
});

const offlinePage = "/offline.html";
/**
 * Pages to cache
 */
workbox.routing.registerRoute(new RegExp("/"), async ({ event }) => {
  try {
    return await workbox.strategies
      .networkFirst({
        cacheName: "ruang-bola",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
          }),
        ],
      })
      .handle({
        event,
      });
  } catch (error) {
    return caches.match(offlinePage);
  }
});

workbox.routing.registerRoute(
  /^https:\/\/api\.football\-data\.org\/v2\//,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "football-data-api",
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
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 25,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.(?:woff2)$/,
  workbox.strategies.cacheFirst({
    cacheName: "font-icon",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 25,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "icons/icon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  if (!event.action) {
    // Penguna menyentuh area notifikasi diluar action
    console.log("Notification Clicked.");
    return;
  }
  switch (event.action) {
    case "yes-action":
      console.log("Pengguna memilih action yes.");
      // buka tab baru
      clients.openWindow("/#saved");
      break;
    case "no-action":
      console.log("Pengguna memilih action no");
      break;
    default:
      console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
      break;
  }
});
