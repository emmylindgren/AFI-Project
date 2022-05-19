import React from 'react'
import Post from '../components/Post'
import TabBar from '../components/TabBar'

function Wall() {
  return (
    <div className='page-container' style={{backgroundColor:'var(--superlight-green)',height: '100vh',}}>
        <div className='page-content'>
            <p>Not implemented, for testing.</p>
            <Post/>
        </div>
        <TabBar activeTab={2}/>
    </div>
  )
}

export default Wall
