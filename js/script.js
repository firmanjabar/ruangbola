document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadNav();

    // PARALLAX
    var parallax = document.querySelectorAll(".parallax");
    M.Parallax.init(parallax);

    function loadNav() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status != 200) return;

          // Muat daftar tautan menu
          const text = document.querySelectorAll(".topnav, .botnav");
          text.forEach(function (elm) {
            elm.innerHTML = xhttp.responseText;
          });

          // Daftarkan event listener untuk setiap tautan menu
          const link = document.querySelectorAll(".botnav li a, .topnav li a");
          link.forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              // Muat konten halaman yang dipanggil
              if (event.target.attributes.href) {
                page = event.target.attributes.href.value.substr(1);
                loadPage(page);
              } else {
                page2 = event.target.parentNode.attributes.href.value.substr(1);
                loadPage(page2);
              }
            });
          });
        }
      };
      xhttp.open("GET", "nav.html", true);
      xhttp.send();
    }

    // Load page content
    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    function loadPage(page) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          var content = document.querySelector(".body-content");
          if (this.status == 200) {
            content.innerHTML = xhttp.responseText;
            if (page == "home") {
              var parallax = document.querySelectorAll(".parallax");
              M.Parallax.init(parallax);
              getCompetitions();
            } else if (page == "saved") {
              getSavedTeam();
            }
          } else if (this.status == 404) {
            content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
          } else {
            content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
          }
        }
      };
      xhttp.open("GET", "pages/" + page + ".html", true);
      xhttp.send();
    }
  },
  {
    passive: true,
  }
);
