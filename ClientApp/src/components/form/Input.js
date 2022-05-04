import React from 'react';
import './InputStyle.css'

function Input({type, placeholder, label, id}) {
    return (
        <div>
            <label>{label}</label>
            <input className='textInput' id={id} type={type} placeholder={placeholder} />
        </div>
    )
}

export default Input;