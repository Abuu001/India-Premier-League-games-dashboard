import {React , useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import MatchDetailCard from '../components/MatchDetailCard'
import MatchSmallCard from '../components/MatchSmallCard'
import "./TeamPage.css";
import axios from "axios"

function TeamPage() {

    const [team,setTeam] = useState({ matches : [] }); 
    const [matches,setMatches] = useState([]);  
    const {teamName} =useParams();

    useEffect(
        ()=>{
     
            fetchMatches();
        },[teamName] );

    const fetchMatches = async ()=>{ 

        await axios.get(`http://localhost:3002/team/${teamName}`).then(response=>{
            setTeam(response.data); 
            setMatches([...response.data.matches])
            console.log(response.data); 
          }) 
       
    }

    if(!team || !team.teamName){
        return <h1>Team Not Found</h1>
    }

    return (
        <div className="TeamPage">
          
            <h1>{team.teamName}</h1>    
            <MatchDetailCard  teamName={team.teamName}  match={team.matches[0]} />  
           
            {matches.slice(1).map(match =>{ 
                return( 
                        <MatchSmallCard  teamName={team.teamName}   match={match} />
                )
            })}
            
        </div>
    )
}

export default TeamPage
 