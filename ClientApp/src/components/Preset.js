import React from 'react'
import Button from './Button'

/**
 * Format:
 * <div className='page-container'>
        <div className='page-content'>
            <Preset title={"Promenade"} infotext={"A stroll in the park."} suitableFor={"Hearing impaired, Sight impaired"} iconSrc={'icons/PromenadeIcon.svg'}/>
        </div>
    </div>
    
 */

const wrapperStyle = {
    display: 'grid',
    gridTemplateColumns:'0.8fr 3fr 1fr',
 
}
const roundIconBackground = {
    borderRadius:'50px',
    background: 'var(--light-green)',
    height:'50px',
    width:'50px',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const textInfo = {
    gridColumn:'2',
}

const buttonStyle ={
    gridColumn:'3',
    justifySelf:'center',
    alignSelf:'center',
}

const suitableTextStyle = {
    color:'var(--grey-text)',
}

function Preset({title, infotext, iconSrc, suitableFor, onClick}) {
  return (
    <div style = {wrapperStyle}>
      <div style = {roundIconBackground} >
        <img height={'30px'} src={iconSrc}/>
      </div>
      <div style={textInfo}>
        <h3>{title}</h3>
        <p>{infotext}</p>
        <h4 style={suitableTextStyle}>Suitable for:</h4>
        <p>{suitableFor}</p>
      </div>
      <div style={buttonStyle}>
        <Button text="Create" onclick ={onClick} buttonColorChoice ="green" iconChoice ="add" /> 
      </div>
    </div>
  )
}

export default Preset
