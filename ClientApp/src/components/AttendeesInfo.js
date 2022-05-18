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



function AttendeesInfo(attendee, isHost){

    console.log(isHost)    
    
    return (
        <div style={attendeeContainer}>
            <img style={imgStyle} src={API_ADRESS + "/api/profile/image/" + 1 /*Hämta id*/} ></img>
            <div style={attendeeNameText}>
                {/*renderProfiles*/}
                <p style={{display: 'inline'}}> Namn Efternamn </p> {isHost ? <span>(Host)</span> : ""} {/*Hämta från event attendees model*/}
                <p className='gray-body-text'>Insert Location</p>
            </div> 
        </div>      
    );
}

export default AttendeesInfo
