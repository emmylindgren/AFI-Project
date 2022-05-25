import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import TabBar from '../components/TabBar';
import BackButton from '../components/BackButton'
import Badge from '../components/Badge'
import '../custom.css'
import { useLocation, useNavigate } from 'react-router-dom'

function AttendeeInfo(){

    const navigate = useNavigate();
    const location = useLocation();
    const {stateInfo} = location.state;
    const sendState = ({
        event: stateInfo.event.event,
        returnTo: stateInfo.event.returnTo
    })
    const profilePicture = {
        width: '10rem',
        height: '10rem',
        borderRadius:'100%',
    }
    
    const centerContainer = {
        display: 'flex',
        justifyContent: 'center',
    }
    
    const renderBadges = (badges) => {
        return badges.map(badge => {
            return (<div key={badge} style={{ width: '50%' }}><Badge badgeInfo={badge.pr_Ba_Badge} dateReceived={badge.pr_Ba_DateRecieved}/></div>)
        })
    }
    
    const badgeContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

    const [badges, setBadges] = useState([]);
    const [user, setUser] = useState([]);
    
    useEffect(()=>{
    axios.defaults.headers.common = {
        "ApiKey": localStorage.getItem("ApiKey"),
    };
    axios.get(API_ADRESS + '/api/profile/badges/' + stateInfo.id)
    .then(res =>{
        setBadges(res.data);
    })
    axios.get(API_ADRESS + '/api/profile/shortdetails/' + stateInfo.id)
    .then( res =>{
        setUser(res.data);
    })
    },[])

    return (
        <div className="page-container">
            <div className="page-content">
                <BackButton text={'Attendees'} onClick ={() => {navigate("../attendees")}} state={sendState} to={"../attendees"}/><br></br>   
                <div style={centerContainer}>
                    <img src={API_ADRESS + "/api/profile/image/" + stateInfo.id} style={profilePicture}></img>
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
