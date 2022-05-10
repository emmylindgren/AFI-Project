import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { API_ADRESS } from '../../config';
import '../../custom.css';
import Disability from './Disability';

const style = {

}

function DisabilityInput({name, icon}) {

    const [disabilities, setDisabilities] = useState([]);

    const getDisabilities = async (diabilities) => {
        disabilities.map((disability) =>{
            return(
                <div>
                    <Disability name={disability.Di_Name} icon={disability.Di_Icon}/>
                </div>
                )
        })
    }

    useEffect(() => {
        axios.get(API_ADRESS + '/api/disability').then(res => {
            setDisabilities(res.data)
        })
    },[])

    return (
        <div>
        </div>
    )
}

export default DisabilityInput;