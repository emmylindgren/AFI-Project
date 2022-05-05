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
function BackButton({text, onClick,to}) {
    return (
        <div style={style} onClick={() => onClick()}>
            <img src='/icons/chevron-green.svg' alt='<'/>
            <Link style={textStyle} to={to}>{text}</Link>
        </div>
    )
}

export default BackButton;