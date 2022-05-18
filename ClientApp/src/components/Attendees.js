import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { API_ADRESS } from '../config';
import EventCard from './EventCard';
import Button from './Button'
import Search from './Search'
import TabBar from './TabBar';
import AttendeesInfo from './AttendeesInfo';
import '../custom.css'


let renderGoingProfiles = (goingList) =>{
    return goingList.map(going => {
        return (<div key={going.pr_Id}><AttendeesInfo attendee={going} isHost={false}/></div>)
    })
}

let renderInterestedProfiles = (interestedList) =>{
    return interestedList.map(interested => {
        return (<div key={interestedList.pr_Id}><AttendeesInfo attendee={interested} isHost={false}/></div>)
    })
}
let renderHost = (hostId) => {
    return (<div key={hostId}><AttendeesInfo attendee={hostId} isHost={true}/></div>)
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

    
    const [details, setDetails] = useState([]);
    useEffect(()=>{
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
          };
        axios.get(API_ADRESS + '/api/profile/' + 1/*hostId eller annat id*/)
        .then(res =>{
            setDetails(res.data)
        })
    },[])
    //Rendera Host först mha det nya API:et
    //Hämta info från det nya API:et med pr_Id för både goingList och interestedList
    return (
        <div className="page-container">
            <div className="page-content">
                <h1>Attendees</h1>
                <h3>Going</h3>
                {renderHost(fakeHostId)}
                {renderGoingProfiles(fakeGoingList)}
                {/*<AttendeesInfo event={event}/>
                <AttendeesInfo event={event}/>
                <AttendeesInfo event={event}/>*/}
                <br></br>
                <h3>Interested</h3>
                {renderInterestedProfiles(fakeInterestedList)}
                {/*<AttendeesInfo event={event}/>
                <AttendeesInfo event={event}/>
                <AttendeesInfo event={event}/>
                <AttendeesInfo event={event}/>*/}   
                
                
            </div>
            <TabBar activeTab={0}/>
        </div>
    );
}

export default Attendees
