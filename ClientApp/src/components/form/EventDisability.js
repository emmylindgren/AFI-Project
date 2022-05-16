import React from 'react';
import { useState, useImperativeHandle, forwardRef } from 'react';
import '../../custom.css';


const style = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'var(--superlight-green)',
    borderStyle: 'solid',
    borderColor: 'var(--superlight-green)',
    borderRadius: '200px',
    padding: '15px',
    width: 'fit-content',
    transitionDuration: '200ms',
    paddingBottom: '15px',
    marginRight: '8px',
    marginBottom: '8px',
}

const img = {
    width: '20px',
    marginRight: '5px'
}

function EventDisability (props) {

    let picIcon = () => {
        if(props.name === 'Limited Mobility'){
            return 'icons/LimitedMobilityIcon.svg'
        }
        if(props.name === 'Sight Impaired'){
            return 'icons/SightImpairedIcon.svg'
        }
        if(props.name === 'Wheelchair'){
            return 'icons/WheelchairIcon.svg'
        }
        if(props.name === 'Hearing Impaired'){
            return 'icons/HearingImpairedIcon.svg'
        }
        return 'icons/addIconBlack.svg'
    }

    return (
        <div style={style} >
            <img src={picIcon()} style={img}/>
            <p style={{marginBottom: 0, marginLeft: '0'}}>{props.name}</p>
        </div>
    )
}

export default EventDisability;