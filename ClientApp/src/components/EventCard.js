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



function EventCard({event}) {

    const [state, setState] = useState({month: 'loading', day: 'loading', hours: 'loading', minutes: 'loading', hoursToInt: 'loading', timeVar: 'loading'});

    useEffect( () =>{
        let date = new Date(event.ev_DateTime);
        let month = ((date.getMonth()<10?'0':'') + date.getMonth());
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = ((date.getMinutes()<10?'0':'') + date.getMinutes());
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
        setState({month: month, day: day, hours: hours, minutes: minutes, hoursToInt: hoursToInt, timeVar: timeVar})
    }, [])

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

    const privateAndAttending = () => {
        
        if(event.ev_Private){
            
            let attending = false;
            
            event.ev_AttendingModel.forEach(element => {
                if(element.pr_Id === parseInt(localStorage.getItem("profileId"))){
                    attending = true;
                }
            });

            if(attending === false) {
                return <span className="gray-body-text">&nbsp; Undisclosed</span>
            }
        }
        return (<span className="gray-body-text">&nbsp; {event.ev_Street}</span>)
    }


    return (
        event ? (
        <div className="event-card">
            <span> 
                <img src={API_ADRESS + "/api/event/image/" + event.ev_Id} id="event-image"></img>
                <h3>{event.ev_Title}</h3>
                <div className = "event-information-block">
                    <img src={locationIcon} id="location-icon"></img>
                    {privateAndAttending()}
                </div>

                <div className = "event-information-block">
                    <img src={clockIcon} id="clock-icon"></img>
                    <span className="gray-body-text">&nbsp; {state.day + " " + functionWithSwitch(state.month) + ", " + state.hours + ":" + state.minutes + " " + state.timeVar}</span>
                    <AttendingPreview event={event}/>
                </div>
            </span>
            
        </div>) :
        <p>Loading...</p>

    );
}

export default EventCard
