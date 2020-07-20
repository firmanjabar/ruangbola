var db = firebase.firestore();

if (!("serviceWorker" in navigator)) {
  console.log("Service worker tidak didukung browser ini.");
} else {
  registerServiceWorker();
  requestPermission();
}
// Register service worker
function registerServiceWorker() {
  return navigator.serviceWorker
    .register("/service-worker.js")
    .then(function (registration) {
      console.log("Registrasi service worker berhasil.");
      return registration;
    })
    .catch(function (err) {
      console.error("Registrasi service worker gagal.", err);
    });
}

function requestPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (result) {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }

      if ("PushManager" in window) {
        navigator.serviceWorker.getRegistration().then(function (registration) {
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                "BIAdhZ7nFOum1Qg5y3sYs8nA_BeCed6mxPQQvdWDGAqpdWV6oqAESl8ZHe7gPG_c4a5qNm7PEc1fvrsX_uxc2mc"
              ),
            })
            .then(function (subscribe) {
              const p256dh = btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("p256dh"))
                )
              );
              const auth = btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("auth"))
                )
              );
              // console.log(
              //   "Berhasil melakukan subscribe dengan endpoint: ",
              //   subscribe.endpoint
              // );
              // console.log(
              //   "Berhasil melakukan subscribe dengan p256dh key: ",
              //   p256dh
              // );
              // console.log(
              //   "Berhasil melakukan subscribe dengan auth key: ",
              //   auth
              // );

              // Add a new document in collection "push-notif"
              db.collection("push-notif")
                .doc(auth)
                .set({
                  endpoint: subscribe.endpoint,
                  p256dh: p256dh,
                  auth: auth,
                })
                .then(function () {
                  console.log("Document successfully written!");
                })
                .catch(function (error) {
                  console.error("Error writing document: ", error);
                });
            })
            .catch(function (e) {
              console.error("Tidak dapat melakukan subscribe ", e.message);
            });
        });
      }
    });
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
