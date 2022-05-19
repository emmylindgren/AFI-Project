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
    flexDirection: 'row',
    marginBottom: '0.1rem'
}

const attendeeNameText = {
    marginLeft: '1rem',
    
}

function AttendeesHostInfo({attendeeId}){

    const [interested, setInterested] = useState([]);
    useEffect(()=>{
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
        };

        axios.get(API_ADRESS + '/api/profile/shortdetails/' + attendeeId)
        .then(res =>{
            setInterested(res.data);
        })
    },[])

    return (
        <div style={attendeeContainer}>
            <img style={imgStyle} src={API_ADRESS + "/api/profile/image/" + attendeeId} ></img>
            <div style={attendeeNameText}>
                <p style={{display: 'inline'}}>{interested.pr_Firstname} {interested.pr_Lastname}</p> <span>(Host)</span>
                <p className='gray-body-text'>{interested.pr_City}</p>
            </div> 
        </div>      
    );
}

export default AttendeesHostInfo
