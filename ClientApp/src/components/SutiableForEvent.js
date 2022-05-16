import axios from 'axios'
import { API_ADRESS } from '../config';
import { useEffect, useState } from 'react';
import '../custom.css'
import Disability from './form/Disability';

function SuitableForEvent({event}) {
    
    let hasDisabilities = Object.keys(event.ev_Disabilities).length;
    const [disabilities, setDisabilities] = useState([]);
    useEffect(() => {
        axios.get(API_ADRESS + '/api/disability')
        .then(res => {
            setDisabilities(res.data);
        })
    }, []);

    const showDisabilities = () => {
        return event.ev_Disabilities.map(disability => {
            console.log()
            return (<div key={disability.dis_Id}><Disability name={disabilities.di_Name} /></div>)
        })
    }
    
    return (
        <div>
            <h3>Suitable for</h3>
            {hasDisabilities ? 
                <div>
                    <div>
                        {showDisabilities()}
                    </div>
                </div>
                : <p>No categories chosen</p>
            }
        </div>
    );
}

export default SuitableForEvent
