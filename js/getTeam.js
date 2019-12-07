function getTeamHTML(data, resolve) {
    let squadHTML = "";
    let teamHTML = "";

    let logoTeam = data.crestUrl;
    if (logoTeam == null || logoTeam == '') {
        logoTeam = 'img/liga/404.png';
    } else {
        logoTeam = logoTeam.replace(/^http:\/\//i, 'https://');
    }

    teamHTML += `
        <div class="col m3"></div>
            <div class="col s12 m6">
            <div class="card grey darken-4">
                <div class="row">
                <div class="col s2"></div>
                <div class="col s8 card-image waves-effect waves-block waves-light">
                    <img src="${logoTeam}" />
                </div>
                <div class="col s2"></div>
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
        <div class="col m3"></div>
    `;

    data.squad.forEach(dataSquad => {
        squadHTML +=
            `
            <li class="collection-item avatar">
                <div class="grey darken-4 collapsible-header">
                <i class="material-icons">person</i>
                ${dataSquad.name}
                </div>
                <div class="grey darken-4 collapsible-body">
                <h5>${dataSquad.name}</h5>
                <p>Posisi       : ${dataSquad.position}</p>
                <p>TTL          : ${dataSquad.countryOfBirth}, ${dataSquad.dateOfBirth}</p>
                <p>Kebangsaan   : ${dataSquad.nationality}</p>
                <p>No. Punggung : ${dataSquad.shirtNumber}</p>
                <p>Peran        : ${dataSquad.role}</p>
                </div>
            </li>
        `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("squad").innerHTML = squadHTML;
    document.getElementById("team").innerHTML = teamHTML;

    resolve(data);
}