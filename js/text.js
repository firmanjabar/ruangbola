let h = `
<div class="row grey darken-4 collapsible-header valign-wrapper" style="margin:0px;">
    <div class="col s12 m5 center-align home">
    </div>
    <div class="col s12 m2 center-align score">
        <p>${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}</p>
    </div>
    <div class="col s12 m5 center-align away">
    </div>
</div>
<div class="grey darken-4 collapsible-body center-align">
    <h6><b>${match.competition.name}</b></h6>
    <p>Pekan ke-${match.matchday}</p>
    <p>${match.homeTeam.name} (HOME)</p>
    <p>${match.score.fullTime.homeTeam}</p>
    <p>VS</p>
    <p>${match.score.fullTime.awayTeam}</p>
    <p>${match.awayTeam.name} (AWAY)</p>
    <p>${ts.toLocaleDateString('en-GB', options)}</p>
    <p>Wasit ${match.referees[0].name}</p>
</div>
`

const divAtas = document.createElement('div');