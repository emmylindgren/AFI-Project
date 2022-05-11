import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import EventCard from './EventCard';
import '../custom.css'


function Explore(){

    const [events, setEvents] = useState([]);
    useEffect(()=>{
        axios.get(API_ADRESS + '/api/event')
        .then(res =>{
            setEvents(res.data)
        })
    },[])

    let renderEvents = (events) =>{
        return events.map(event => {
            return (<div key={event.ev_Id}><EventCard event={event}/></div>)
        })
    }

    const [userInfo, setUserInfo] = useState([]);
    useEffect(()=>{
        axios.get(API_ADRESS + '/api/profile/' + localStorage.getItem("profileId"))
        .then(res =>{
            setUserInfo(res.data)
        })
    },[])

    return (
        <div className="page-container">
            <div className="page-content">
                <h1>Hello, {userInfo.pr_Firstname}!</h1>
                <h2>Your next event</h2>
                <br></br>
                {renderEvents(events)}
            </div>
        </div>
    );
}

export default Explore
