import axios from 'axios'
import { API_ADRESS } from '../config';
import { useEffect, useState } from 'react';
import '../custom.css'
import Button from './Button'
import { useNavigate } from "react-router-dom";


//button anpassar sig efter storleken på diven


// Om ägare: edit event
// Om privat:  request invite 
//             remove request
// Om privat och godkänd--> samma sak som public och going: not going 
// Om privat och icke godkänd --> samma sak som om privat och requested: remove request
//
// Om public:  going
//             not going

const buttonstyle = {
    marginTop: '30px', 
    display: 'flex', 
    flexDirection: 'row'
}

function EventInfoButtons({event}) {
    const [isAttending , setIsAttending] = useState(event.ev_AttendingModel.find((element) => {
        return element.pr_Id === parseInt(localStorage.getItem("profileId"));}) !== undefined)
    const [isDenied , setIsDenied] = useState(event.ev_DeclinedInviteModel.find((element) => {
        return element.pr_Id === parseInt(localStorage.getItem("profileId"));}) !== undefined)
    const [isInterested , setIsInterested] = useState(event.ev_InterestedModel.find((element) => {
        return element.pr_Id === parseInt(localStorage.getItem("profileId"));}) !== undefined)
    const [isRequested , setIsRequested] = useState(event.ev_RequestedInviteModel.find((element) => {
        return element.pr_Id === parseInt(localStorage.getItem("profileId"));}) !== undefined)
    const [isOwner , setIsOwner] = useState(event.ev_Owner.pr_Id === parseInt(localStorage.getItem("profileId")))
    const [isPrivate , setIsPrivate] = useState(event.ev_Private)
    const navigate = useNavigate();
   
    
    useEffect( () =>{
        setIsAttending(event.ev_AttendingModel.find((element) => {
                       return element.pr_Id === parseInt(localStorage.getItem("profileId"));}) !== undefined )
        setIsDenied(event.ev_DeclinedInviteModel.find((element) => {
                    return element.pr_Id === parseInt(localStorage.getItem("profileId"));}) !== undefined)
        setIsInterested(event.ev_InterestedModel.find((element) => {
                        return element.pr_Id === parseInt(localStorage.getItem("profileId"));}) !== undefined)
        setIsRequested(event.ev_RequestedInviteModel.find((element) => {
                       return element.pr_Id === parseInt(localStorage.getItem("profileId"));}) !== undefined)
        setIsOwner(event.ev_Owner.pr_Id === parseInt(localStorage.getItem("profileId")))
        setIsPrivate(event.ev_Private)
    }, []) 

    let displayButtons = () => {
        if(isAttending){
            
            return  (<div style={buttonstyle} >
                        <div style={{width: '50%', marginRight: '15px' }}><Button text={isInterested ? "Not Interested" : "Interested"} onClick ={() => {apiCall("interested")}} buttonColorChoice ="green" /> </div>
                        <div style={{width: '50%'}}><Button text="Not going" onClick ={() => {apiCall("going")}} buttonColorChoice ="green" /> </div>
                    </div>)
        }

        if(isPrivate){
            if(isRequested || isDenied){
                return  (<div style={buttonstyle} >
                        <div style={{width: '50%', marginRight: '15px' }}><Button text={isInterested ? "Not Interested" : "Interested"} onClick ={() => {apiCall("interested")}} buttonColorChoice ="green" /> </div>
                        <div style={{width: '50%'}}><Button text="Invite requested" onClick ={() => {apiCall("request")}} buttonColorChoice ="gray" /> </div>
                    </div>)
            }

            return  (<div style={buttonstyle} >
                        <div style={{width: '50%', marginRight: '15px' }}><Button text={isInterested ? "Not Interested" : "Interested"} onClick ={() => {apiCall("interested")}} buttonColorChoice ="green" /> </div>
                        <div style={{width: '50%'}}><Button text="Request Invite" onClick ={() => {apiCall("request")}} buttonColorChoice ="green" /> </div>
                    </div>)

        }
        return  (<div style={buttonstyle} >
                    <div style={{width: '50%', marginRight: '15px' }}><Button text={isInterested ? "Not Interested" : "Interested"} onClick ={() => {apiCall("interested")}} buttonColorChoice ="green" /> </div>
                    <div style={{width: '50%'}}><Button text="Going" onClick ={() => {apiCall("going")}} buttonColorChoice ="green" /> </div>
                </div>)
    }


    let apiCall = (send) => {
        if(send === "interested"){
            if(isInterested){
                remove(API_ADRESS + '/api/event/deleteInterested/'+ event.ev_Id +'/person/'+ localStorage.getItem("profileId"))
            }
            else{
                 update(API_ADRESS + '/api/event/addInterested/'+ event.ev_Id +'/person/'+ localStorage.getItem("profileId"))
            }
        }
        if(send === "going"){
            if(isAttending){
                remove(API_ADRESS + '/api/event/deleteAttending/'+ event.ev_Id +'/person/'+ localStorage.getItem("profileId"))
            }
            else{
                update(API_ADRESS + '/api/event/addGoing/'+ event.ev_Id +'/person/'+ localStorage.getItem("profileId"))
            }
        }
        if(send === "request"){
            if(!isDenied){
                if(!isAttending && !isRequested){
                    update(API_ADRESS + '/api/event/addRequest/'+ event.ev_Id +'/person/'+ localStorage.getItem("profileId"))
                }
            }
        }
    }

    let update = (url) =>{
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
        };

        axios.post(url)
        .then(res => {
            console.log(res.data);
        })
        .catch(function (error){
            console.log(error);
        });
        
         
    }

    let remove = (url) => {
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
        };
        axios.delete(url)
        .then(res => {
            console.log(res.data);
        })
        .catch(function (error){
        console.log(error);
        });
    }

    return (
        <div>
            {isOwner ? 
            <div style={buttonstyle} >
                <div style={{width: '50%', marginRight: '15px' }}><Button text="Edit event" onClick ={() => {navigate("../explore")}} buttonColorChoice ="green" /> </div>
                <div style={{width: '50%'}}> </div>
            </div>
            : 
                (displayButtons())
            }
           
        </div>
    );
}

export default EventInfoButtons
