import React from 'react'
import { useState , useRef} from "react";
import WallPost from "../components/form/WallPost";
import { API_ADRESS } from "../config";
import axios from "axios";

const headerWrapperStyle = {
    height: '40vw',
    maxHeight: '200px',
    
}

const prImgStyle = {
  borderRadius: '100%',
  margin:'32px 15px 0 0',
  width: '45px',
  height: '45px'
}

function Wallheader() {


  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const submitPost = async () =>{

    let form = new FormData();

    axios.get(API_ADRESS + '/api/')

    form.append('postdata', JSON.stringify({
        Po_Content: content
    }));

    axios.post(API_ADRESS + '/api/post', form)
    .then(res => {
        if(res.status >= 200 && res.status < 300){
            setError('');
            setSuccess('Successfully posted.');
        }
        else{
            setError('Something went wrong. Try again later.');
            setSuccess('');
        }
    })
    .catch( err => {
        setSuccess('')
        setError('Something went REALLY wrong! Try again later.')
        console.error(err);
    });
}

  return (
    <div className='page-container'>
      <div className='page-content'>
        <div style={headerWrapperStyle} >
          <br></br>
          <h1>Your neighbourhood</h1>
          <div style={{display:'flex'}}>
            <img src={API_ADRESS + "/api/profile/image/" + localStorage.getItem("profileId")} style={prImgStyle}></img>  
            <WallPost value={content} onChange={setContent} label="Post something" placeholder="What have you been up to lately..."/>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Wallheader
