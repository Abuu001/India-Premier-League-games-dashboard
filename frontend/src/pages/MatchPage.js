import {React , useEffect,useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios"
import MatchDetailCard from '../components/MatchDetailCard';
import "./MatchPage.scss"
import YearSelector from './YearSelector';

function MatchPage() {

    const[matches,setMatches]=useState([]);
    const {teamName,year} =useParams(); 
     
    useEffect(
        ()=>{
     
            fetchMatches();
        },[teamName,year] );

    const fetchMatches = async ()=>{ 

        await axios.get(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`).then(response=>{
     
            setMatches([...response.data]) 
          }) 
         
    }

    return (
        <div className="MatchPage">
            <div className="year-selector">
                    <h1>Select Year</h1>
                    <YearSelector teamName={teamName} />
            </div>

            <div className="match-info">
              <h1 className="page-heading">{teamName} matches in {year}</h1>
                {matches.length===0  ?   <h4 id="no-match">No matches available</h4>
                                 :  
                matches.map(match =>{ 
                    return( 
                         <MatchDetailCard  key={match.id} teamName={teamName}   match={match} /> 
                    )
                })}
            </div>
       

        </div>
    )
}

export default MatchPage
