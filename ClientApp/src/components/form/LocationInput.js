import '../InputStyle.css'
import React from 'react';

function LocationInput({value, onChange,label,placeholder}) {

    return (
        <div>
            <label>{label}</label>
            <div>
                <input
                    type='time'
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) =>{onChange(e.target.value)}}
                />
                <p style={{color: 'var(--deep-green)', margin: '0px 20px 0px 0px', fontWeight: '700'}}>Pick Date</p>
            </div>
        </div>
    );
}

export default LocationInput;