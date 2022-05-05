import React, { Component } from 'react'
import '../custom.css'


const buttonstyleGreen = { 
    backgroundColor: 'var(--deep-green)',
    height: '59px',
    padding: '1rem',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
}

const buttonstyleRed = { 
    backgroundColor: 'var(--red-button)',
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

function BigButton({text,addIcon, onClick, buttonColorChoice}) {
 
    return (
        <div onClick={() => onClick()} style={buttonColorChoice ==="green"? buttonstyleGreen:buttonstyleRed}>
            {addIcon ? <img  style ={buttonIconStyle} src="icons/addIcon.svg"/> : ""}
            <p style ={buttonTextStyle}> {text}</p>
        </div>
    )
  
}

export default BigButton
