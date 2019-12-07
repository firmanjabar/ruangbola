function getLastMatchHTML(data) {
    let matchHTML = '';
    // console.log(data.matches.slice().reverse());

    data.matches.slice().reverse().forEach(match => {
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

        matchHTML += `
            <li class="collection-item avatar hidden">
                <div class="row grey darken-4 collapsible-header valign-wrapper" style="margin:0px;">
                    <div class="col s12 m5 center-align home">
                        ${match.homeTeam.name}
                    </div>
                    <div class="col s12 m2 center-align">
                        <p>${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}</p>
                    </div>
                    <div class="col s12 m5 center-align away">
                        ${match.awayTeam.name}
                    </div>
                </div>
                <div class="grey darken-4 collapsible-body center-align">
                    <h6><b>${match.competition.name}</b></h6>
                    <p>Pekan ke-${match.matchday}</p>
                    <p>${ts.toLocaleDateString('en-GB', options)}</p>
                    <p>Wasit ${match.referees[0].name}</p>
                </div>
            </li>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("last-match").innerHTML = matchHTML;
    });

    function loadMore() {
        document.querySelector("#last-match .hidden").classList.remove("hidden");
    }

    loadMore();

    document.getElementById("btnLoadMore").addEventListener("click", loadMore);
}