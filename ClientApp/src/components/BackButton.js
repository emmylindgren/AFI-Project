import React from 'react';
import { Button } from 'reactstrap';
import '../custom.css'

const style = {
    width: '200px',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '10px'
}
const textStyle = {
    marginBottom : '0px',
    color: 'var(--deep-green)',
}
function BackButton({text, onClick}) {
    return (
        <div style={style} onClick={() => onClick()}>
            <img src='/icons/chevron-green.svg'/>
            <p style={textStyle}>{text}</p>
        </div>
    )
}

export default BackButton;