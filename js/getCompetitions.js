function getCompetitionsHTML(data) {
  let leagueHTML = "";
  data.competitions.forEach(function (liga) {
    leagueHTML += `
              <div class="col s12 m6 l4" >
              <a href="./standing.html?id=${liga.id}">
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img alt="${liga.area.name}" src="img/liga/${liga.code}.png" style="width:100%"/>
                  </div>
                  <hr>
                  <div class="card-content">
                    <span class="truncate"><b>${liga.name}</b></span>
                    <p>${liga.area.name}</p>
                    <hr>
                    <p>Kode Liga: ${liga.code}</p>
                    <p>Mulai: ${liga.currentSeason.startDate}</p>
                    <p>Berakhir: ${liga.currentSeason.endDate}</p>
                    <p>Pertandingan: ${liga.currentSeason.currentMatchday}</p>
                  </div>
                </div>
              </a>
              </div>
              `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("leagues").innerHTML = leagueHTML;
}