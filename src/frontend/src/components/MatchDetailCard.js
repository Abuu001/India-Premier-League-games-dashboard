import React from 'react'
import {Link} from "react-router-dom"

function MatchDetailCard({teamName,match}) {

    if(!match) return null;

    const otherTeam = match.team1 === teamName ?  match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`;

    return (
        <div>
            <h3>Latest matches</h3> 
            <h1><i> vs   <Link to={otherTeamRoute}> {otherTeam} </Link></i></h1>
            <h2>{match.date}</h2>
            <h3>{match.venue}</h3>

            <h3>{match.matchWinner} won by {match.resultMargin}  {match.result}</h3>
        </div>
    )
}

export default MatchDetailCard
