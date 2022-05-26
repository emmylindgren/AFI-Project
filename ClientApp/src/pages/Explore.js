import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { API_ADRESS } from '../config';
import EventCard from '../components/EventCard';
import Button from '../components/Button'
import Search from '../components/Search'
import TabBar from '../components/TabBar';
import '../custom.css'


function Explore(){

    const navigate = useNavigate()

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
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
          };
         
        axios.get(API_ADRESS + '/api/profile/' + localStorage.getItem("profileId"))
        .then(res =>{
            setUserInfo(res.data)
        })

        axios.get(API_ADRESS + '/api/event/latest/' + localStorage.getItem("profileId"))
        .then(res =>{
            setEvent(res.data)
        })
    },[])


    let renderNextEvent = (event) =>{
        return (<div key={event.ev_Id}><EventCard event={event} state={state}/></div>)
    }
    
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');

    const filterEvents = (events, query) => {
        if (!query) {
            return events;
        }
    
        return events.filter((event) => {
            const eventName = event.ev_Title.toLowerCase();
            return eventName.includes(query);
        });
    };

    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredEvents = filterEvents(events, searchQuery);

    const noEventStyle = {
        borderRadius:'10px',
        background:'var(--light-gray)',
        height:'3rem',
        display:'flex',
        alignItems:'center',
        paddingLeft:'2rem',
        marginBottom:'0.8rem',
    }
    
    return (
        <div className="page-container">
            <div className="page-content">
                <h1>Hello, {userInfo.pr_Firstname}!</h1>
                <h2>Your next event</h2>
                <br></br>
                {event.ev_Id === undefined ? <p style={noEventStyle}>You have no upcoming event</p> : renderNextEvent(event)} 
                <Button text="Create event" onClick={() => {navigate('/create-event')}} buttonColorChoice="green" iconChoice="add"/>
                <br></br><br></br>
                <h1>Explore events</h1>
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <br></br>
                {renderEvents(filteredEvents)}
                <br></br><br></br>
            </div>
            <TabBar activeTab={0}/>
        </div>
    );
}

export default Explore
