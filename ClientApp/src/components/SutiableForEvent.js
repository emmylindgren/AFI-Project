import axios from 'axios'
import { API_ADRESS } from '../config';
import { useEffect, useState } from 'react';
import '../custom.css'
import EventDisability from './form/EventDisability';



const displayDisability = {
    display: 'flex',
    flexWrap: 'wrap',


}

function SuitableForEvent({event}) {
    
    let hasDisabilities = Object.keys(event.ev_Disabilities).length;
    const [disabilities, setDisabilities] = useState([]);
    
    useEffect(() => {
        axios.get(API_ADRESS + '/api/disability')
        .then(res => {
            setDisabilities(res.data);
        })
    }, []);

    let eventDisabilities = (num) => {
        let name
        Object.values(disabilities).map(item => {
            if(item.di_Id === num){
                name = item.di_Name
            } 
        })
        return name
    }

    let showDisabilities = () => {
        return event.ev_Disabilities.map(disability => {
            return (<div key={disability.dis_Id}><EventDisability name={eventDisabilities(disability.dis_Id)} /></div>)
        })
    }
    
    return (
        <div>
            <h3>Suitable for</h3>
            {hasDisabilities ? 
                <div>
                    <div style={displayDisability}>
                        {showDisabilities()}
                    </div>
                </div>
                : <p>Suitable for everyone</p>
            }
        </div>
    );
}

export default SuitableForEvent
