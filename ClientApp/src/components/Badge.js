import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { API_ADRESS } from '../config';
import BackButton from './BackButton'
import TabBar from './TabBar';
import AttendeesGoingInfo from './AttendeesGoingInfo';
import AttendeesInterestedInfo from './AttendeesInterestedInfo';
import AttendeesHost from './AttendeesHost';
import '../custom.css'

let renderInterestedProfiles = (interestedList) =>{
    return interestedList.map(interest => {
        const [interested, setInterested] = useState([]);
        useEffect(()=>{
            axios.defaults.headers.common = {
                "ApiKey": localStorage.getItem("ApiKey"),
            };
            axios.get(API_ADRESS + '/api/profile/shortdetails/' + interest.pr_Id)
            .then(res =>{
                setInterested(res.data)
            })
        },[])
        return (<div key={interest.pr_Id}><AttendeesInterestedInfo attendeeId={interest.pr_Id} attendee={interested}/></div>)
    })
}



function Badge(){

    return (      
        <div>

            <h2>Hotell{/*badgenamn*/}</h2>
            <h3>Trivago</h3>
            
        </div>
    );
}

export default Badge
