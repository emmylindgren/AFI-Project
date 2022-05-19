import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { API_ADRESS } from '../config';
import TabBar from './TabBar';
import BackButton from './BackButton'
import Badge from './Badge'
import '../custom.css'

function AttendeeInfo({attendeeId}){

    attendeeId = 2;
    const profilePicture = {
        width: '10rem',
        height: '10rem'
    }
    
    const centerContainer = {
        display: 'flex',
        justifyContent: 'center',
    }
    
    const renderBadges = (badges) => {
        return badges.map(badge => {
            return (<div key={badge}><Badge badgeInfo={badge.pr_Ba_Badge} dateReceived={badge.pr_Ba_DateRecieved}/></div>)
        })
    }
    
    const badgeContainer = {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    }

    const [badges, setBadges] = useState([]);
    const [user, setUser] = useState([]);
    
    useEffect(()=>{
    axios.defaults.headers.common = {
        "ApiKey": localStorage.getItem("ApiKey"),
    };
    axios.get(API_ADRESS + '/api/profile/badges/' + attendeeId)
    .then(res =>{
        setBadges(res.data);
    })
    axios.get(API_ADRESS + '/api/profile/shortdetails/' + attendeeId)
    .then( res =>{
        setUser(res.data);
    })
    },[])

    return (
        <div className="page-container">
            <div className="page-content">
                <BackButton text="Overview" onClick={""} to={""}/><br></br>   
                <div style={centerContainer}>
                    <img src={API_ADRESS + "/api/profile/image/" + attendeeId} style={profilePicture}></img>
                </div> <br></br>
                <h1 style={centerContainer}>{user.pr_Firstname} {user.pr_Lastname}</h1>

                <h3 style={centerContainer}><img src={'icons/location-icon.svg'}></img>&nbsp; {user.pr_City}</h3>
                <br></br>
                <h3 style={centerContainer}>Bagdes</h3>
                <div style={badgeContainer}>
                    {renderBadges(badges)}
                </div>
                <br></br><br></br>
                <TabBar activeTab={0}/>
            </div>
        </div> 
    );
}

export default AttendeeInfo
