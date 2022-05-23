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


function AttendeesInterestedInfo({attendeeId, attendee, event}){

    return (
        <div style={attendeeContainer}>
            <img style={imgStyle} src={API_ADRESS + "/api/profile/image/" + attendeeId} ></img>
            <div style={attendeeNameText}>
                <p style={{display: 'inline'}}>{attendee.pr_Firstname} {attendee.pr_Lastname}</p>
                <p className='gray-body-text'>{attendee.pr_City}</p>
            </div> 
        </div>      
    );
}

export default AttendeesInterestedInfo
