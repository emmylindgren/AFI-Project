import React, { useEffect, useState } from 'react'
import '../custom.css'
import ScheduleEventCard from '../components/ScheduleEventCard'
import axios from 'axios'
import { API_ADRESS } from '../config'
import TabBar from '../components/TabBar'
import LoadingCard from '../components/LoadingCard'
import ErrorCard from '../components/ErrorCard'


const eventCardStyle = {
    marginBottom:'0.8rem',
}

const dateTextStyle = {
    display:'flex',
    flexDirection:'row',
    gap:'0.5rem',
    marginTop:'2rem',
    marginBottom:'0.5rem',
}

const noEventStyle = {
    borderRadius:'10px',
    background:'var(--light-gray)',
    height:'3rem',
    display:'flex',
    alignItems:'center',
    paddingLeft:'2rem',
    marginBottom:'0.8rem',
}

/**
 * TODO: 
 * add so that eventcards route to eventinfo for that event. 
 * 
 */
function Schedule() {

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
    let todayhasbeen = false;

    const [events, setEvents] = useState([]);
    const [state, setState] = useState('loading');

    useEffect(async ()=>{
        axios.get(API_ADRESS + '/api/event/profileID/'+ localStorage.getItem("profileId"))
        .then(res =>{
            setState('loaded')
            setEvents(res.data)
        })
        .catch(err =>{
            setState('error')
        })
    },[])

    let renderEvents = (events) =>{

        let currentDate = new Date(Date.now());
       

        let eventsList = events.map(event => {
            
            
            let eventDate = new Date(event.ev_DateTime);

            if(currentDate.toDateString() == eventDate.toDateString()){
                
                if(currentDate.toDateString() == new Date(Date.now()).toDateString()){
                    //Today
                    todayhasbeen = true;
                }
            
                //Same day as the last one
                return (
                    <div>
                        <div key={event.ev_Id} style={eventCardStyle}><ScheduleEventCard event={event}/></div>
                    </div>
                )
            }
            else{
                // Another day than the last one
                currentDate = eventDate;
                return (
                    <div key={event.ev_Id}>
                        <div style={dateTextStyle}>
                            <h2 style = {{textAlign:'left', fontSize:'1.3rem',}}>{days[(eventDate.getDay())]}</h2>
                            <h2 style={{fontWeight:'200', fontSize:'1.3rem',}}>{eventDate.getDate() + " " + months[eventDate.getMonth()]}</h2>
                        </div>
                        <div style ={eventCardStyle}><ScheduleEventCard event={event}/></div>
                    </div>
                )        
            }
        })      
        return (todayhasbeen ? <div>{eventsList}</div> : <div> <div style={noEventStyle}>You have no events today</div> {eventsList} </div>)
    }

    const getCurrentState = () => {
        switch(state){
            case 'loading':
                return <LoadingCard/>
            case 'loaded':
                return renderEvents(events)
            case 'error':
                return <ErrorCard
                iconChoice={'filenotfound'} 
                infoText={"Oops, there was a problem when fetching your data! Try again later."}
                    />
        }
    }
    

  return (
    <div className='page-container'>
        <div className='page-content'>
            <h1>Coming up</h1>
            <div style={dateTextStyle}>
                <h2 style = {{textAlign:'left', fontSize:'1.3rem',}}>Today</h2>
                <h2 style={{fontWeight:'200', fontSize:'1.3rem',}}>{new Date(Date.now()).getDate() + " " + months[new Date(Date.now()).getMonth()]}</h2>
            </div>

            {getCurrentState()}
           
        </div>
        <TabBar activeTab={1}/>
    </div>
  )

}

export default Schedule
