function getMatchTodayHTML(data) {
    data.matches.forEach(match => {
        // console.log(match);
        let ts = new Date(match.utcDate);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short'
        };

        function getImgHome(match) {
            let final = getAllCrestUrl().then(function (data) {
                // console.log(match);
                for (let i = 0; i <= data.length; i++) {
                    let idCompDb = data[i].season.id;
                    let idCompNm = match.season.id;
                    // console.log(i);
                    if (idCompNm === idCompDb) {
                        if (idCompNm == 495 || idCompNm == 2000) {
                            let standing = data[i].standings;
                            let img = '';
                            // checkStandingHome(standing, match);
                            standing.forEach(standing => {
                                // ini length nya
                                standing.table.forEach(table => {
                                    // console.log(table);
                                    let idHomeDb = table.team;
                                    let idHome = match.homeTeam;

                                    if (idHomeDb.id == idHome.id) {
                                        img = convertImg(idHomeDb.crestUrl);
                                        // console.log(img)
                                        return img;
                                    }
                                    return table
                                })
                                return standing
                            });
                            return img;
                        } else {
                            table = data[i].standings[0].table;
                            // console.log(data[i].standings);
                            for (let j = 0; j <= table.length; j++) {
                                let idHomeDb = table[j].team;
                                // console.log(idHomeDb);
                                let idHome = match.homeTeam;
                                // console.log(match);

                                if (idHomeDb.id == idHome.id) {
                                    // console.log(idHome.id);
                                    // console.log(idHomeDb.id);
                                    var img = convertImg(idHomeDb.crestUrl);
                                    // console.log(img);
                                    return img;
                                }
                            }
                            return table;
                        }
                        // return idCompNm;
                    }
                }
            })
            // console.log(final);
            return final;
        }


        function getImgAway(match) {
            let final = getAllCrestUrl().then(function (data) {
                // console.log(match);
                for (let i = 0; i <= data.length; i++) {
                    let idCompDb = data[i].season.id;
                    let idCompNm = match.season.id;
                    // console.log(i);
                    if (idCompNm === idCompDb) {
                        if (idCompNm == 495 || idCompNm == 2000) {
                            let standing = data[i].standings;
                            let img = '';
                            // checkStandingHome(standing, match);
                            standing.forEach(standing => {
                                // ini length nya
                                standing.table.forEach(table => {
                                    // console.log(table);
                                    let idHomeDb = table.team;
                                    let idHome = match.awayTeam;

                                    if (idHomeDb.id == idHome.id) {
                                        img = convertImg(idHomeDb.crestUrl);
                                        // console.log(img)
                                        return img;
                                    }
                                    return table
                                })
                                return standing
                            });
                            return img;
                        } else {
                            table = data[i].standings[0].table;
                            // console.log(data[i].standings);
                            for (let j = 0; j <= table.length; j++) {
                                let idHomeDb = table[j].team;
                                // console.log(idHomeDb);
                                let idHome = match.awayTeam;
                                // console.log(match);

                                if (idHomeDb.id == idHome.id) {
                                    // console.log(idHome.id);
                                    // console.log(idHomeDb.id);
                                    var img = convertImg(idHomeDb.crestUrl);
                                    // console.log(img);
                                    return img;
                                }
                            }
                            return table;
                        }
                        // return idCompNm;
                    }
                }
            })
            // console.log(final);
            return final;
        }

        function convertImg(img) {
            let logoTeam = img;
            if (logoTeam == null || logoTeam == '' || logoTeam == undefined) {
                logoTeam = 'img/liga/404.png';
                return logoTeam;
            } else {
                logoTeam = logoTeam.replace(/^http:\/\//i, 'https://');
                return logoTeam;
            }
        }

        async function getImg(match) {
            try {
                var val = await getImgHome(match);
                var val2 = await getImgAway(match);
                // console.log(val);
                let html = '';
                html += `
                <li class="collection-item avatar hmm">
                <div class="row grey darken-4 collapsible-header valign-wrapper hidden" style="margin:0px;">
                    <div class="col s12 m5 center-align home">
                    <a href="./team.html?id=${match.homeTeam.id}">
                        <img src="${val}" alt="${match.homeTeam.name}" class="responsive-img img-home" style="height: 50px;">
                        <br>
                        ${match.homeTeam.name}
                    </a>
                    </div>
                    <div class="col s12 m2 center-align score">
                        <p>VS</p>
                    </div>
                    <div class="col s12 m5 center-align away">
                    <a href="./team.html?id=${match.awayTeam.id}">
                        <img src="${val2}" alt="${match.awayTeam.name}" class="responsive-img img-home" style="height: 50px;">
                        <br>
                        ${match.awayTeam.name}
                    </a>
                    </div>
                </div>
                <div class="grey darken-4 collapsible-body center-align info">
                    <p>Pekan ke-${match.matchday}</p>
                    <p>${match.homeTeam.name} (HOME)</p>
                    <p>VS</p>
                    <p>${match.awayTeam.name} (AWAY)</p>
                    <p>${ts.toLocaleDateString('en-GB', options)}</p>
                </div>
                </li>
                `;

                document.getElementById("mt").innerHTML += html;
                document.getElementById("btnLoadMore").addEventListener("click", loadMore);
            } catch (err) {
                console.log('Error: ', err.message);
            }
        }

        getImg(match);
    });

    function loadMore() {
        document.querySelector("#mt .hidden").classList.remove("hidden");
    }
}