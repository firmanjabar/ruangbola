const webPush = require("web-push");
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyC09SyNS2oC3btlLqtKrCSiJOH1kj49L3g",
  authDomain: "push-notif-pwa-1a357.firebaseapp.com",
  databaseURL: "https://push-notif-pwa-1a357.firebaseio.com",
  projectId: "push-notif-pwa-1a357",
  storageBucket: "push-notif-pwa-1a357.appspot.com",
  messagingSenderId: "988799844009",
  appId: "1:988799844009:web:d4b39d521e49774ff633b8",
  measurementId: "G-NF8B772F9E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.collection("push-notif")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      const vapidKeys = {
        publicKey:
          "BIAdhZ7nFOum1Qg5y3sYs8nA_BeCed6mxPQQvdWDGAqpdWV6oqAESl8ZHe7gPG_c4a5qNm7PEc1fvrsX_uxc2mc",
        privateKey: "XCHTY05rasJG0qvgBDGcBLtCAJZt4NjGSorKZHERRq4",
      };

      webPush.setVapidDetails(
        "mailto:example@yourdomain.org",
        vapidKeys.publicKey,
        vapidKeys.privateKey
      );
      var pushSubscription = {
        endpoint: doc.data().endpoint,
        keys: {
          p256dh: doc.data().p256dh,
          auth: doc.data().auth,
        },
      };
      var payload = "Sayang! Jangan sedih, aku ikut sedih :(";

      var options = {
        gcmAPIKey: "988799844009",
        TTL: 60,
      };
      webPush.sendNotification(pushSubscription, payload, options);
    });
  });
