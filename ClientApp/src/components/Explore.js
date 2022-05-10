import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import EventCard from './EventCard';
import '../custom.css'


function Explore(){

    /*const [eventAttendees, setEventAttendees] = useState([]);
    useEffect(() => {
    const getAttendees = async () => {
        let res = await axios.get(API_ADRESS + '/api/event')
        .then(function(res) {
            console.log(res.data);
            return res.data;
            //setEventInfo([res.data.ev_Title, res.data.ev_Street, res.data.ev_DateTime]);
        })    
        }
        getAttendees();
    }, [])*/

    const [events, setEvents] = useState([]);
    useEffect(()=>{
        axios.get(API_ADRESS + '/api/event')
        .then(res =>{
            console.log(res.data)
            setEvents(res.data)
        })
    },[])

    let renderEvents = (events) =>{
        return events.map(event => {
            console.log(event)
            return (<div key={event.ev_Id}><EventCard event={event}/></div>)
        })
    }

    return (
        <div className="page-container">
            <div className="page-content">
                {renderEvents(events)}
            </div>
        </div>
    );
}

export default Explore
