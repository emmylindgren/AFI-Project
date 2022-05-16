import React from 'react';
import '../custom.css';


const style = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'var(--superlight-green)',
    borderStyle: 'solid',
    borderColor: 'var(--superlight-green)',
    borderRadius: '200px',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingRight: '20px',
    paddingLeft: '20px',
    width: 'fit-content',
    transitionDuration: '200ms',
    marginRight: '8px',
    marginBottom: '8px',
}

const img = {
    width: '20px',
    marginRight: '5px'
}

function EventCatBubbles (props) {

    return (
        <div style={style} >
            
            <p style={{marginBottom: 0, marginLeft: '0'}}>{props.name}</p>
        </div>
    )
}

export default EventCatBubbles;