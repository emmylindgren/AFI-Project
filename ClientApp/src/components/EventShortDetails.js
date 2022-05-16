import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import clockIcon from '../img/clock-icon-white.svg';
import locationIcon from '../img/location-icon-white.svg';
import schemaIcon from '../img/schema-icon-white.svg';
import eventImage from '../img/event-image.png';
import '../custom.css'
import { renderMatches } from 'react-router-dom';
import BackButtonGreen from './BackButtonGreen';




const textBox ={
    margin: '20px',
    marginTop: 'auto',
}

const Box = {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '10px'
}

const dateAndTime = {
    width: '40%',
}



function EventShortDetails({event, returnTo}) { 
    
    let backgroundImg =  {
        backgroundImage : 'url("' +  API_ADRESS + "/api/event/image/" + event.ev_Id + '")',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,1)), url("' + API_ADRESS + "/api/event/image/" + event.ev_Id+ '")',
        backgroundSize: 'cover',
        width: '100%',
        height: '80vw',
        maxHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--white)',
        fontSize: '1.3rem',
    }

    let date = new Date(event.ev_DateTime);
    let month = ((date.getMonth()<10?'0':'') + date.getMonth());
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = ((date.getMinutes()<10?'0':'') + date.getMinutes());
    let hoursToInt = parseInt(hours);
    let timeVar = "AM";

    //BYT UT SIFFROR MOT DYNAMISKT
    let isAttending =  event.ev_AttendingModel.find((element) => {
        return element.pr_Id === 1;}) != undefined;

    let isOwner = event.ev_Owner.pr_Id == 1;

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

    

    let privateInformation = () => {
        if(event.ev_Private){
            if(isAttending || isOwner){
                return false;
            }
            
            return true;
        }
        return false;
    }
    return (
        <div className="event-details" style={backgroundImg}>
           
            <div style={textBox}>
                <div style={{paddingBottom:'20px'}}>
                    <BackButtonGreen text="Back" to={returnTo} onClick={() => {console.log("hej!")}}/>
                </div>
           
                <div style={Box}>
                    <h1>Stroll in the park</h1>
                </div>
                <div style={Box}>
                    <img src={locationIcon} id="location-icon"></img>
                    {privateInformation() ? <span >&nbsp; Undisclosed</span> : <span >&nbsp; {event.ev_Street}</span>}
                </div>

                <div style={Box}>
                    <div style={dateAndTime}>
                        <img src={schemaIcon} id="location-icon"></img>
                        <span>&nbsp; {day + " " + functionWithSwitch(month) }</span>
                    </div>
                    <div style={dateAndTime}>
                        <img src={clockIcon} id="location-icon"></img>
                        <span> &nbsp; {hours + ":" + minutes + " " + timeVar}</span>
                    </div>
                    
                </div>

                <div style={{color: 'var(--white)'}}>
                    {event.ev_Private ? <span >Private event</span> : <span >Public Event</span>}
                </div>
            </div>

        </div>
         

    );
}

export default EventShortDetails
