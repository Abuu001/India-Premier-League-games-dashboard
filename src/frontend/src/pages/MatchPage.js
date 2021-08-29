import {React , useEffect,useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios"
import MatchDetailCard from '../components/MatchDetailCard';


function MatchPage() {

    const[matches,setMatches]=useState([]);
    const {teamName,year} =useParams(); 
     
    useEffect(
        ()=>{
     
            fetchMatches();
        },[] );

    const fetchMatches = async ()=>{ 

        await axios.get(`http://localhost:3002/team/${teamName}/matches?year=${year}`).then(response=>{
     
            setMatches([...response.data])
            console.log(response.data); 
          }) 
        
    }

    return (
        <div className="MatchPage">
            <h1>Match Page</h1>

            {matches.map(match =>{ 
                return( 
                        <MatchDetailCard  teamName={teamName}   match={match} /> 
                )
            })}

        </div>
    )
}

export default MatchPage
