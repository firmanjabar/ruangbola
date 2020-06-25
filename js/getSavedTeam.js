function getSavedTeamHTML(teams) {
  let teamHTML = "";
  teams.forEach(function (data) {
    let logoTeam = data.crestUrl;
    if (logoTeam == null || logoTeam == "") {
      logoTeam = "img/liga/404.png";
    } else {
      logoTeam = logoTeam.replace(/^http:\/\//i, "https://");
    }

    teamHTML += `
    <div class="container">
    <div class="col s12">
      <div class="card-panel grey lighten-5 z-depth-1">
        <div class="row">
          <div class="col s12 m6 center">
            <a href="./team.html?id=${data.id}">
              <img alt="${data.name}" src="${logoTeam}" class="responsive-img">
            </a>
          </div>
          <div class="col s12 m6">
            <span class="black-text">
              <div class="hide-on-small-only">
                <hr>
                <span class="truncate"><b>${data.name} (${data.tla})</b></span>
                <a href="${data.website}" target="_blank">  
                  <p class="truncate">${data.website}</p>
                </a>
                <hr>
                <p><i class="tiny material-icons">account_balance</i> ${data.founded}</p>
                <p><i class="tiny material-icons">flag</i> ${data.venue}</p>
                <p><i class="tiny material-icons">person</i> ${data.clubColors}</p>
                <p><i class="tiny material-icons">location_on</i> ${data.address}</p>
                <p><i class="tiny material-icons">phone</i> ${data.phone}</p>
                <a style="margin-top:10px;" href="./team.html?id=${data.id}" class="cyan darken-4 waves-effect waves-light btn">
                  <i class="material-icons left">details</i>Detail
                </a>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>
    `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("team-fav").innerHTML = teamHTML;
}
