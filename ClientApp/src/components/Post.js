import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../config';

const imgStyle = {
    height:'80px',
    width:'80px',
    borderRadius:'50px',
}

function Post({post}) {
    
    const [profile,setProfile] = useState();
    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
        };
        axios.get(API_ADRESS + '/api/profile/shortdetails/' + 1 /*post.p.Po_Owner.Pr_Id*/)
            .then(res => {
                setProfile(res.data);
                setLoaded(true)
                console.log(res.data);
            })
        .catch(function (error){
            console.log(error);
        });

    },[]);

    //<img src='./icons/LikeIcon.svg'/>
  return (
    <div>
        <div>
            <img style={imgStyle} src={API_ADRESS + "/api/profile/image/"+ 1} id="profile-image"/>
            <h3>{profile.pr_Firstname+ ' ' + profile.pr_Lastname}</h3>
        </div>
        <div>
            <p>Här ska de va innehåll sen</p>
        </div>
        <div>
            <div style={{backgroundColor:'green',}}>
                <img src='../icons/LikeIcon.svg'/>
                <p>Like</p>
            </div>
            <div>
                <img src='../icons/CommentIcon.svg'/>
                <p>Comment</p>
            </div>
        </div>
    </div>
  )
}

export default Post
