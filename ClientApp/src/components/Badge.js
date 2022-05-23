import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { API_ADRESS } from '../config';
import BackButton from './BackButton'
import TabBar from './TabBar';
import AttendeesGoingInfo from './AttendeesGoingInfo';
import AttendeesInterestedInfo from './AttendeesInterestedInfo';
import AttendeesHost from './AttendeesHost';
import '../custom.css'

function Badge({ badgeInfo, dateReceived }) {

    const [date, setDate] = useState({ year: 'loading', month: 'loading', day: 'loading' });

    useEffect(() => {
        let date = new Date(dateReceived);
        let year = date.getFullYear();
        let month = ((date.getMonth() < 10 ? '0' : '') + date.getMonth());
        let day = date.getDate();

        setDate({ year: year, month: month, day: day })
    }, [])

    const centerText = {
        textAlign: 'center'
    }

    const badgeStyle = {
        width: '130px',
        marginBottom: '10px',
        marginTop: '15px'
    }

    return (
        <div style={centerText}>
            <img src={API_ADRESS + "/api/badge/image/" + badgeInfo.ba_Id} style={badgeStyle}></img>
            <h2>{badgeInfo.ba_Name}</h2>
            <p>{date.year}/{date.month}/{date.day}</p>
        </div>
    );
}

export default Badge
