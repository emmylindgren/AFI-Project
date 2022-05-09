import React from 'react'

/**
 * Format: 
 * <ScheduleEventCard {eventId=5]/>
 */

const wrapperScheduleEventStyle ={
    background:'var(--deep-green)',
    display:'grid',
    gridTemplateColumns:'1fr 4fr 0.5fr',
    cursor:'pointer',
    borderRadius:'10px',
    color:'var(--white)',
    alignItems: 'center',
    height:'6rem',
}

const timeWrapper ={
    background:'var(--light-green)',
    height:'100%',
    width:'80px',
    borderRadius:'10px',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:'2rem',
    color: 'var(--black)',
}

const textStyle ={
    margin: '0px',
}

// Use eventID to get time, title and address to display. Also make 
// first div onlick go to that event information site. 
function ScheduleEventCard({eventId}) {
  return (
    <div style={wrapperScheduleEventStyle}>
        <div style={timeWrapper}>
            <h4 style={textStyle}>1:30</h4>
            <p style={textStyle}>AM</p>
        </div>
        <div>
            <h4 style={textStyle}>Title for the event</h4>
            <p style={textStyle}>Address</p>
        </div>
        <img height='25rem' src='icons/GoToIcon.svg'/>
    </div>
  )
}

export default ScheduleEventCard
