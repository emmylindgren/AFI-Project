import axios from "axios";
import { useEffect, useState } from "react";
import LoadingCard from "../components/LoadingCard";
import TabBar from "../components/TabBar";
import '../custom.css'
import { API_ADRESS } from "../config";
import ProfileDataBox from "../components/ProfileDataBox";
import SuitableForEvent from "../components/SutiableForEvent";
import ErrorCard from '../components/ErrorCard'
import { Link } from 'react-router-dom'

const propicStyle = {
    width: '15rem',
    height: '15rem',
    borderRadius: '500px',
    objectFit: 'cover',
}

function ProfilePage() {

    const [state, setState] = useState('loading');
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
        }
        axios.get(API_ADRESS + '/api/profile/' + localStorage.getItem("profileId"))
            .then(res => {
                console.log(res)
                if (res.status >= 200 && res.status < 300) {
                    setUserInfo(res.data)
                    setState('loaded')
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.error(err)
                setState('error')
            })
    }, [])

    const getJsx = () => {
        switch (state) {
            case 'loading':
                return <LoadingCard />
            case 'error':
                return <ErrorCard infoText={"Oops, there was a problem when fetching your data! Try again later."} />
            case 'loaded':
                return (
                    <>
                        <h1>Your Profile</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={API_ADRESS + '/api/profile/image/' + localStorage.getItem('profileId')} id='propic' alt='propic' style={propicStyle} />
                            <Link
                                className='clickable-text'
                                style={{ paddingTop: '20px' }}
                                to='/edit-profile'
                                state={userInfo}>
                                Edit profile
                            </Link>
                        </div>

                        <ProfileDataBox text={userInfo.pr_Firstname + ' ' + userInfo.pr_Lastname} label='Name' />
                        <ProfileDataBox text={userInfo.pr_BirthDate.split('T')[0]} label='Date of Birth' />
                        <ProfileDataBox text={userInfo.pr_Street + ', ' + userInfo.pr_PostalCode + ', ' + userInfo.pr_City} label='Adress' />

                        <label>Disabilities</label>
                        {userInfo.pr_Disabilities === null ? (
                            <p>None</p>
                        ) : (
                            <SuitableForEvent ev_Disabilities={userInfo.pr_Disabilities} />
                        )}

                        <p> Coming back to badges later..</p>
                    </>)
        }
    }

    return (
        <div className='page-container'>
            <div className='page-content'>
                {getJsx()}
            </div>
            <TabBar activeTab={3} />
        </div>
    );
}

export default ProfilePage;