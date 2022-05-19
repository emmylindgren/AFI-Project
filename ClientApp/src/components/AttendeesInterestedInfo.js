import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { API_ADRESS } from '../config';
import EventCard from './EventCard';
import Button from './Button'
import Search from './Search'
import TabBar from './TabBar';
import '../custom.css'

const imgStyle = {
    width: '3rem',
    height: '3rem',
    borderRadius: '100%'
}

const attendeeContainer = {
    display: 'flex',
    flexDirection: 'row'
}

const attendeeNameText = {
    marginLeft: '1rem'
}


function AttendeesInterestedInfo(attendeeId, attendee){

    return (
        <div style={attendeeContainer}>
            <img style={imgStyle} src={API_ADRESS + "/api/profile/image/" + attendeeId.attendeeId} ></img>
            <div style={attendeeNameText}>
                <p style={{display: 'inline'}}>{attendeeId.attendee.pr_Firstname} {attendeeId.attendee.pr_Lastname}</p>  {/*Hämta från event attendees model*/}
                <p className='gray-body-text'>{attendeeId.attendee.pr_City}</p>
            </div> 
        </div>      
    );
}

export default AttendeesInterestedInfo
