import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../custom.css'
import '../components/InputStyle.css'
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import axios from 'axios';
import { API_ADRESS } from '../config';
import DisabilityInput from '../components/form/DisabilityInput';
import TextInput from '../components/form/TextInput';
import DateInput from '../components/form/DateInput';

const style = {
    backgroundColor: 'rgb(240,240,240)',
}

function EditProfile() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState(state.pr_Firstname ? state.pr_Firstname : '');
    const [lastname, setLastname] = useState(state.pr_Lastname ? state.pr_Lastname : '');
    const [birthdate, setBirthdate] = useState(state.pr_BirthDate ? state.pr_BirthDate.split('T')[0] : '');
    const [adress, setAdress] = useState(state.pr_Street ? state.pr_Street : '');
    const [postalcode, setPostalCode] = useState(state.pr_PostalCode ? state.pr_PostalCode : '');
    const [city, setCity] = useState(state.pr_City ? state.pr_City : '');

    const [profilePicture, setProfilePicture] = useState(API_ADRESS + '/api/profile/image/' + localStorage.getItem('profileId'));

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [fileChanged, setFileChanged] = useState(false);

    const disabilityRef = useRef(null);

    useEffect(() => {
        const filepicker = document.getElementById('propicker');
        filepicker.addEventListener('change', (e) => {
            setFileChanged(true)
            setProfilePicture(URL.createObjectURL(e.target.files[0]));
        })

        setTimeout(() => {
            disabilityRef.current.setPillStates(state.pr_Disabilities);
        }, 2000)
    }, [])

    const submitProfile = async () => {

        let form = new FormData();

        const propicker = document.getElementById('propicker');

        form.append('userdata', JSON.stringify({
            Pr_Id: localStorage.getItem('profileId'),
            Pr_Firstname: firstname,
            Pr_Lastname: lastname,
            Pr_BirthDate: birthdate,
            Pr_Street: adress,
            Pr_PostalCode: postalcode,
            Pr_City: city,
            GoogleId: state ? state.googleId : null,
            Pr_Disabilities: disabilityRef.current.getPillStates()
        }));

        if (fileChanged) {
            let blob
            // If a file is selected
            if (propicker.files[0]) {
                // Get from user selection.
                blob = await FileReaderPromised(propicker.files[0])
            }
            else {
                // Get from Google/default.
                blob = await fetch(profilePicture).then(r => r.blob())
            }
            let binaryImg = new File([blob], 'uploadFile.jpg', { type: 'image/jpeg' })
            form.append('uploadFile', binaryImg);
        }

        axios.put(API_ADRESS + '/api/profile', form)
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    setError('');
                    setSuccess('Profile updated');
                    //SÄTT API NYCKEL I LOCAL STORAGE OCKSÅ!!!!
                    // Be post att returnera den nya användarens profilId samt API nyckel.
                    navigate('/profile')
                }
                else {
                    setError('Something went wrong. Try again later.');
                    setSuccess('');
                }
            })
            .catch(err => {
                setSuccess('')
                setError('Something went REALLY wrong! Try again later.')
                console.error(err);
            });
    }

    return (
        <div style={style} className='page-container'>
            <div className='page-content'>
                <BackButton text="Back" to='/profile' />
                <h1>Edit Profile</h1>

                {renderProfilePicture(profilePicture)}

                <TextInput value={firstname} onChange={setFirstname} label="Firstname" placeholder="Emma..." />
                <TextInput value={lastname} onChange={setLastname} label="Lastname" placeholder="Johnson..." />
                <DateInput value={birthdate} onChange={setBirthdate} label='Birthday' placeholder='2022-02-02' />
                <TextInput value={adress} onChange={setAdress} label="Adress" placeholder="Gnejsvägen 1..." />
                <TextInput value={postalcode} onChange={setPostalCode} label="Postal Code" placeholder="12345..." />
                <TextInput value={city} onChange={setCity} label="City" placeholder="Stockholm..." />

                <DisabilityInput ref={disabilityRef} />

                <Button text='Apply changes' buttonColorChoice='green' onClick={() => submitProfile()} />

                <div style={{ margin: '20px 0 20px 0' }}></div>
                <p className='err-text'>{error}</p>
                <p className='success-text'>{success}</p>
            </div>
        </div>
    )
}

const propicStyle = {
    width: '15rem',
    height: '15rem',
    borderRadius: '500px',
    objectFit: 'cover',
}

function renderProfilePicture(picture) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={picture} id='propic' alt='propic' style={propicStyle} />
            <input type='file' id='propicker' className='clickable-text' name='filename' style={{ width: '145px', paddingTop: '20px' }} />
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

export default EditProfile;