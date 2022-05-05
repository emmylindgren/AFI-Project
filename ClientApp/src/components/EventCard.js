import React, {useState} from 'react'
import axios from 'axios'

import '../custom.css'

const getEventInfo = () => {
    axios.get('https://localhost:7259/api/event/'+ 1)
    .then(res => {
        const variable = res.data;
        console.log(variable)
        //this.setState({ profileId });
        //console.log(profileId);
    })
    .catch(function (error){
        console.log(error);
    });
};

function EventCard({eventid}) {

    const data = getEventInfo();

    return (
        <div className="page-container">
            <div className="page-content">
                <div className="event-card">
                    <p>Hej</p>
                    console.log({data})
                    
                </div>
            </div>
        </div>
    );
}

export default EventCard
