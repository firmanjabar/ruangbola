const baseUrl = "https://api.football-data.org/v2/";

const apiToken = 'b3dad9833b3a4b78af52563c2d2b6895';

let fetchApi = url => {
  return fetch(url, {
    mode: "no-cors",
    headers: {
      'X-Auth-Token': apiToken,
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getCompetitions() {
  if ('caches' in window) {
    caches.match(baseUrl + "competitions?plan=TIER_ONE").then(function (response) {
      if (response) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          var articlesHTML = "";
          data.competitions.forEach(function (liga) {
            articlesHTML += `
                    <div class="col s12 m2" >
                      <div class="card">
                        <a href="./article.html?id=${liga.id}">
                          <div class="card-image waves-effect waves-block waves-light">
                            <img src="${liga.thumbnail}" />
                          </div>
                        </a>
                        <div class="card-content">
                          <span class="card-title truncate">${liga.name} (${liga.code})</span>
                          <p>${liga.area[name]}</p>
                        </div>
                        <div class="card-content">
                          <p>Mulai: ${liga.currentSeason[startDate]}</p>
                          <p>Berakhir: ${liga.currentSeason[endDate]}</p>
                          <p>Pertandingan Berlangsung: ${liga.currentSeason[currentMatchday]}</p>
                        </div>
                      </div>
                    </div>
                    `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        })
      }
    })
  }
  fetch(baseUrl + "competitions?plan=TIER_ONE")
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.competitions.forEach(function (liga) {
        articlesHTML += `
            <div class="col s12 m2" >
              <div class="card">
                <a href="./article.html?id=${liga.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${liga.thumbnail}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${liga.name} (${liga.code})</span>
                  <p>${liga.area[name]}</p>
                </div>
                <div class="card-content">
                  <p>Mulai: ${liga.currentSeason[startDate]}</p>
                  <p>Berakhir: ${liga.currentSeason[endDate]}</p>
                  <p>Pertandingan Berlangsung: ${liga.currentSeason[currentMatchday]}</p>
                </div>
              </div>
            </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ('caches' in window) {
    caches.match(baseUrl + "article/" + idParam).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.result.cover}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.result.post_title}</span>
                ${snarkdown(data.result.post_content)}
              </div>
            </div>
          `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = articleHTML;
        })
      }
    })
  }
  fetch(baseUrl + "article/" + idParam)
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.result.cover}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.result.post_title}</span>
                ${snarkdown(data.result.post_content)}
              </div>
            </div>
          `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
    });
}