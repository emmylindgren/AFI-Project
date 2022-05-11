import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import clockIcon from '../img/clock-icon-white.svg';
import locationIcon from '../img/location-icon-white.svg';
import schemaIcon from '../img/schema-icon-white.svg';
import eventImage from '../img/event-image.png';
import '../custom.css'
import { renderMatches } from 'react-router-dom';


const backgroundImg = {
       
    backgroundImage : 'url("' + eventImage + '")',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,1)), url("' + eventImage+ '")',
    backgroundSize: 'cover',
    width: '100%',
    height: '80vw',
    maxHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--white)',
}

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



function EventShortDetails(/*{event}*/) { 
    
    

    return (
        <div className="event-details" style={backgroundImg}>
           
            <div style={textBox}>
                <div style={Box}>
                    <h1>Stroll in the park</h1>
                </div>
                <div style={Box}>
                    <img src={locationIcon} id="location-icon"></img>
                    <span> &nbsp; Green Park</span>
                </div>

                <div style={Box}>
                    <div style={dateAndTime}>
                        <img src={schemaIcon} id="location-icon"></img>
                        <span>&nbsp; 14 September</span>
                    </div>
                    <div style={dateAndTime}>
                        <img src={clockIcon} id="location-icon"></img>
                        <span>&nbsp; 12:00 PM</span>
                    </div>
                    
                </div>

                <div style={{color: 'var(--white)'}}>
                    <span>Public event</span>
                </div>
            </div>

        </div>
         

    );
}

export default EventShortDetails
