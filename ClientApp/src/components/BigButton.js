import React, { Component } from 'react'
import './BigButton.css'
import '../custom.css'


const buttonstyle = { 
    backgroundColor: 'var(--deep-green)',
    height: '59px',
    padding: '1rem',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
}

const buttonTextStyle = {
    color:'white',
    fontFamily: 'Inter',
    fontWeight: '700',
    margin: '0px',
    lineHeight: '20px',
}

const buttonIconStyle = {
    height: '1.5rem',
    marginRight: '1rem',
}

function BigButton({text,addIcon, onClick}) {
 
    return (
        <div style={buttonstyle} onClick={() => onClick()}>
            {addIcon ? <img  style ={buttonIconStyle} src="icons/addIcon.svg"/> : ""}
            <p style ={buttonTextStyle}> {text}</p>
        </div>
    )
  
}

export default BigButton
