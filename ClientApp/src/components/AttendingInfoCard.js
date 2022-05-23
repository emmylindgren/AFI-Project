import axios from 'axios'
import { API_ADRESS } from '../config';
import '../custom.css'
import { Link } from "react-router-dom";



const pictureStyle = {
    marginTop:'.5rem',
    display: 'flex',
    width: '60%',
    maxWidth: '13rem',
    alignItems: 'center',
}

const image1Style = {
    height: '2rem',
    borderRadius: '100%',
    zIndex: '1',
    transform: 'translateX(0)',
}   

const image2Style ={
    height: '2rem',
    borderRadius: '100%',
    zIndex: '2',
    transform: 'translateX(-50%)',
}

const image3Style = {
    height: '2rem',
    borderRadius: '100%',
    zIndex: '3',
    transform: 'translateX(-100%)',
} 

const image4Style = {
    height: '2rem',
    borderRadius: '100%',
    zIndex: '4',
    transform: 'translateX(-150%)',
} 

const image5Style = {
    height: '2rem',
    borderRadius: '100%',
    zIndex: '5',
    transform: 'translateX(-200%)',
} 

const host = {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '1rem',
    paddingTop: '1rem',
}

const hostText = {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '0',
    justifyContent: 'end',
    paddingLeft: '1rem',
}

const hostImage = {
    height: '2.5rem',
    borderRadius: '100%',
}

const attendeeInformation = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'end',
    paddingBottom: '1rem'
    
}
function AttendingInfoCard({event, returnTo}) {
    let nrOfAttendees = Object.keys(event.ev_AttendingModel).length;
    let nrOfRequests = Object.keys(event.ev_RequestedInviteModel).length;

    // HÅRDKODADE SIFFROR MÅSTE ÄNDRAS TILL DYNAMISKA
    let isAttending =  event.ev_AttendingModel.find((element) => {
        return element.pr_Id === parseInt(localStorage.getItem("profileId"));}) != undefined;
    let isOwner = event.ev_Owner.pr_Id == parseInt(localStorage.getItem("profileId"));
    const sendState = ({event: event , returnTo: returnTo});
    const sendStateAudit = ({eventId: event.ev_Id, returnTo: returnTo})

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
        <div>
            <div style={host}>
                <img src={API_ADRESS + "/api/profile/image/" + event.ev_Owner.pr_Id} style={hostImage}></img>
                <div style={hostText}>
                    <p>{event.ev_Owner.pr_Firstname} {event.ev_Owner.pr_Lastname} (Host)</p>
                    <p className="gray-body-text">{event.ev_Owner.pr_City}</p>
                </div>
            </div>
            <div>
                <h3>{nrOfAttendees} people are going</h3>
                {privateInformation() ? 
                    (<p>You need to be accepted as a guest to see attending list.</p>) 
                    :(<div style={attendeeInformation}>
                        <div style={pictureStyle}>
                            {event.ev_AttendingModel[0] === undefined  ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_AttendingModel[0].pr_Id } style={image1Style}></img>}
                            {event.ev_AttendingModel[1] === undefined  ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_AttendingModel[1].pr_Id } style={image2Style}></img>}
                            {event.ev_AttendingModel[2] === undefined  ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_AttendingModel[2].pr_Id } style={image3Style}></img>}
                            {event.ev_AttendingModel[3] === undefined  ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_AttendingModel[3].pr_Id } style={image4Style}></img>}
                            {event.ev_AttendingModel[4] === undefined  ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_AttendingModel[4].pr_Id } style={image5Style}></img>}
                        </div>
                        <Link to="../attendees" state={{eventInfo:sendState}} style={{color: 'var(--deep-green', textDecoration: 'none', fontWeight: '700' }}>See all</Link> 
                    </div>)
                }
            </div>
            {isOwner ? 
            <div>
                <h3>{nrOfRequests} people have requested invites</h3>
                <div style={attendeeInformation}>
                    
                    <div style={pictureStyle}>
                        {event.ev_RequestedInviteModel[0] === undefined  ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_RequestedInviteModel[0].pr_Id } style={image1Style}></img>}
                        {event.ev_RequestedInviteModel[1] === undefined  ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_RequestedInviteModel[1].pr_Id } style={image2Style}></img>}
                        {event.ev_RequestedInviteModel[2] === undefined  ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_RequestedInviteModel[2].pr_Id } style={image3Style}></img>}
                        {event.ev_RequestedInviteModel[3] === undefined  ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_RequestedInviteModel[3].pr_Id } style={image4Style}></img>}
                        {event.ev_RequestedInviteModel[4] === undefined  ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_RequestedInviteModel[4].pr_Id } style={image5Style}></img>}
                    </div>
                    <Link to="../audit" state={{ stateInfo: sendStateAudit }} style={{color: 'var(--deep-green', textDecoration: 'none', fontWeight: '700' }}>Audit</Link>
                </div>
             </div>
            : ""}
        </div>
    );
}

export default AttendingInfoCard
