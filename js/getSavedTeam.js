function getSavedTeamHTML(teams) {
    let teamHTML = "";
    teams.forEach(function (data) {

        let logoTeam = data.crestUrl;
        if (logoTeam == null || logoTeam == '') {
            logoTeam = 'img/liga/404.png';
        } else {
            logoTeam = logoTeam.replace(/^http:\/\//i, 'https://');
        }

        teamHTML += `
        <div class="row" >
          <div class="col m4"></div>
            <div class="col s12 m4">
            <blockquote class="black-text">Click logo to see details</blockquote>
              <div class="card grey darken-4">
                <div class="row">
                  <a href="./team.html?id=${data.id}">
                    <div class="col s2"></div>
                      <div class="col s8 card-image waves-effect waves-block waves-light">
                        <img src="${logoTeam}" />
                      </div>
                    <div class="col s2"></div>
                  </a>
                </div>
                <hr>
                <div class="card-content">
                  <span class="truncate"><b>${data.name} (${data.tla})</b></span>
                  <a href="${data.website}" target="_blank">  
                    <p>${data.website}</p>
                  </a>
                  <hr>
                  <p>Berdiri: ${data.founded}</p>
                  <p>Stadion: ${data.venue}</p>
                  <p>Warna: ${data.clubColors}</p>
                  <p>E-mail: ${data.email}</p>
                  <p>Telepon: ${data.phone}</p>
                  <p>Alamat: ${data.address}</p>
                </div>
              </div>
            </div>
          <div class="col m4"></div>
        </div>
        `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("team-fav").innerHTML = teamHTML;
}