import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { API_ADRESS } from '../config';
import BackButton from '../components/BackButton'
import TabBar from '../components/TabBar';
import AttendeesGoingInfo from '../components/AttendeesGoingInfo';
import AttendeesInterestedInfo from '../components/AttendeesInterestedInfo';
import AttendeesHost from '../components/AttendeesHost';
import '../custom.css'
import { useLocation } from 'react-router-dom'

let renderGoingProfiles = (goingList) =>{

    return goingList.map(goes => {
        const [going, setGoing] = useState([]);
        useEffect(()=>{
            axios.defaults.headers.common = {
                "ApiKey": localStorage.getItem("ApiKey"),
            };
            axios.get(API_ADRESS + '/api/profile/shortdetails/' + goes.pr_Id)
            .then(res =>{
                setGoing(res.data);
            })
        },[])
        return (<div key={goes.pr_Id}><AttendeesGoingInfo attendeeId={goes.pr_Id} attendee={{going}}/></div>)
    })
}

let renderInterestedProfiles = (interestedList) =>{
    return interestedList.map(interest => {
        const [interested, setInterested] = useState([]);
        useEffect(()=>{
            axios.defaults.headers.common = {
                "ApiKey": localStorage.getItem("ApiKey"),
            };
            axios.get(API_ADRESS + '/api/profile/shortdetails/' + interest.pr_Id)
            .then(res =>{
                setInterested(res.data)
            })
        },[])
        return (<div key={interest.pr_Id}><AttendeesInterestedInfo attendeeId={interest.pr_Id} attendee={interested}/></div>)
    })
}

function Attendees(){
    const navigate = useNavigate();
    const location = useLocation();
    const {event} = location.state;
    const goingList = event.event.ev_AttendingModel;
    const interestedList = event.event.ev_InterestedModel;
    const hostId = event.event.ev_Owner.pr_Id;
    const sendState = ({eventId : event.event.ev_Id, returnTo: event.returnTo});

    return (
        
        <div className="page-container">
            <div className="page-content">
                <BackButton text={'Overview'} onClick ={() => {navigate("../event-information")}} state={sendState} to={"../event-information"}/>
                <h1>Attendees</h1>
                <h3>Going</h3>
                
                <div>
                    <AttendeesHost attendeeId={hostId}/>
                </div>

                {renderGoingProfiles(goingList)}

                <br></br>
                <h3>Interested</h3>
                {renderInterestedProfiles(interestedList)}    
            </div>
            <TabBar activeTab={0}/>
        </div>
    );
}

export default Attendees
