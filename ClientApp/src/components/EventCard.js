import React, {useState} from 'react'
import axios from 'axios'

import { API_ADRESS } from '../config';

import '../custom.css'

const getEventInfo = async (eventid) => {
    let res = await axios.get(API_ADRESS + '/api/event/'+ eventid)
    return res.data
    /*.catch(function (error){
        console.log(error);
    });*/
};

/*function getEventInfo(eventid) {
    return axios.get('https://localhost:7259/api/event/'+ eventid).then(res => res.data)
}*/


function EventCard({eventid}) {

    const data = getEventInfo(1);
    console.log("dajwd");
    console.log(data);
    console.log("asd");
    console.log(data.ev_Title)

    return (
        <div className="page-container">
            <div className="page-content">
                <div className="event-card">
                    <p>res: {getEventInfo(1).ev_Title}</p>
                    <p>Hej</p>
                    
                </div>
            </div>
        </div>
    );
}

export default EventCard
