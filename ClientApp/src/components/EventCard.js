import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import '../custom.css'
import AttendingPreview from './AttendingPreview';
import LoadingCard from './LoadingCard';

function EventCard({event,state}) {

    const [date, setDate] = useState({month: 'loading', day: 'loading', hours: 'loading', minutes: 'loading', hoursToInt: 'loading', timeVar: 'loading'});

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
        setDate({month: month, day: day, hours: hours, minutes: minutes, hoursToInt: hoursToInt, timeVar: timeVar})
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


    const [userInfo, setUserInfo] = useState([]);
        
        useEffect(()=>{
            /*axios.defaults.headers.common = {
                "ApiKey": localStorage.getItem("ApiKey"),
              };*/
            axios.get(API_ADRESS + '/api/profile/' + localStorage.getItem("profileId"))
            .then(res =>{
                setUserInfo(res.data)
            })
    
        },[])

    const disabilitiesMatching = (event) => {
        let eventDisabilities = event.event.ev_Disabilities;
        let personDisabilities = userInfo.pr_Disabilities;
        console.log(eventDisabilities);
        console.log(personDisabilities);
        return true;
    }

    return (
        event ? (
            <div className="event-card">
                {state === 'loaded' ?
                (
                <span>
                    <img src={API_ADRESS + "/api/event/image/" + event.ev_Id} id="event-image"></img>

                    {disabilitiesMatching({event}) ? <h3>{event.ev_Title}</h3> : <h3>{event.ev_Title}<img id="warning-icon" src="icons/warning.svg"></img></h3> }

                    <div className = "event-information-block">
                        <img src="icons/location-icon.svg" id="location-icon"></img>
                        {privateAndAttending()}
                    </div>

                    <div className = "event-information-block">
                        <img src="icons/clock-icon.svg" id="clock-icon"></img>
                        <span className="gray-body-text">&nbsp; {date.day + " " + functionWithSwitch(date.month) + ", " + date.hours + ":" + date.minutes + " " + date.timeVar}</span>
                        <AttendingPreview event={event}/>
                    </div>
                </span>
                ) : (
                    <LoadingCard/>
                )}
            </div>
        ) : (
            <LoadingCard/>
        )
    );
}

export default EventCard
