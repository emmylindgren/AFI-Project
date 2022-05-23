import React from 'react';
import { Link } from "react-router-dom";
import '../custom.css'

const style = {
    width: '200px',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '20px',
    userSelect: 'none',
    lineHeight: '20px',
    WebkitUserSelect: 'none',
    cursor: 'pointer',
}
const textStyle = {
    marginBottom: '0px',
    fontSize: '1rem',
    fontFamily: 'Inter',
    color: 'var(--deep-green)',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    textDecoration: 'none',
}
function BackButton({ text, to, state }) {

    return (
        <div style={style}>
            <img src='/icons/chevron-green.svg' width={'20px'} height={'20px'} alt='<' />
            <Link style={textStyle} to={to} state={{ eventInfo: state }}>{text}</Link>
        </div>
    )
}

export default BackButton;