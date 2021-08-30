import {React }from 'react'
import {Link} from "react-router-dom"
import "./YearSelector.scss"

function YearSelector({teamName}) {

    let years=[];
    const startYear=process.env.REACT_APP_DATA_START_YEAR;
    const endYear=process.env.REACT_APP_DATA_END_YEAR;

    for(let i= startYear; i<=endYear; i++){
        years.push(i);
    }

    return (
        <div className="year-selector">
            <ol  className="years-list">
                { years.map(year=>(
                        <li  key={year}>
                            <Link  to={`/teams/${teamName}/matches/${year}`}><b id="years-color">{year}</b></Link>
                        </li>)
                )}
            </ol>
        </div>
    )
}

export default YearSelector
