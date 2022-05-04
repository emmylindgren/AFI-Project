import React from 'react';
import { Button } from 'reactstrap';
import '../custom.css'

const style = {
    width: '200px',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '10px',
    userSelect: 'none',
    webkitUserSelect: 'none',
    cursor: 'pointer',
}
const textStyle = {
    marginBottom : '0px',
    fontSize: '1rem',
    color: 'var(--deep-green)',
    userSelect: 'none',
    webkitUserSelect: 'none',
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