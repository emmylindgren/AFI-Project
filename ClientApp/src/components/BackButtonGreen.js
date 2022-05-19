import React from 'react';
import { Link } from "react-router-dom";
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
    fontFamily: 'Inter',
    color: 'var(--deep-green)',
    userSelect: 'none',
    webkitUserSelect: 'none',
}

// <Link style={textStyle} to={to}>{text}</Link>
function BackButtonGreen({onClick,to}) {
    
    return (
        <div style={style} onClick={() => onClick()}>
            <Link to={to}><img src='/icons/Back.svg' width = {'50vw'} height={'50vw'} alt='<'/></Link>
            
        </div>
    )
}

export default BackButtonGreen;