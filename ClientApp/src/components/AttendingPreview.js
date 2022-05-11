import axios from 'axios'
import { API_ADRESS } from '../config';
import '../custom.css'
//Remove line below
import eventImage from '../img/event-image.png';


// Hämta alla som ska delta (Tbl_Attendees)
// Hämta 3st bilder från attendees för att displaya
// Hämta hostens bild


function AttendingPreview({event}) {
    
    
    let nrOfMoreAttendees = Object.keys(event.ev_AttendingModel).length -3;

    const displayMoreAttendees = () =>{
        if(nrOfMoreAttendees > 0){
            if(event.ev_Private === false){
                return <span className="gray-body-text">+{nrOfMoreAttendees} more</span>
            }
            return <span className="event-card-more-text">&nbsp; &nbsp;+{nrOfMoreAttendees+3} more</span>
        }
        else if(event.ev_Private === true){
            if(nrOfMoreAttendees+3 === 0 ){
                return <span style={{opacity: 0}}></span>
            }
            return <span className="gray-body-text">&nbsp; &nbsp;+{nrOfMoreAttendees+3} more</span>
        }
        return <span style={{opacity: 0}}></span>
    }
    
    return (
        <div className="event-card-attendees">
                <img src={API_ADRESS + "/api/profile/image/" + event.ev_Owner.pr_Id} className="event-card-host-image"></img>
                <div className="event-card-attendees-image">
                    {event.ev_AttendingModel[0] === undefined || event.ev_Private === true ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_AttendingModel[0].pr_Id } className="event-card-attendees-images-1"></img>}
                    {event.ev_AttendingModel[1] === undefined || event.ev_Private === true ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_AttendingModel[1].pr_Id } className="event-card-attendees-images-2"></img>}
                    {event.ev_AttendingModel[2] === undefined || event.ev_Private === true ? "" : <img src={API_ADRESS + "/api/profile/image/" + event.ev_AttendingModel[2].pr_Id } className="event-card-attendees-images-3"></img>}
                    {displayMoreAttendees()}
                </div>
        </div>
    );
}

export default AttendingPreview
