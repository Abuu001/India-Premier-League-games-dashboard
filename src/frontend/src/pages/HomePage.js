import {React,useEffect,useState} from 'react'
import "./HomePage.scss";
import axios from "axios"
import TeamTile from '../components/TeamTile';

function HomePage() {


    const[teams,setTeams]=useState([]); 
     
    useEffect(
        ()=>{
     
            fetchAllTeams();
        },[] );

    const fetchAllTeams= async ()=>{ 

        await axios.get(`${process.env.REACT_APP_API_ROOT_URL}/team`).then(response=>{
     
            setTeams([...response.data])
            console.log(response.data); 
          }) 
         
    }
    return (
        <div className="HomePage">
            <div className="header-section">
                <h1  className="app-name">Lugonzo IPL Games Dashboard</h1>
            </div> 

            <div className="team-grid">
               {teams.map(team=>  <TeamTile key={team.id} teamName={team.teamName}/>)}
            </div>
        </div>
    )
}

export default HomePage
