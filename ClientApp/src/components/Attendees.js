import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { API_ADRESS } from '../config';
import BackButton from './BackButton'
import TabBar from './TabBar';
import AttendeesGoingInfo from './AttendeesGoingInfo';
import AttendeesInterestedInfo from './AttendeesInterestedInfo';
import AttendeesHost from './AttendeesHost';
import '../custom.css'

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

function Attendees(goingList, interestedList, hostId){

    let fakeHostId = 1
    let fakeGoingList = [
        {
            "at_Profile": null,
            "ev_Id": 1,
            "pr_Id": 2
        },
        {
            "at_Profile": null,
            "ev_Id": 1,
            "pr_Id": 3
        }  
    ];
    let fakeInterestedList = [
        {
            "at_Profile": null,
            "ev_Id": 1,
            "pr_Id": 4
        },
        {
            "at_Profile": null,
            "ev_Id": 1,
            "pr_Id": 5
        },
        {
            "at_Profile": null,
            "ev_Id": 1,
            "pr_Id": 6
        }
    ];

    return (
        
        <div className="page-container">
            <div className="page-content">
                <BackButton text="Overview" onClick={""} to={""}/>   
                <h1>Attendees</h1>
                <h3>Going</h3>
                
                <div>
                    <AttendeesHost attendeeId={fakeHostId}/>
                </div>

                {renderGoingProfiles(fakeGoingList)}

                <br></br>
                <h3>Interested</h3>
                {renderInterestedProfiles(fakeInterestedList)}    
            </div>
            <TabBar activeTab={0}/>
        </div>
    );
}

export default Attendees
