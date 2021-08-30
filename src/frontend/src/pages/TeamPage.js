import {React , useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import MatchDetailCard from '../components/MatchDetailCard'
import MatchSmallCard from '../components/MatchSmallCard'
import "./TeamPage.scss";
import axios from "axios"
import {Link} from "react-router-dom"
import { PieChart } from 'react-minimal-pie-chart';
 
function TeamPage() {

    const [team,setTeam] = useState({ matches : [] }); 
    const [matches,setMatches] = useState([]);  
    const {teamName} =useParams();

    useEffect(
        ()=>{
     
            fetchMatches();
        },[teamName] );

    const fetchMatches = async ()=>{ 

        await axios.get(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`).then(response=>{
            setTeam(response.data); 
            setMatches([...response.data.matches])  
          }) 
       
    }

    if(!team || !team.teamName){
        return <h1>Team Not Found</h1>
    }
   
    return (
        <div className="TeamPage">
          
           <div className="team-name-section"> <h1 className="teamName">{team.teamName}</h1>  </div> 

           <div className="win-loss-section">
               <h4>Wins  / Losses</h4>
               <PieChart
                    data={[
                        { title: 'Wins', value: team.totalWins, color: '#099e4f' },
                        { title: 'Losses', value: team.totalMatches-team.totalWins , color: 'rgb(236, 44, 44)' }
                    ]}
                    animate={true}
                    lineWidth="100" 
                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                    />
 
           </div>

           <div className="match-detail-section" >
               <h3>Latest Matches</h3>
                <MatchDetailCard  teamName={team.teamName}  match={team.matches[0]} />  
           </div> 
           
            {matches.slice(1).map(match =>{ 
                return( 
                        <MatchSmallCard  key={matches.id} teamName={team.teamName}   match={match} />
                )
            })} 

            <div className="more-link">
                <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}> More > </Link> 
            </div>
            
        </div>
    )
}
 
export default TeamPage
 