import React from 'react'
import BackButton from '../components/BackButton'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../config';
import AuditRequestCard from '../components/AuditRequestCard';


const requestcardStyle = {
    marginBottom:'2rem',
}
//TODO: Update eventID, take away =1. 
// Fix so when button is pressed, page autoupdates and the request is removed. 
function Audit({eventID=1}) {
    const [requests, setRequests] = useState([]);
    const [state, setState] = useState('loading');

    useEffect(async ()=>{
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
          };
        axios.get(API_ADRESS + '/api/event/requests/'+ eventID)
        .then(res =>{
            setState('loaded')
            setRequests(res.data)
            console.log(res.data)
        })
        .catch(err =>{
            setState('error')
        })
    },[])

    let renderRequests = (requests) =>{

        return requests.map(request => {
               return (
                <div>
                    <div key={request} style={requestcardStyle}><AuditRequestCard userID={request} eventID={eventID}/></div>
                </div>
                )
        })
    }

  return (
    <div className='page-container'>
        <div className='page-content'>
        <BackButton text={'Overview'} onClick ={""} to={""}/>
        <h1 style={{color:'var(--black)', marginTop:'1rem',}}>Audit</h1>
        <h3 style={{marginBottom:'1rem',}}>Requested invites</h3>
        {renderRequests(requests)}
        </div>
    </div>
  )
}

export default Audit
