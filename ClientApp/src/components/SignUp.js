import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../custom.css'
import './InputStyle.css'
import BackButton from './BackButton';
import Button from './Button';
import axios from 'axios';
import { API_ADRESS } from '../config';

const style = {
    backgroundColor: 'rgb(240,240,240)',
}
function SignUp() {

    const location = useLocation();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [adress, setAdress] = useState('');
    const [postalcode, setPostalCode] = useState('');
    const [city, setCity] = useState('');

    const [profilePicture, setProfilePicture] = useState('plant.png');

    const [error, setError] = useState('');

    useEffect(() =>{
        const filepicker = document.getElementById('propicker');
        filepicker.addEventListener('change', (e) => {
            setProfilePicture(URL.createObjectURL(e.target.files[0]));
        })
    },[])

    const submitProfile = () =>{

        console.log("begin submit")

        const reader = new FileReader();

        let form = new FormData();

        reader.addEventListener('load', () => {
            let file = new File([reader.result],'uploadFile.jpg',{type: 'image/jpeg'})
            form.append('uploadFile', file);

            form.append('userdata', JSON.stringify({
                Pr_Firstname: firstname,
                Pr_Lastname: lastname,
                Pr_BirthDate: birthdate,
                Pr_Adress: adress,
                Pr_PostalCode: postalcode,
                Pr_City: city,
            }));
    
            axios({
                method: 'POST',
                url: API_ADRESS + '/api/profile',
                data: form,
            })
            .then(res => {
            console.log(res);
            })
            .catch(function (error){
                console.log(error);
            });
        });

        const propicker = document.getElementById('propicker');
        if(!propicker.files[0]){
            console.error("Please pick a file. Dumb bitch.");
            return
        }
        reader.readAsArrayBuffer(propicker.files[0]);
    }

    return (
        <div style={style}className='page-container'>
            <div className='page-content'>
                <BackButton text="Back" to='/' onClick={() => {console.log("hej!")}}/>
                <h1>Create New Profile</h1>

                
                {
                getProfilePicture(profilePicture)}
                
                {getInput('Firstname','Emma...',firstname,setFirstname)}
                {getInput('Lastname','Hornham...',lastname,setLastname)}
                {getInput('Date of Birth','2022-04-05',birthdate,setBirthdate)}
                {getInput('Adress','Gnejs 1...',adress,setAdress)}
                {getInput('Postal Code','907 40.',postalcode,setPostalCode)}
                {getInput('City','Umea...',city,setCity)}

                <p>{error}</p>

                <Button text='Sign up' buttonColorChoice='green' onClick={() => submitProfile()}/>

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

function getProfilePicture(picture){
    return (
        <div>
            <img src={picture} id='propic' alt='propic' style={{width: '4rem', height: '4rem', borderRadius: '500px'}}/>
            <input type='file' id='propicker' className='clickable-text' name='filename'/>
        </div>
    )
}

export default SignUp;