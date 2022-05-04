import React from 'react';
import Input from './form/Input'
import '../custom.css'
import BackButton from './BackButton';

const style = {
    backgroundColor: 'rgb(240,240,240)',
}
function SignUp() {
    return (
        <div style={style}className='page-container'>
            <div className='page-content'>
                <BackButton text="Back" onClick={() => {console.log("hej!")}}/>
                <h1>Create New Profile</h1>
                <Input placeholder="Name" label="Name"/>
                <Input placeholder="Test" label="Adress"/>
                <Input placeholder="Test" label="Date of Birth"/>
            </div>
        </div>
    )
}

export default SignUp;