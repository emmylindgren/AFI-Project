import React from 'react';
import { Link } from "react-router-dom";
import '../custom.css'

const style = {
    width: '200px',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '10px',
    userSelect: 'none',
    lineHeight: '20px',
    webkitUserSelect: 'none',
    cursor: 'pointer',
}
const textStyle = {
    marginBottom: '0px',
    fontSize: '1rem',
    fontFamily: 'Inter',
    color: 'var(--deep-green)',
    userSelect: 'none',
    webkitUserSelect: 'none',
}
function BackButton({ text, to }) {
    return (
        <div style={{ style }}>
            <img src='/icons/chevron-green.svg' width={'20px'} height={'20px'} alt='<' />
            <Link style={textStyle} to={to}>{text}</Link>
        </div>
    )
}

export default BackButton;