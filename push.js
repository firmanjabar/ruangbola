var webPush = require("web-push");

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
  endpoint:
    "https://sg2p.notify.windows.com/w/?token=BQYAAAC62QWvrS8xrl%2fGU1VF4i0H2Etg2VgsdSfopfTQZEIyIsRJv%2fKZi8503DedrOddbn20AfPDLnn1p1TgTcczwpzrASCeGR%2byYijHDtDWbrPXhaeDbyAXd8Kk4NNFyP1dhNZ3r8X3dmfefepfwfixVWxlZ2IyyS6bDfX0PNmE40lR0DPrQTBAp9ATIM8J3DNGZXuw4cTxMdii9VzbrvOdgUyCppkKaMh%2bd%2bTtWphaD4vEYGVfeavbzYwjLFVRRar4fqcN2N0Z5DUf%2fMXULwmmP5iEMvdDm54yfdJZXJ%2bRVIJCwHUSdF9f8S0Eb81LzLpBUzsZ1J8rMTXnDI8b%2fkoq3GsN",
  keys: {
    p256dh:
      "BBmSyk+dSpdDSbSMW2Tkk1a4qt6BDPvcRoz+pZHqOH4HGpF+FIwQQnCtFVMtulcGKvT8fc0TsCwfexrcd632kI4=",
    auth: "cEp43fedaNtuURv6cbvNCA==",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "988799844009",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
