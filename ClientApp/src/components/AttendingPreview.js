import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import '../custom.css'
//Remove line below
import eventImage from '../img/event-image.png';


// Hämta alla som ska delta (Tbl_Attendees)
// Hämta 3st bilder från attendees för att displaya
// Hämta hostens bild


function AttendingPreview({event}) {
    
    
    let nrOfAttendees = Object.keys(event.ev_AttendingModel).length -3;

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
    console.clear();
    console.log(event);

    if(event.ev_AttendingModel === undefined) {
        //Kod för att kolla om det finns attendees. Ska användas för att
        //Visa rätt info i event-card-attendees-image nedan.
    }

    return (
        <div className="event-card-attendees">
                <img src={eventImage} className="event-card-host-image"></img>
                <div className="event-card-attendees-image">
                    <img src={API_ADRESS/"api/profile/image/" + event.ev_AttendingModel[0].pr_Id} className="event-card-attendees-images-1"></img>
                    <img src={eventImage} className="event-card-attendees-images-2"></img>
                    <img src={eventImage} className="event-card-attendees-images-3"></img>
                    {nrOfAttendees > 0 ? <span className="gray-body-text">+{nrOfAttendees} more</span> : <span style={{opacity: 0}}>{nrOfAttendees} more</span> }
                </div>
        </div>
    );
}

export default AttendingPreview
