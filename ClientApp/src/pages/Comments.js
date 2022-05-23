import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../config';
import Post from '../components/Post';
import LoadingCard from '../components/LoadingCard';
import ErrorCard from '../components/ErrorCard';
import BackButtonGreen from '../components/BackButtonGreen';
import BackButton from '../components/BackButton';

function Comments() {

    const { postID } = 5;

    const [post, setPost] = useState([]);
    const [state, setState] = useState('loading');

    useEffect(async ()=>{
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
            };
        axios.get(API_ADRESS + '/api/Post/'+5)
        .then(res =>{
            setPost(res.data)
            setState('loaded')
            console.log(res.data)
        })
        .catch(err =>{
            setState('error')
            console.log(err)
        })
    },[])

    const getCurrentState = () => {
        switch(state){
            case 'loading':
                return <LoadingCard/>
            case 'loaded':
                return <Post post={post} withComment={false}/>
            case 'error':
                return <ErrorCard
                iconChoice={'filenotfound'} 
                infoText={"Oops, there was a problem when fetching your data! Try again later."}
                    />
        }
    }

  return (
    <div className='page-container' style={{backgroundColor:'var(--light-gray)',height: '100vh',}}>
          <div className='page-content'>
              <div style={{marginBottom:'2rem',}}>
                <BackButton text={"Your Neighbourhood"} to={'../Wall'}/>
              </div>
              {getCurrentState()}
          </div>
    </div>
  )
}

export default Comments
