let dbPromised = idb.open("ruangBola", 2, function (upgradeDb) {
  let teamOS = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  teamOS.createIndex("name", "name", {
    unique: false,
  });

  let standingOS = upgradeDb.createObjectStore("standings", {
    keyPath: "competition.id",
  });
  standingOS.createIndex("competition.name", "competition.name", {
    unique: false,
  });
});

function saveStanding(standing) {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("standings", "readwrite");
      let store = tx.objectStore("standings");
      store.put(standing);
      return tx.complete;
    })
    .then(function () {
      const title = "Data standing Berhasil disimpan!";
      console.log(title);
    })
    .catch(function () {
      M.toast({
        html: "data Logo Team gagal disimpan",
      });
    });
}

function saveFavTeam(team) {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      // console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      const title = "Data Team Berhasil disimpan!";
      console.log(title);
      const options = {
        body: `Club ${team.name} sudah tersimpan, cek Team Favorite.`,
        badge: "icons/icon.png",
        icon: "icons/icon.png",
        actions: [
          {
            action: "yes-action",
            title: "Ya",
            icon: "/img/yes.png",
          },
          {
            action: "no-action",
            title: "Tidak",
            icon: "/img/no.png",
          },
        ],
      };
      if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification(title, options);
        });
      } else {
        M.toast({
          html: `Club ${team.name} berhasil disimpan, cek Team Favorite.`,
        });
      }
    })
    .catch(function () {
      M.toast({
        html: "Team gagal disimpan",
      });
    });
}

function deleteFavTeam(team) {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      // console.log(team);
      store.delete(team);
      return tx.complete;
    })
    .then(function () {
      const title = "Data Team Berhasil dihapus!";
      const options = {
        body: `Club berhasil dihapus dari list Favorite.`,
        badge: "icons/icon.png",
        icon: "icons/icon.png",
      };
      if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification(title, options);
        });
      } else {
        M.toast({
          html: `Club berhasil dihapus dari list Favorite.`,
        });
      }
    })
    .catch(function () {
      M.toast({
        html: "Team gagal dihapus",
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
      })
      .then(function (favorite) {
        if (favorite !== undefined) {
          resolve(true);
        } else {
          // reject(false);
        }
      });
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
        // console.log(teams);
        resolve(teams);
      });
  });
}

function getAllCrestUrl() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("standings", "readonly");
        let store = tx.objectStore("standings");
        return store.getAll();
      })
      .then(function (crest) {
        // console.log(teams);
        resolve(crest);
      });
  });
}
