function getNextMatchHTML(data) {
    let nextMatchHTML = "";

    let nextMatch = data.matches[0];
    let ts = new Date(nextMatch.utcDate);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };
    // console.log(ts.toLocaleDateString('us-US', options));

    function getHome(id) {
        caches.match(base_url + "teams/" + id).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    let cek = '';
                    let logoTeam = data.crestUrl;
                    if (logoTeam == null || logoTeam == '') {
                        logoTeam = 'img/liga/404.png';
                    } else {
                        logoTeam = logoTeam.replace(/^http:\/\//i, 'https://');
                    }

                    cek += `
                    <a href="./team.html?id=${data.id}">
                        <img src="${logoTeam}" alt="" class="responsive-img" style="width: 50px;">
                        <br>
                        ${data.name}
                    </a>
                    `;

                    document.getElementById("next-home").innerHTML = cek;
                })
            }
        })
        fetchApi(base_url + "teams/" + id)
            .then(status)
            .then(json)
            .then(function (data) {

                let cek = '';
                let logoTeam = data.crestUrl;
                if (logoTeam == null || logoTeam == '') {
                    logoTeam = 'img/liga/404.png';
                } else {
                    logoTeam = logoTeam.replace(/^http:\/\//i, 'https://');
                }

                cek += `
                <a href="./team.html?id=${data.id}">
                    <img src="${logoTeam}" alt="" class="responsive-img" style="width: 50px;">
                    <br>
                    ${data.name}
                </a>
                `;

                document.getElementById("next-home").innerHTML = cek;
            });
    }

    function getAway(id) {
        caches.match(base_url + "teams/" + id).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    let cek = '';
                    let logoTeam = data.crestUrl;
                    if (logoTeam == null || logoTeam == '') {
                        logoTeam = 'img/liga/404.png';
                    } else {
                        logoTeam = logoTeam.replace(/^http:\/\//i, 'https://');
                    }

                    cek += `
                    <a href="./team.html?id=${data.id}">
                        <img src="${logoTeam}" alt="" class="responsive-img" style="width: 50px;">
                        <br>
                        ${data.name}
                    </a>
                    `;

                    document.getElementById("next-away").innerHTML = cek;
                })
            }
        })
        fetchApi(base_url + "teams/" + id)
            .then(status)
            .then(json)
            .then(function (data) {

                let cek = '';
                let logoTeam = data.crestUrl;
                if (logoTeam == null || logoTeam == '') {
                    logoTeam = 'img/liga/404.png';
                } else {
                    logoTeam = logoTeam.replace(/^http:\/\//i, 'https://');
                }

                cek += `
                <a href="./team.html?id=${data.id}">
                    <img src="${logoTeam}" alt="" class="responsive-img" style="width: 50px;">
                    <br>
                    ${data.name}
                </a>
                `;

                document.getElementById("next-away").innerHTML = cek;
            });
    }

    getHome(nextMatch.homeTeam.id);
    getAway(nextMatch.awayTeam.id);

    nextMatchHTML += `
    <div class="row grey darken-4 collapsible-header valign-wrapper" style="margin:0px;">
        <div class="col s12 m5 center-align" id="next-home">
        </div>
        <div class="col s12 m2 center-align">
            <p> vs </p>
        </div>
        <div class="col s12 m5 center-align" id="next-away">
        </div>
    </div>
    <div class="grey darken-4 collapsible-body center-align">
        <h6><b>${nextMatch.competition.name}</b></h6>
        <p>${ts.toLocaleDateString('en-GB', options)}</p>
    </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("next-match").innerHTML = nextMatchHTML;
}