function getMatchTodayHTML(data) {
    let matchHTML = "";

    if (data.count != 0) {
        data.matches.forEach(match => {
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
                <li class="collection-item avatar">
                    <div class="row grey darken-4 collapsible-header valign-wrapper" style="margin:0px;">
                        <div class="col s12 m5 center-align home">
                            ${match.homeTeam.name}
                        </div>
                        <div class="col s12 m2 center-align">
                            <p> vs </p>
                        </div>
                        <div class="col s12 m5 center-align away">
                            ${match.awayTeam.name}
                        </div>
                    </div>
                    <div class="grey darken-4 collapsible-body center-align">
                        <h6><b>${data.competition.name}</b></h6>
                        <p>Pekan ke-${match.matchday}</p>
                        <p>${ts.toLocaleDateString('en-GB', options)}</p>
                    </div>
                </li>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("mt").innerHTML = matchHTML;
        });
    } else {
        matchHTML += `
            <li class="collection-item avatar">
                <div class="row grey darken-4 collapsible-header valign-wrapper" style="margin:0px;">
                    NO MATCHES TODAY! 😔
                </div>
            </li>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("mt").innerHTML = matchHTML;
    }
}