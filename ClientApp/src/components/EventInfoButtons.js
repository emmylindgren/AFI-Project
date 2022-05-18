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

function EventInfoButtons({event}) {
    /*
    useEffect( () =>{
        let isAttending =  event.ev_AttendingModel.find((element) => {
            return element.pr_Id === localStorage.getItem("profileId");}) != undefined;
        let isDenied = event.ev_DeclinedInviteModel.find((element) => {
            return element.pr_Id === localStorage.getItem("profileId");}) != undefined;
            console.log(event.ev_InterestedModel)
        let isInterested = event.ev_InterestedModel.find((element) => {
            return element.pr_Id === localStorage.getItem("profileId");}) != undefined;
        let isRequested =  event.ev_RequestedInviteModel.find((element) => {
            return element.pr_Id === localStorage.getItem("profileId");}) != undefined;
        let isOwner = event.ev_Owner.pr_Id == localStorage.getItem("profileId");
        let isPrivate = event.ev_Private == localStorage.getItem("profileId");
    }, []) */
   
    let isAttending =  false;
    let isDenied = true;
    let isInterested = true;
    let isRequested =  true;
    let isOwner = false;
    let isPrivate = false;


    const navigate = useNavigate();
    

    let displayButtons = () => {
        if(isAttending){
            
            return  (<div style={{marginTop: '30px', display: 'flex', flexDirection: 'row'}} >
                        <div style={{width: '50%', marginRight: '15px' }}><Button text={isInterested ? "Not Interested" : "Interested"} onClick ={() => {apiCall("interested")}} buttonColorChoice ="green" /> </div>
                        <div style={{width: '50%'}}><Button text="Not going" onClick ={() => {apiCall("going")}} buttonColorChoice ="green" /> </div>
                    </div>)
        }

        if(isPrivate){
            if(isRequested || isDenied){
                return  (<div style={{marginTop: '30px', display: 'flex', flexDirection: 'row'}} >
                        <div style={{width: '50%', marginRight: '15px' }}><Button text={isInterested ? "Not Interested" : "Interested"} onClick ={() => {apiCall("interested")}} buttonColorChoice ="green" /> </div>
                        <div style={{width: '50%'}}><Button text="Invite requested" onClick ={() => {apiCall("request")}} buttonColorChoice ="gray" /> </div>
                    </div>)
            }

            return  (<div style={{marginTop: '30px', display: 'flex', flexDirection: 'row'}} >
                        <div style={{width: '50%', marginRight: '15px' }}><Button text={isInterested ? "Not Interested" : "Interested"} onClick ={() => {apiCall("interested")}} buttonColorChoice ="green" /> </div>
                        <div style={{width: '50%'}}><Button text="Request Invite" onClick ={() => {apiCall("request")}} buttonColorChoice ="green" /> </div>
                    </div>)

        }
        return  (<div style={{marginTop: '30px', display: 'flex', flexDirection: 'row'}} >
                    <div style={{width: '50%', marginRight: '15px' }}><Button text={isInterested ? "Not Interested" : "Interested"} onClick ={() => {apiCall("interested")}} buttonColorChoice ="green" /> </div>
                    <div style={{width: '50%'}}><Button text="Going" onClick ={() => {apiCall("going")}} buttonColorChoice ="green" /> </div>
                </div>)
    }


    let apiCall = (send) => {
        if(send === "interested"){
            if(isInterested){
                console.log("already intereseted, removes intreseted")
            }
            else{
                 console.log("adds interested")
            }
        }
        if(send === "going"){
            if(isAttending){
                console.log("already going, removes going")
            }
            else{
                console.log("removes going")
            }
        }
        if(send === "request"){
            if(isDenied){
                console.log("have been denied, does nothing")
            }
            else{
                if(!isAttending && isRequested){
                    console.log("already requested, removes request")
                }
                if(!isAttending && !isRequested){
                    console.log("adds request")
                }
            }
        }
    }

    

    return (
        <div>
            {isOwner ? 
            <div style={{marginTop: '30px', display: 'flex', flexDirection: 'row'}} >
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
