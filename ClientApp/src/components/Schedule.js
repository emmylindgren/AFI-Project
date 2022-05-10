import React, { useEffect, useState } from 'react'
import '../custom.css'
import ScheduleEventCard from './ScheduleEventCard'
import axios from 'axios'
import { API_ADRESS } from '../config'

function Schedule() {

    const [events, setEvents] = useState([]);
    useEffect(()=>{
        axios.get(API_ADRESS + '/api/event/profileID/'+ 1)
        .then(res =>{
            console.log(res.data)
            setEvents(res.data)
        })
    },[])

    let renderEvents = (events) =>{
        return events.map(event => {
            console.log(event)
            return (<div key={event.ev_Id}><ScheduleEventCard event={event}/></div>)
        })
    }

  return (
    <div className='page-container'>
        <div className='page-content'>
        {renderEvents(events)}
        </div>
    </div>
  )

}

export default Schedule
