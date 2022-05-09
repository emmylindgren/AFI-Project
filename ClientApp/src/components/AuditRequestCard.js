import React from 'react'
import Button from './Button'

const imgStyle = {
    height:'80px',
    width:'80px',
    borderRadius:'50px',
}

const textandImageStyle = {
    display:'flex',
}
const buttonStyles = {
    display:'flex',
    justifyContent:'flex-start',
    gap:'2rem',
    paddingTop:'1rem',
}

const textStyles = {
    marginLeft:'1rem', 
    marginTop:'1rem',
}



function AuditRequestCard({userID}) {
  return (
    <div>
        <div style={textandImageStyle}>
            <img style={imgStyle} src='plant.png'/>
            <div style={textStyles}>
                <p style={{fontWeight:'700'}}>Namn Namnsson</p>
                <p>Address</p>
            </div>
        </div>

        <div style={buttonStyles}>
            <Button text="Decline" onclick ={() => {console.log("hej!")}} buttonColorChoice ="red" iconChoice ="decline" />
            <Button text="Accept" onclick ={() => {console.log("hej!")}} buttonColorChoice ="green" iconChoice ="accept" />
        </div>
    </div>
  )
}

export default AuditRequestCard
