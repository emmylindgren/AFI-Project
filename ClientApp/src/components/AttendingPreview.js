import { API_ADRESS } from '../config';
import '../custom.css'

function AttendingPreview({event}) {
    
    if(!event) return;

    const displayMoreAttendees = () =>{

        let nrOfAttendees = Object.keys(event.ev_AttendingModel).length;
        let nrOfMoreAttendees = Object.keys(event.ev_AttendingModel).length -3;

        if(nrOfMoreAttendees > 0){
            if(canSeeAttending() === true){
                return <span className="gray-body-text">+{nrOfMoreAttendees} more</span>
            }
            return <span className="event-card-more-text">&nbsp; &nbsp;+{nrOfAttendees} more</span>
        }
        else if(event.ev_Private === true){
            if(nrOfAttendees === 0 ){
                return <span style={{opacity: 0}}></span>
            }
            return <span className="gray-body-text">&nbsp; &nbsp;+{nrOfAttendees} more</span>
        }
        return <span style={{opacity: 0}}></span>
    }

    const canSeeAttending = () => {   
        if(event.ev_Private){          
            let canSeeAttending = false;           
            event.ev_AttendingModel.forEach(element => {
                if(element.pr_Id === parseInt(localStorage.getItem("profileId"))){
                    canSeeAttending = true;
                }
            });
            return canSeeAttending;
        }
        return true;
        
    }
    
    return (
        <div className="event-card-attendees">
            <img src={API_ADRESS + "/api/profile/image/" + event.ev_Owner.pr_Id} className="event-card-host-image"></img>
            <div className="event-card-attendees-image">
                {event.ev_AttendingModel[0] === undefined || !canSeeAttending() ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_AttendingModel[0].pr_Id } className="event-card-attendees-images-1"></img>}
                {event.ev_AttendingModel[1] === undefined || !canSeeAttending() ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_AttendingModel[1].pr_Id } className="event-card-attendees-images-2"></img>}
                {event.ev_AttendingModel[2] === undefined || !canSeeAttending() ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_AttendingModel[2].pr_Id } className="event-card-attendees-images-3"></img>}
                {displayMoreAttendees()}
            </div>
        </div>
    );
}

export default AttendingPreview
