import axios from 'axios'
import { API_ADRESS } from '../config';
import { useEffect, useState } from 'react';
import '../custom.css'
import EventDisability from './EventDisability';
import EventCatBubbles from './EventCatBubbles';



const displayCategories = {
    display: 'flex',
    flexWrap: 'wrap',

}

function EventInfoCat({event}) {
    
    let hasCategories = Object.keys(event.ev_Categories).length;
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        axios.get(API_ADRESS + '/api/category')
        .then(res => {
            console.log(res.data)
            setCategories(res.data);
        })
    }, []);

    let eventCategories = (num) => {
        let name
        Object.values(categories).map(item => {
            if(item.cat_Id === num){
                name = item.cat_Name
                
            } 
        })
        return name
    }

    let showCategories = () => {
        return event.ev_Categories.map(category => {
            return (<div key={category.cat_Id}><EventCatBubbles name={eventCategories(category.cat_Id)} /></div>)
        })
    }
    
    return (
        <div>
            <h3>Categories</h3>
            {hasCategories ? 
                <div>
                    <div style={displayCategories}>
                        {showCategories()}
                    </div>
                </div>
                : <p>No categories have been chosen for this event.</p>
            }
        </div>
    );
}

export default EventInfoCat