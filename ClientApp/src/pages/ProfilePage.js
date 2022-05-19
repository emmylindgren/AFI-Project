import axios from "axios";
import { useEffect, useState } from "react";
import LoadingCard from "../components/LoadingCard";
import TabBar from "../components/TabBar";
import '../custom.css'
import { API_ADRESS } from "../config";

const propicStyle={
    width: '20rem',
    height: '20rem',
    borderRadius: '500px',
    objectFit: 'cover',
}

function ProfilePage() {

    const [state, setState] = useState('loading');
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        axios.get(API_ADRESS + '/api/profile/' + localStorage.getItem("profileId"))
        .then(res => {
            if(res.status >= 200 && res.status < 300){
                setUserInfo(res.data)
                setState('loaded')
            }
        })
    },[])

    return (
        <div className='page-container'>
            <div className='page-content'>
                {state === 'loaded' ?
                (
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <img src={API_ADRESS + '/api/profile/image/'+localStorage.getItem('profileId')} id='propic' alt='propic' style={propicStyle}/>
                    </div>
                ) : (
                    <LoadingCard/>
                )}
            </div>
        <TabBar activeTab={3}/>
        </div>
    );
}

export default ProfilePage;