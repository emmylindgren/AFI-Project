import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import '../custom.css'


// Hämta alla som ska delta (Tbl_Attendees)
// Hämta 3st bilder från attendees för att displaya
// Hämta hostens bild

const [eventAttendees, setEventAttendees] = useState([]);
    //const data = axios.get(API_ADRESS + '/api/event/'+ 1);
    
    //console.log(result);
    useEffect(() => {
    const getAttendees = async (eventid) => {

        let res = await axios.get(API_ADRESS + '/api/attendees/'+ eventid)
        .then(function(res) {
            setEventInfo([res.data.ev_Title, res.data.ev_Street, res.data.ev_DateTime]);
        })    
        } 
        getEventInfo(1);
    }, [])


function AttendingPreview(/*{eventid, attendeeid}*/) {

    console.clear();


    return (
        <div>

        </div>
    );
}

export default AttendingPreview
