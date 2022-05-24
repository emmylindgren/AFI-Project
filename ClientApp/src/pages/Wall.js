import React from 'react'
import Post from '../components/Post'
import TabBar from '../components/TabBar'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../config';
import LoadingCard from '../components/LoadingCard';
import ErrorCard from '../components/ErrorCard';
import Wallheader from '../components/Wallheader';


function Wall() {

  const [posts, setPosts] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    axios.defaults.headers.common = {
      "ApiKey": localStorage.getItem("ApiKey"),
    };
    axios.get(API_ADRESS + '/api/Post')
      .then(res => {
        setPosts(res.data)
        setState('loaded')
        if (res.data.length < 1) {
          setState('nodata')
        }
      })
      .catch(err => {
        setState('error')
      })
  }

  let renderPosts = (posts) => {

    return posts.map(post => {
      return (
        <div>
          <div key={post}><Post post={post} /></div>
        </div>
      )
    })
  }

  const getCurrentState = () => {
    switch (state) {
      case 'loading':
        return ''
      case 'loaded':
        return renderPosts(posts)
      case 'nodata':
        return <ErrorCard
          infoText={"Oh no, there's nothing here! No one has added any posts. Maybe be the first one to do so?"}
        />
      case 'error':
        return <ErrorCard
          iconChoice={'filenotfound'}
          infoText={"Oops, there was a problem when fetching your data! Try again later."}
        />
    }
  }

  const style = {
    backgroundColor: 'var(--superlight-green)',
    height: 'fit-content',
    minHeight: '100vh'
  }

  return (
    <div style={style}>
      <Wallheader onSubmitSuccess={fetchPosts} />
      <div className='page-container'>
        <div className='page-content'>
          {getCurrentState()}
        </div>
        <TabBar activeTab={2} />
      </div>
    </div>
  )
}

export default Wall
