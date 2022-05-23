import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import '../custom.css'
import EventShortDetails from '../components/EventShortDetails';
import AttendingInfoCard from '../components/AttendingInfoCard';
import SuitableForEvent from '../components/SutiableForEvent';
import LoadingCard from '../components/LoadingCard';
import EventInfoCat from '../components/EventInfoCat';
import EventInfoButtons from '../components/EventInfoButtons';
import { useLocation } from 'react-router-dom';


function EventInformation(){

    const [events, setEvents] = useState();
    const [loaded, setLoaded] = useState(false);
    const location = useLocation();
    const {eventInfo} = location.state;
   
   
    
    useEffect(()=>{
        axios.get(API_ADRESS + '/api/event/' + eventInfo.eventId)
        .then(res =>{
            setEvents(res.data)
            setLoaded(true)
        })
    },[])


    //  <p>{events.ev_Description}</p> <EventShortDetails event={events} returnTo={"/schedule"}/> <AttendingInfoCard event={events}/> <SuitableForEvent event={events}/>
    return (
       <div>
           {loaded ? (
            <div>
                <EventShortDetails event={events} returnTo={eventInfo.returnTo}/>
                <div className="page-container">
                    <div className="page-content">
                        <h3>Description</h3>
                        <p>{events.ev_Description}</p>
                        <h3>Attending</h3>
                        <AttendingInfoCard event={events} returnTo={eventInfo.returnTo}/>
                        <SuitableForEvent ev_Disabilities={events.ev_Disabilities}/>
                        <EventInfoCat ev_Categories={events.ev_Categories}/>
                        <EventInfoButtons event={events}/>
                    </div>
                </div>
            </div>
            ) : (
            <div style={{marginTop: '90%'}}>
                <LoadingCard/>
            </div>
            )}
        </div>
        
    );
}

export default EventInformation
