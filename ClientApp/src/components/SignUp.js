import React, { useState } from 'react';
import '../custom.css'
import './InputStyle.css'
import BackButton from './BackButton';
import Disability from './form/Disability'
import { Button } from './';

const style = {
    backgroundColor: 'rgb(240,240,240)',
}
function SignUp() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [adress, setAdress] = useState('');
    const [postalcode, setPostalCode] = useState('');
    const [city, setCity] = useState('');

    return (
        <div style={style}className='page-container'>
            <div className='page-content'>
                <BackButton text="Back" to='/' onClick={() => {console.log("hej!")}}/>
                <h1>Create New Profile</h1>
                
                {getInput('Firstname','Emma...',firstname,setFirstname)}
                {getInput('Lastname','Hornham...',lastname,setLastname)}
                {getInput('Date of Birth','2022-04-05',birthdate,setBirthdate)}
                {getInput('Adress','Gnejs 1...',adress,setAdress)}
                {getInput('Postal Code','907 40.',postalcode,setPostalCode)}
                {getInput('City','Umea...',city,setCity)}
                {getProfilePicture()}

                <Button></Button>

            </div>
        </div>
    )
}

function getInput(label, placeholder,state,setState){
    return(
        <div>
            <label>{label}</label>
                <input
                    className='textInput'
                    placeholder={placeholder}
                    value={state}
                    onChange={(e) =>{setState(e.target.value)}}
                />
        </div>
    )
}

function getProfilePicture(){
    return (
        <div>
            <img src='plant.png' alt='propic' style={{width: '4rem', height: '4rem', borderRadius: '500px'}}/>
            <input type='file' id='propic' className='clickable-text' name='filename'/>
        </div>
    )
}

export default SignUp;