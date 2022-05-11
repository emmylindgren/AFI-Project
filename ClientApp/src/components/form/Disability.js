import React from 'react';
import { useState, useImperativeHandle, forwardRef } from 'react';
import '../../custom.css';

const style = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'var(--superlight-green)',
    borderStyle: 'solid',
    borderColor: 'var(--superlight-green)',
    borderRadius: '200px',
    padding: '15px',
    width: 'fit-content',
    transitionDuration: '200ms'
}
const selectedStyle = {
    borderStyle: 'solid',
    borderColor: 'var(--deep-green)',
    backgroundColor: 'var(--light-green)',
    transitionDuration: '200ms'
}

const Disability = forwardRef((props, _ref) =>{

    const [selected, setSelected] = useState(false)

    // useImperativeHandle makes "getSelected" visible from child reference in parent component.
    // from: ref.current.getSelected()
    useImperativeHandle(_ref, () => ({
        // Toss child state into parent component
        getSelected: () => {
            return selected
        },
    }));

    return (
        <div
            style={selected ? {...style, ...selectedStyle}: style}
            onClick={() =>{setSelected(!selected)}}
        >
            <img src='icons/addIconBlack.svg'/>
            <p style={{marginBottom: 0, marginLeft: '10px'}}>{props.name}</p>
        </div>
    )
})

export default Disability;