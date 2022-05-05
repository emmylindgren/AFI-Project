import React from 'react';
import { useState } from 'react';
import '../../custom.css';

const style = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'var(--superlight-green)',
    borderRadius: '200px',
    padding: '15px',
    width: 'fit-content'
}
const selectedStyle = {
    borderStyle: 'solid',
    borderColor: 'var(--deep-green)',
    transform: 'translate(-3px,-3px)',
    backgroundColor: 'var(--light-green)'
}

function Disability({name, icon}) {

    const [selected, setSelected] = useState(false)

    return (
        <div style={selected ? {...style,...selectedStyle}:style} onClick={() =>{setSelected(!selected)}}>
            <img src='icons/addIconBlack.svg'/>
            <p style={{marginBottom: 0, marginLeft: '10px'}}>{name}</p>
        </div>
    )
}

export default Disability;