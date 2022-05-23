import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import '../custom.css'
import AttendingPreview from './AttendingPreview';
import LoadingCard from './LoadingCard';
import { Link, renderMatches } from 'react-router-dom';

const clickableEventCard = {
    position: 'absolute', 
    display: 'inline-block',
    width: '100%',
    height: '100%',
    maxHeight: '130px',
    float: 'left',
    left: '0',
    zIndex: '1',
    //backgroundColor: 'red',
}

function EventCard({event,state}) {
    const [date, setDate] = useState({month: 'loading', day: 'loading', hours: 'loading', minutes: 'loading', hoursToInt: 'loading', timeVar: 'loading'});
    const [eventInfo, setEventInfo] = useState({eventId: 'loading', returnTo: 'loading'});

    useEffect( () =>{
        let date = new Date(event.ev_DateTime);
        let month = ((date.getMonth()<10?'0':'') + date.getMonth());
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = ((date.getMinutes()<10?'0':'') + date.getMinutes());
        let hoursToInt = parseInt(hours);
        let timeVar = "AM";
        let eventId = event.ev_Id;
        let returnTo = "/explore";

        if(hoursToInt > 12 && hoursToInt < 24) {
            hours = hoursToInt % 12;
            timeVar = "PM";
        }
        else if(hours === "24" || hours === "00") {
            hours = 12;
            timeVar = "PM";
        }
        setDate({month: month, day: day, hours: hours, minutes: minutes, hoursToInt: hoursToInt, timeVar: timeVar})
        setEventInfo({eventId: eventId, returnTo: returnTo});
    }, [])

    const functionWithSwitch = (month) => {
        
        switch(month){
            case "00":
                return "January"
            case "01": 
                return "February"
            case "02":
                return "March"
            case "03":
                return "April"
            case "04":
                return "May"
            case "05":
                return "June"
            case "06":
                return "July"
            case "07": 
                return "August"
            case "08":
                return "September"
            case "09":
                return "October"
            case "10":
                return "November"
            case "11":
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

            axios.get(API_ADRESS + '/api/profile/disabilities/' + localStorage.getItem("profileId"))
            .then(res =>{
                setUserInfo(res.data);
            })
    
        },[])

    const disabilitiesMatching = (event) => {
        let eventDisabilities = event.event.ev_Disabilities;
        let personDisabilities = userInfo;
        let counter = 0;
        let warning = "none";
        if(eventDisabilities !== null){
            eventDisabilities.forEach(element => {
                if(personDisabilities.includes(element.dis_Id)){
                    counter++;
                }
            });
        }

        if(personDisabilities.length !== 0){   

            if(personDisabilities.length > counter){
                warning = "small";
            }
            if(counter === 0){
                warning = "large";
            }
        }
        return warning;
    }

    return (
        event ? (
            
            <div className="event-card" >
                {state === 'loaded' ?
                (
                <span >
                    <Link to="../event-information" style={clickableEventCard} state={{eventInfo: eventInfo}} ><span></span></Link>
                    <img src={API_ADRESS + "/api/event/image/" + event.ev_Id} id="event-image"></img>
                   
                    {disabilitiesMatching({event}) === "none" ? <h3>{event.ev_Title}</h3> : ""}
                    {disabilitiesMatching({event}) === "small" ? <h3>{event.ev_Title}<img id="warning-icon" src="icons/warning-orange.svg"></img></h3> : ""}
                    {disabilitiesMatching({event}) === "large" ? <h3>{event.ev_Title}<img id="warning-icon" src="icons/warning-red.svg"></img></h3> : ""}

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
