import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../custom.css'
import './InputStyle.css'
import BackButton from './BackButton';
import Button from './Button';
import axios from 'axios';
import { API_ADRESS } from '../config';
import DisabilityInput from './form/DisabilityInput';
import TextInput from './form/TextInput';
import DateInput from './form/DateInput';

const style = {
    backgroundColor: 'rgb(240,240,240)',
}

function SignUp() {

    const location = useLocation();

    const [firstname, setFirstname] = useState(location.state ? location.state.firstname : '');
    const [lastname, setLastname] = useState(location.state ? location.state.lastname: '');
    const [birthdate, setBirthdate] = useState('');
    const [adress, setAdress] = useState('');
    const [postalcode, setPostalCode] = useState('');
    const [city, setCity] = useState('');

    const [profilePicture, setProfilePicture] = useState(location.state ? location.state.imgUrl : 'plant.png');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const disabilityRef = useRef(null);

    useEffect(() =>{
        const filepicker = document.getElementById('propicker');
        filepicker.addEventListener('change', (e) => {
            setProfilePicture(URL.createObjectURL(e.target.files[0]));
        })
    },[])

    const submitProfile = async () =>{

        let form = new FormData();

        const propicker = document.getElementById('propicker');

        form.append('userdata', JSON.stringify({
            Pr_Firstname: firstname,
            Pr_Lastname: lastname,
            Pr_BirthDate: birthdate,
            Pr_Adress: adress,
            Pr_PostalCode: postalcode,
            Pr_City: city,
            GoogleId: location.state ? location.state.googleId: null,
            Pr_Disabilities: disabilityRef.current.getPillStates()
        }));

        let blob
        // If a file is selected
        if(propicker.files[0]) {
            // Get from user selection.
            blob = await FileReaderPromised(propicker.files[0])
        }
        else{
            // Get from Google/default.
            blob = await fetch(profilePicture).then(r => r.blob())
        }
        let binaryImg = new File([blob],'uploadFile.jpg',{type: 'image/jpeg'})
        form.append('uploadFile', binaryImg);

        axios.post(API_ADRESS + '/api/profile', form)
        .then(res => {
            if(res.status >= 200 && res.status < 300){
                setError('');
                setSuccess('Successfully created profile.');
                //SÄTT API NYCKEL I LOCAL STORAGE OCKSÅ!!!!
                // Be post att returnera den nya användarens profilId samt API nyckel.
                localStorage.setItem("profileId", location.state.profileId);
                // Redirect to homepage.
            }
            else{
                setError('Something went wrong. Try again later.');
                setSuccess('');
            }
        })
        .catch( err => {
            setSuccess('')
            setError('Something went REALLY wrong! Try again later.')
            console.error(err);
        });
    }

    return (
        <div style={style}className='page-container'>
            <div className='page-content'>
                <BackButton text="Back" to='/' onClick={() => {console.log("hej!")}}/>
                <h1>Create New Profile</h1>

                {renderProfilePicture(profilePicture)}

                <TextInput value={firstname} onChange={setFirstname} label="Firstname" placeholder="Emma..."/>
                <TextInput value={lastname} onChange={setLastname} label="Lastname" placeholder="Emma..."/>
                <DateInput value={birthdate} onChange={setBirthdate} label='Birthday' placeholder='2022-02-02'/>
                <TextInput value={adress} onChange={setAdress} label="Adress" placeholder="Gnejsvägen 1..."/>
                <TextInput value={postalcode} onChange={setPostalCode} label="Postal Code" placeholder="12345..."/>
                <TextInput value={city} onChange={setCity} label="City" placeholder="Stockholm..."/>

                <DisabilityInput ref={disabilityRef}/>

                <Button text='Sign up' buttonColorChoice='green' onClick={() => submitProfile()}/>
                
                <div style={{margin: '20px 0 20px 0'}}></div>
                <p className='err-text'>{error}</p>
                <p className='success-text'>{success}</p>

            </div>
        </div>
    )
}

const propicStyle={
    width: '20rem',
    height: '20rem',
    borderRadius: '500px',
    objectFit: 'cover',
}

function renderProfilePicture(picture){
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <img src={picture} id='propic' alt='propic' style={propicStyle}/>
            <input type='file' id='propicker' className='clickable-text' name='filename' style={{width: '145px', paddingTop: '20px'}}/>
        </div>
    )
}

function FileReaderPromised(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
        }
    );
}

export default SignUp;