import React from 'react'

/**
 * Format
 * <ErrorCard iconChoice={'filenotfound'} 
 * infoText={"Oops, there was a problem when fetching your data! Try again later."}/>
 * 
 * <ErrorCard 
 * infoText={"Oh no, there’s no events near you. Maybe be the first to create one? A small step for mankind..."}/>
 * 
 * <ErrorCard infoText={"Oh no, you have no events coming up! Try adding a few?  "}/>
 * 
 */

const style = {
    display:'flex',
    flexDirection:'column',
    padding:'2rem',
}

const iconStyle = {
    height:'40vw',

}
function ErrorCard({iconChoice,infoText}) {
  return (
    <div style={style}>
        <p>{infoText}</p>
        {iconChoice == 'filenotfound' ? <img style ={iconStyle} src='icons/fileNotFoundIcon.svg'/> :<img style ={iconStyle} src='icons/noDataIcon.svg'/>  }
    </div>
  )
}

export default ErrorCard
