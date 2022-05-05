import React from 'react';
import './InputStyle.css'

const inline = {
    display: 'flex',
    flexDirection: 'row'
}

// Props are: label, id, type and placeholder.
function Input(props) {
    return (
        <div>
            {getType(props)}
        </div>
    )
}

function getType({label,type,id,placeholder}){
    switch(type){
        case 'date':
            return(
                <div>
                    <label>{label}</label>
                    <div style={inline} >
                        <input className='textInput' id={id} type={type} placeholder={placeholder} />
                    </div>
                </div>
            )
        default:
            return (
                <div>
                    <label>{label}</label>
                    <input className='textInput' id={id} type={type} placeholder={placeholder} />
                </div>
            )
    }
}

export default Input;