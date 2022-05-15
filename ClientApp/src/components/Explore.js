import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import EventCard from './EventCard';
import '../custom.css'


function Explore(){

    const [events, setEvents] = useState([]);
    const [state, setState] = useState('loading');  
    useEffect(()=>{
        axios.get(API_ADRESS + '/api/event')
        .then(res =>{
            setEvents(res.data)
            setState('loaded')
        })
    },[])

    let renderEvents = (events) =>{
        return events.map(event => {
            return (<div key={event.ev_Id}><EventCard event={event} state={state}/></div>)
        })
    }

    const [userInfo, setUserInfo] = useState([]);
    const [event, setEvent] = useState([]);

    useEffect(()=>{
        axios.get(API_ADRESS + '/api/profile/' + localStorage.getItem("profileId"))
        .then(res =>{
            setUserInfo(res.data)
        })

        axios.get(API_ADRESS + '/api/event/latest/' + 1)
        .then(res =>{
            console.log(res.data)
            setEvent(res.data)
        })
    },[])


    let renderNextEvent = (event) =>{
        return (<div key={event.ev_Id}><EventCard event={event}/></div>)
    }

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
