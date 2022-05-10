import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import clockIcon from '../img/clock-icon.svg';
import locationIcon from '../img/location-icon.svg';
import eventImage from '../img/event-image.png';
import '../custom.css'
import AttendingPreview from './AttendingPreview';


/*const getEventInfo = async (eventid) => {
    let res = await axios.get(API_ADRESS + '/api/event/'+ eventid)    
    return res.data
    .catch(function (error){
        console.log(error);
    });
};
*/



/*function getEventInfo(eventid) {
    return axios.get('https://localhost:7259/api/event/'+ eventid).then(res => res.data)
}*/



function EventCard(/*{eventid}*/) {
    console.clear();
    const [eventInfo, setEventInfo] = useState([]);
    //const data = axios.get(API_ADRESS + '/api/event/'+ 1);
    
    //console.log(result);
    useEffect(() => {
    const getEventInfo = async (eventid) => {

        let res = await axios.get(API_ADRESS + '/api/event/'+ eventid)
        .then(function(res) {
            setEventInfo([res.data.ev_Title, res.data.ev_Street, res.data.ev_DateTime]);
        })    
        } 
        getEventInfo(1);
    }, [])

    /*let date = eventInfo[2];
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    let hours = date.slice(11,13);
    let minutes = date.slice(14,16);
    let hoursToInt = parseInt(hours);
    let timeVar = "AM";*/

    let date = eventInfo[2];
    let month = "12";
    let day = 12;
    let hours = 12;
    let minutes = 12;
    let hoursToInt = parseInt(hours);
    let timeVar = "AM";
    
    if(hoursToInt > 12 && hoursToInt < 24) {
        hours = hoursToInt % 12;
        timeVar = "PM";
    }
    else if(hours === "24" || hours === "00") {
        hours = 12;
        timeVar = "PM";
    }

    const functionWithSwitch = (month) => {
        switch(month){
            case "01":
                return "January"
            case "02": 
                return "February"
            case "03":
                return "March"
            case "04":
                return "April"
            case "05":
                return "May"
            case "06":
                return "June"
            case "07":
                return "July"
            case "08": 
                return "August"
            case "09":
                return "September"
            case "10":
                return "October"
            case "11":
                return "November"
            case "12":
                return "December"
        }        
    }

    return (

        <div className="event-card">
            <span> <img src={eventImage} id="event-image"></img>
                <h3>{eventInfo[0]} </h3>
                <div className = "event-information-block">
                    <img src={locationIcon} id="location-icon"></img>
                    <span className="gray-body-text">&nbsp; {eventInfo[1]}</span>
                </div>

                <div className = "event-information-block">
                    <img src={clockIcon} id="clock-icon"></img>
                    <span className="gray-body-text">&nbsp; {day + " " + functionWithSwitch(month) + ", " + hours + ":" + minutes + " " + timeVar}</span>
                    <AttendingPreview/>
                </div>
                
            </span>
            
        </div>

    );
}

export default EventCard
