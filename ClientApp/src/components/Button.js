import React, { Component } from 'react'
import '../custom.css'

//Format: 
//<Button text="hej" onclick ={() => {console.log("hej!")}} buttonColorChoice ="green" iconChoice ="add" /> 
// IconChoice: add, accept,decline, post,comment and like. Leave out if no icon is needed. 

const buttonstyleGreen = { 
    backgroundColor: 'var(--deep-green)',
    height: '59px',
    padding: '1rem',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    cursor:'pointer',
    flexGrow: 1,
}

const buttonstyleRed = { 
    backgroundColor: 'var(--red-button)',
    height: '59px',
    padding: '1rem',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    cursor:'pointer',
    flexGrow: 1,
}

const buttonstyleGray = { 
    backgroundColor: 'var(--grey-text)',
    height: '59px',
    padding: '1rem',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    cursor:'pointer',
    flexGrow: 1,
}

const buttonTextStyle = {
    color:'white',
    fontFamily: 'Inter',
    fontWeight: '700',
    margin: '0px',
    lineHeight: '20px',
    marginRight:'0.5rem',
    marginLeft: '0.5rem',
}

const buttonIconStyle = {
    height: '1.5rem',
    
}

function Button({text, onClick, buttonColorChoice, iconChoice}) {

    const functionWithSwitch = (iconChoice) => {
        switch(iconChoice){
            case "add":
                return "icons/addIcon.svg"
            case "accept": 
                return "icons/AcceptIcon.svg"
            case "decline":
                return "icons/DeclineIcon.svg"
            case "post":
                return "icons/PostIcon.svg"
            case "like":
                return "icons/LikeIcon.svg"
            case "comment":
                return "icons/CommentIcon.svg"
            default:
                return "icons/addIcon.svg"
        }
    }

    let chooseStyle = () => {
        if(buttonColorChoice === "red"){
            return buttonstyleRed
        }
        if(buttonColorChoice === "gray"){
            return buttonstyleGray
        }
        return buttonstyleGreen
    }

    return (
        <div onClick={() => onClick()} style={chooseStyle()}>
            {iconChoice ? <img  style ={buttonIconStyle} src= {functionWithSwitch(iconChoice)} /> : ""}
            <p style ={buttonTextStyle}>{text}</p>
        </div>
    )
  
}

export default Button
