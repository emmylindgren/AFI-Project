import React, { useEffect, useState } from 'react'
import Button from './Button'

import { API_ADRESS } from '../config';
import axios from 'axios';

/**
 * Format: 
 * <AuditRequestCard userID={1}/>
 * 
 * TODO: 
 * - Decline and accept should move that profile from requested t
 *  to other list. 
 * 
 */
const imgStyle = {
    height:'80px',
    width:'80px',
    borderRadius:'50px',
}

const textandImageStyle = {
    display:'flex',
}
const buttonStyles = {
    display:'flex',
    justifyContent:'flex-start',
    gap:'2rem',
    paddingTop:'1rem',
}

const textStyles = {
    marginLeft:'1rem', 
    marginTop:'1rem',
}


function AuditRequestCard({userID, eventID, states}) {

const [profile,setProfile] = useState();
const [loaded,setLoaded] = useState(false);

useEffect(()=>{
    axios.defaults.headers.common = {
        "ApiKey": localStorage.getItem("ApiKey"),
      };
    axios.get(API_ADRESS + '/api/profile/shortdetails/' + userID)
        .then(res => {
            setProfile(res.data);
            setLoaded(true)
            console.log(res.data);
        })
    .catch(function (error){
        console.log(error);
    });

},[]);

let declineInvite = (eventID, userID) => {
    axios.defaults.headers.common = {
        "ApiKey": localStorage.getItem("ApiKey"),
      };
      //api/Event/declineRequest/{eventid}/person/{personid}
    axios.delete(API_ADRESS + '/api/event/declineRequest/'+ eventID+'/person/'+userID)
        .then(res => {
            states(true)
            console.log(res.data);
        })
    .catch(function (error){
        console.log(error);
    });
}

let acceptInvite = (eventID, userID) => {
    axios.defaults.headers.common = {
        "ApiKey": localStorage.getItem("ApiKey"),
      };

    axios.post(API_ADRESS + '/api/event/acceptRequest/'+ eventID+'/person/'+userID)
        .then(res => {
            states(true)
            console.log(res.data);
        })
    .catch(function (error){
        console.log(error);
    });
}

  return (
    <div>
        <div style={textandImageStyle}>
            <img style={imgStyle} src={API_ADRESS + "/api/profile/image/"+ userID} id="profile-image" />
            <div style={textStyles}>
                <p style={{marginBottom:'0px', fontSize:'1.5rem',}}>{loaded ? profile.pr_Firstname + " "+ profile.pr_Lastname : "Loading..."}</p>
                <p style={{fontSize:'1.2rem',color:'var(--grey-text)'}}>{loaded ? profile.pr_Street + ", "+ profile.pr_City : "Loading..."}</p>
            </div>
        </div>

        <div style={buttonStyles}>
            <Button text="Decline" onClick ={() => {declineInvite(eventID,userID)}} buttonColorChoice ="red" iconChoice ="decline" />
            <Button text="Accept" onClick ={() => {acceptInvite(eventID,userID)}} buttonColorChoice ="green" iconChoice ="accept" />
        </div>
    </div>
  )
}

export default AuditRequestCard
