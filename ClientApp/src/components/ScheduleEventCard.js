import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { API_ADRESS } from '../config'
import { useState } from 'react'
/**
 * Format: 
 * <ScheduleEventCard {eventId=5}/>
 */

const wrapperScheduleEventStyle ={
    background:'var(--deep-green)',
    display:'grid',
    gridTemplateColumns:'1fr 4fr 0.5fr',
    cursor:'pointer',
    borderRadius:'10px',
    color:'var(--white)',
    alignItems: 'center',
    height:'6rem',
}

const timeWrapper ={
    background:'var(--light-green)',
    height:'100%',
    width:'90px',
    borderRadius:'10px',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:'2rem',
    color: 'var(--black)',
}

const textStyle ={
    margin: '0px',
}

// TODO: 
// Get information from event regarding time, address, title. 
// first div onlick go to that event information site! 
function ScheduleEventCard({event}) {

    const [eventInfo, setEventInfo] = useState([]);
    var date2 = new Date(event.ev_DateTime);

    
    console.log(date2);
    var date3 = date2.getHours();
    
    console.log(date3);

    let hours = "12";
    let minutes = "12";
    let hoursToInt = parseInt(hours);
    let timeVar = "AM";

    if(hoursToInt > 12 && hoursToInt < 24) {
        hours = hoursToInt % 12;
        timeVar = "PM";
    }
    else if(hours === "24" || hours === "00") {
        hours = 12;
        timeVar = "PM";
    }

  return (
    <div style={wrapperScheduleEventStyle}>
        <div style={timeWrapper}>
            <h4 style={textStyle}>{hours}:{minutes}</h4>
            <p style={textStyle}>{timeVar}</p>
        </div>
        <div>
            <h4 style={textStyle}>Namn på eventet</h4>
            <p style={textStyle}>Address</p>
        </div>
        <img height='25rem' src='icons/GoToIcon.svg'/>
    </div>
  )
}

export default ScheduleEventCard
