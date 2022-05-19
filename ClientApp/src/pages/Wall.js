import React from 'react'
import Post from '../components/Post'
import TabBar from '../components/TabBar'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../config';


function Wall() {

  const [posts, setPosts] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(async ()=>{
      axios.defaults.headers.common = {
          "ApiKey": localStorage.getItem("ApiKey"),
        };
      axios.get(API_ADRESS + '/api/Post')
      .then(res =>{
          setState('loaded')
          setPosts(res.data)
          console.log(res.data)
      })
      .catch(err =>{
          setState('error')
      })
  },[])

  let renderPosts = (posts) =>{

      return posts.map(post => {
            return (
              <div>
                  <div key={post}><Post post={post}/></div>
              </div>
              )
      })
  }

  return (
    <div className='page-container' style={{backgroundColor:'var(--superlight-green)',height: '100vh',}}>
        <div className='page-content'>
            <p>Not implemented, for testing.</p>
            {renderPosts(posts)}
        </div>
        <TabBar activeTab={2}/>
    </div>
  )
}

export default Wall
