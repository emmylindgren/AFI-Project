import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import EventCard from './EventCard';
import Button from './Button'
import Search from './Search'
import TabBar from './TabBar';
import '../custom.css'
import { Link} from 'react-router-dom';

const imgStyle = {
    width: '3rem',
    height: '3rem',
    borderRadius: '100%'
}

const attendeeContainer = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'red',
}

const attendeeNameText = {
    marginLeft: '1rem',
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


function AttendeesGoingInfo({attendeeId, attendee, event}){

    const stateInfo = ({
        id: attendeeId,
        event: event,
        returnTo: "/attendees"
    })
    return (
        <div style={attendeeContainer}>
            <Link to="../attendee-info" style={clickableEventCard} state={{stateInfo: stateInfo}} ><span></span></Link>
            <img style={imgStyle} src={API_ADRESS + "/api/profile/image/" + attendeeId} ></img>
            <div style={attendeeNameText}>
                <p style={{display: 'inline'}}>{attendee.going.pr_Firstname} {attendee.going.pr_Lastname}</p>
                <p className='gray-body-text'>{attendee.going.pr_City}</p>
            </div> 
        </div>      
    );
}

export default AttendeesGoingInfo
