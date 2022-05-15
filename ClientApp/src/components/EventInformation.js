import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import '../custom.css'
import EventShortDetails from './EventShortDetails';
import AttendingInfoCard from './AttendingInfoCard';


function EventInformation(){

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

    const [events, setEvents] = useState();
    
    useEffect(()=>{
        console.log("inne")
        axios.get(API_ADRESS + '/api/event/1')
        .then(res =>{
            console.log("hej")
            console.log(res.data)
            setEvents(res.data)
        })
    },[])


    //  <p>{events.ev_Description}</p> <EventShortDetails event={events} returnTo={"/schedule"}/> <AttendingInfoCard event={events}/>
    return (
        <div>
           <EventShortDetails event={events} returnTo={"/schedule"}/>
            <div className="page-container">
                <div className="page-content">
                    <h3>Description</h3>
                    <p>{events.ev_Description}</p>
                    <AttendingInfoCard event={events}/>
                </div>
            </div>
        </div>
    );
}

export default EventInformation
