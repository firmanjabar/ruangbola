let dbPromised = idb.open("ruangBola", 1, function (upgradeDb) {
    let teamOS = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamOS.createIndex("name", "name", {
        unique: false
    });
});

function saveFavTeam(team) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            console.log(team);
            store.put(team);
            return tx.complete;
        })
        .then(function () {
            console.log("Liga berhasil di simpan.");
        }).catch(function () {
            console.log('Liga gagal disimpan.');
        });
}

function deleteFavTeam(team) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction('teams', 'readwrite');
            let store = tx.objectStore('teams');
            console.log(team);
            store.delete(team);
            return tx.complete;
        })
        .then(function () {
            console.log("league berhasil dihapus");
        }).catch(function () {
            console.log('league gagal dihapus.');
        });
}

function getAllFavTeam() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (teams) {
                console.log(teams);
                resolve(teams);
            });
    });
}

function checkFavorite(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.get(id);
            }).then(function (favorite) {
                if (favorite !== undefined) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
    });
}

function getFavTeam(id) {
    let getId = parseInt(id);
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.get(getId);
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}