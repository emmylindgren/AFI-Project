import React, { useEffect } from 'react'
import { useState, useRef } from "react";
import WallPost from "../components/form/WallPost";
import Button from '../components/Button';
import { API_ADRESS } from "../config";
import axios from "axios";

const headerWrapperStyle = {
  height: '200px',
  backgroundColor: 'var(--white)',
  padding: '20px',
  transition: '200ms',
  borderRadius: '0 0 30px 30px',
}

const prImgStyle = {
  borderRadius: '100%',
  margin: '32px 15px 0 0',
  width: '45px',
  height: '45px'
}

function Wallheader({ onSubmitSuccess }) {


  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [focused, setFocused] = useState(false)

  useEffect(() => {
    // On component unmount, it runs the function useEffect returns.
    return () => {
      document.removeEventListener('click', e => { })
    }
  })

  const submitPost = async () => {

    let form = new FormData();

    form.append('postdata', JSON.stringify({
      Po_Content: content,
    }));

    form.append('id', localStorage.getItem('profileId'))

    axios.post(API_ADRESS + '/api/post', form)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          setError('')
          onSubmitSuccess()
          setContent('')
        }
        else {
          setError('Something went wrong. Try again later.');
          setSuccess('');
        }
      })
      .catch(err => {
        setSuccess('')
        setError('Something went REALLY wrong! Try again later.')
        console.error(err);
      });
  }

  const handlePress = () => {
    document.addEventListener('click', e => {
      if (document.getElementById('postHeader').contains(e.target)) setFocused(true)
      else setFocused(false)
    })
  }

  return (

    <>
      <div style={focused ? { ...headerWrapperStyle, height: '330px' } : headerWrapperStyle} onClick={handlePress} id='postHeader'>
        <h1>Your neighbourhood</h1>
        <div>
          <div style={{ display: 'flex' }} >

            <img src={API_ADRESS + "/api/profile/image/" + localStorage.getItem("profileId")} style={prImgStyle}></img>
            <WallPost
              value={content}
              onChange={setContent}
              label="Post something"
              placeholder="What have you been up to lately..."
              open={focused}
            />
          </div>
          {focused ? (
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
              <div style={{ marginTop: '20px', width: '100px' }}>
                <Button text="Post" onClick={submitPost} buttonColorChoice="green" iconChoice="post" />
              </div>
            </div>
          ) : (
            ''
          )}
          <p className='err-text'>{error}</p>
        </div>

      </div>
    </>

  )
}

export default Wallheader
