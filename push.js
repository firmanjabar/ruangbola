var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BIAdhZ7nFOum1Qg5y3sYs8nA_BeCed6mxPQQvdWDGAqpdWV6oqAESl8ZHe7gPG_c4a5qNm7PEc1fvrsX_uxc2mc",
    "privateKey": "XCHTY05rasJG0qvgBDGcBLtCAJZt4NjGSorKZHERRq4"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/deIFWyWkAq4:APA91bFHTOvT7vmho3CbwT6AFHDZs6ut0zAioyWOrm9iGJgqfVylI5WWU6TVyaR1A5WbLO3UmvS7bILzDKP8eZXtwJfruDgIr4qxR6Z5etaZ4-FSjjImiXKoS5xBAsCuoOa6RazuFqij",
    "keys": {
        "p256dh": "BOzDqzg95TjVtl31m/xNT/dFFYBLJfMpjHzK/7qv6iiFAB57DXS3/CUDJWg9pj/+LB2dGiwwmBlmJ8NT9QyEPmg=",
        "auth": "p2F+3aLiWvZ2IEW+YvCwZA=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '988799844009',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);