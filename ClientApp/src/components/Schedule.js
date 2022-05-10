import React, { useEffect, useState } from 'react'
import '../custom.css'
import ScheduleEventCard from './ScheduleEventCard'
import axios from 'axios'
import { API_ADRESS } from '../config'

function Schedule() {

    const [events, setEvents] = useState([]);


    console.log("idag:" + new Date(Date.now()).toDateString());

    useEffect(()=>{
        axios.get(API_ADRESS + '/api/event/profileID/'+ 1)
        .then(res =>{
            setEvents(res.data)
        })
    },[])

    let renderEvents = (events) =>{
        return events.map(event => {
            console.log(event)
            var currentDate = new Date(Date.now());
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
            var todayhasbeen = false;
   
/*
            if(currentDate.toDateString() == new Date(Date.now()).toDateString()){
                console.log("idag");
            }*/

            if(currentDate.toDateString() == new Date(event.ev_DateTime).toDateString()){
                /*Något sådant för att skriva ut idag eller ej idag också? 
                if(new Date(event.ev_DateTime).toDateString() == new Date(Date.now()).toDateString()){
                    todayhasbeen = true;
                }*/
                console.log("samma dag")
                
                return (
                    <div>
                        <div key={event.ev_Id}><ScheduleEventCard event={event}/></div>
                    </div>
                )
            }
            else{
                console.log("inte samma dag")
                currentDate = new Date(event.ev_DateTime);
                var eventDate = new Date(event.ev_DateTime);
                return (
                    <div>
                        <h2>{days[(eventDate.getDay())]}</h2>
                        <h2 style={{fontWeight:'200',}}>{eventDate.getDate() + " " + months[eventDate.getMonth()]}</h2>
                        <div key={event.ev_Id}><ScheduleEventCard event={event}/></div>
                    </div>
                )
                    
            }



          /*  return (<div key={event.ev_Id}><ScheduleEventCard event={event}/></div>)*/
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
