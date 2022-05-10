import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import '../custom.css'
//Remove line below
import eventImage from '../img/event-image.png';


// Hämta alla som ska delta (Tbl_Attendees)
// Hämta 3st bilder från attendees för att displaya
// Hämta hostens bild


function AttendingPreview(/*{eventid, attendeeid}*/) {

    console.clear();
    
    const [eventAttendees, setEventAttendees] = useState([]);
    //const data = axios.get(API_ADRESS + '/api/event/'+ 1);
    
    //console.log(result);
    /*useEffect(() => {
    const getAttendees = async (eventid) => {

        let res = await axios.get(API_ADRESS + '/api/attendeesEventId='+ eventid)
        .then(function(res) {
            setEventInfo([res.data.ev_Title, res.data.ev_Street, res.data.ev_DateTime]);
        })    
        } 
        getEventInfo(1);
    }, [])*/

//api/events

    return (
        <div className="event-card-attendees">
                <img src={eventImage} className="event-card-host-image"></img>
                <div className="event-card-attendees-image">
                    <img src={eventImage} className="event-card-attendees-images-1"></img>
                    <img src={eventImage} className="event-card-attendees-images-2"></img>
                    <img src={eventImage} className="event-card-attendees-images-3"></img>
                    <span className="gray-body-text">+5 more</span>
                </div>
        </div>
    );
}

export default AttendingPreview
