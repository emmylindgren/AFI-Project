import React, { useEffect, useState } from 'react'
import '../custom.css'
import ScheduleEventCard from './ScheduleEventCard'
import axios from 'axios'
import { API_ADRESS } from '../config'


const eventCardStyle = {
    marginBottom:'0.8rem',
}

const dateTextStyle = {
    display:'flex',
    flexDirection:'row',
    gap:'0.5rem',
    marginTop:'2rem',
    marginBottom:'0.5rem',
}

function Schedule() {

    const [events, setEvents] = useState([]);
    useEffect(()=>{
        axios.get(API_ADRESS + '/api/event/profileID/'+ 1)
        .then(res =>{
            setEvents(res.data)
        })
    },[])

    let renderEvents = (events) =>{
        let currentDate = new Date(Date.now());
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
        let todayhasbeen = false;

        return events.map(event => {
            console.log(event)
            let eventDate = new Date(event.ev_DateTime);

            if(currentDate.toDateString() == eventDate.toDateString()){
                
                if(currentDate.toDateString() == new Date(Date.now()).toDateString()){
                    //Today
                    todayhasbeen = true;
                    return (
                        <div>
                            <div style={dateTextStyle}>
                                <h2 style = {{textAlign:'left', fontSize:'1.3rem',}}>Today</h2>
                                <h2 style={{fontWeight:'200', fontSize:'1.3rem',}}>{eventDate.getDate() + " " + months[eventDate.getMonth()]}</h2>
                            </div>
                            <div key={event.ev_Id} style={eventCardStyle}><ScheduleEventCard event={event}/></div>
                        </div>
                    )
                }
            
                //Same day as the last one
                return (
                    <div>
                        <div key={event.ev_Id} style={eventCardStyle}><ScheduleEventCard event={event}/></div>
                    </div>
                )
            }
            else{
                // Another day than the last one
                currentDate = eventDate;
                return (
                    <div>
                        <div style={dateTextStyle}>
                            <h2 style = {{textAlign:'left', fontSize:'1.3rem',}}>{days[(eventDate.getDay())]}</h2>
                            <h2 style={{fontWeight:'200', fontSize:'1.3rem',}}>{eventDate.getDate() + " " + months[eventDate.getMonth()]}</h2>
                        </div>
                        <div style ={eventCardStyle} key={event.ev_Id}><ScheduleEventCard event={event}/></div>
                    </div>
                )        
            }
        })
    }

  return (
    <div className='page-container'>
        <div className='page-content'>
            <h1>Coming up</h1>
            {renderEvents(events)}
        </div>
    </div>
  )

}

export default Schedule
