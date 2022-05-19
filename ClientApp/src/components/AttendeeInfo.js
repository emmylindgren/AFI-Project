import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { API_ADRESS } from '../config';
import TabBar from './TabBar';
import BackButton from './BackButton'
import Badge from './Badge'
import '../custom.css'

const profilePicture = {
    width: '10rem',
    height: '10rem'
}

const centerContainer = {
    display: 'flex',
    justifyContent: 'center',
}

const renderBadges = (badgeId) => {

    /*return interestedList.map(interest => {
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
    })*/
}

const badgeContainer = {
    display: 'flex',
    justifyContent: 'space-evenly'
}

function AttendeeInfo(attendeeId, attendee){

    return (
        <div className="page-container">
            <div className="page-content">
                <BackButton text="Overview" onClick={""} to={""}/><br></br>   
                <div style={centerContainer}>
                    <img src={API_ADRESS + "/api/profile/image/" + 2 /*attendeeId */} style={profilePicture}></img>
                </div> <br></br>
                <h1 style={centerContainer}>{/*attendee.pr_Firstname osv osv*/}Erik West</h1>

                <h3 style={centerContainer}><img src={'icons/location-icon.svg'}></img>&nbsp; Western Perth</h3>
                <br></br>
                <h3>Bagdes</h3>
                {renderBadges()}

                <div style={badgeContainer}>
                    <Badge/>
                    <Badge/>
                </div>
                <TabBar activeTab={0}/>
            </div>
        </div> 
    );
}

export default AttendeeInfo
