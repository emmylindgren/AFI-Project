import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_ADRESS } from '../config';
import EventCard from './EventCard';
import '../custom.css'

function Explore(){
    return (
        <div className="page-container">
            <div className="page-content">
                <EventCard/>
                <EventCard/>
                <EventCard/>
            </div>
        </div>
    );
}

export default Explore
