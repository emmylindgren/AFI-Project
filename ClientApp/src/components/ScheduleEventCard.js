import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { API_ADRESS } from '../config'
import { useState } from 'react'
import { Link, renderMatches } from 'react-router-dom';
/**
 * Format: 
 * <ScheduleEventCard {eventId=5}/>
 * Use two styles on one object: style={{...textStyle, marginBottom:'0.5rem'}}
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
    marginBottom:'0px',
}

const clickableEventCard = {
    position: 'absolute', 
    display: 'inline-block',
    width: '100%',
    height: '100%',
    maxHeight: '6rem',
    float: 'left',
    left: '0',
    zIndex: '1',
}

// TODO:  
// first div onlick go to that event information site! 
function ScheduleEventCard({event}) {

    const eventInfo = ({
        eventId: event.ev_Id,
        returnTo: "/schedule"
    });


    var date = new Date(event.ev_DateTime);
    let hours = date.getHours();
    let minutes = ((date.getMinutes()<10?'0':'') + date.getMinutes());
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
        <Link to="../event-information" style={clickableEventCard} state={{eventInfo: eventInfo}} ><span></span></Link>
        <div style={timeWrapper}>
            <h4 style={textStyle}>{hours}:{minutes}</h4>
            <p style={textStyle}>{timeVar}</p>
        </div>
        <div>
            <h4 style={{marginBottom:'0.5rem',}}>{event.ev_Title}</h4>
            <p style={textStyle}>{event.ev_Street}</p>
        </div>
        <img height='25rem' src='icons/GoToIcon.svg'/>
    </div>
  )
}

export default ScheduleEventCard
