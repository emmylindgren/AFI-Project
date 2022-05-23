import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../config';
import LoadingCard from './LoadingCard';

const imgStyle = {
    height:'44px',
    width:'44px',
    borderRadius:'50px',
}

const postCard = {
    backgroundColor:'var(--white)',
    borderRadius:'10px',
    padding:'0.8rem',
    marginBottom:'2rem',
}

const likeAndCommentStyle = {
    display:'flex',
    alignContent:'center',
    paddingBottom:'1rem',
    gap:'0.5rem',
    cursor:'pointer',
}

const likeAndCommentWrapper = {
    display:'flex',
    justifyContent:'left',
    gap:'6rem',
}

const profileInfoStyle = {
    display:'flex',
    justifyContent:'left',
    alignItems:'center',
    gap:'1rem',
}

const commentWrapper = {
    marginTop:'1rem',
    marginBottom:'1rem',
}

function Post({post}) {
    
    const [profile,setProfile] = useState();
    const [loaded,setLoaded] = useState(false);
    const [liked, setLiked] = useState(false);

    useEffect(()=>{    
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
        };
        
        axios.get(API_ADRESS + '/api/profile/shortdetails/' + post.po_Owner.pr_Id)
            .then(res => {
                setProfile(res.data);
                setLiked(post.po_Likes.find((like) => {
                    return like.pr_Id == parseInt(localStorage.getItem("profileId"));
                }))
                setLoaded(true);
                console.log(post)
                console.log(timeAgo(post.Po_Date))
            })
        .catch(function (error){
            console.log(error);
        });
    },[]);



    let likePost = () => {
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
        };

        if(liked){
            axios.delete(API_ADRESS + '/api/Post/unlike/'+ post.po_Id + '/' + parseInt(localStorage.getItem("profileId")))
            .catch(function (error){
                console.log(error);
            });
            setLiked(false);

        }
        else{
            axios.post(API_ADRESS + '/api/Post/like/'+ post.po_Id + '/' + parseInt(localStorage.getItem("profileId")))
            .catch(function (error){
                console.log(error);
            });
            setLiked(true);
        }

    }

  return (
    <div>
        {loaded ? 
        (
        <div style={postCard}>
                <div style={profileInfoStyle}>
                    <img style={imgStyle} src={API_ADRESS + "/api/profile/image/"+ post.po_Owner.pr_Id} id="profile-image"/>
                    <div>
                        <h3 style={{marginBottom:'0',}}>{profile.pr_Firstname+ ' ' + profile.pr_Lastname}</h3>
                        <p className='gray-body-text' style={{marginBottom:'0',fontSize:'0.8rem',}}>{timeAgo(post.po_Date)}</p>
                    </div>
                </div>
            <div style={commentWrapper}>
                <p>{post.po_Content}</p>
            </div>
            <div style={likeAndCommentWrapper}>
                <div style={likeAndCommentStyle} onClick ={() => {likePost()}}>
                    <img src= {liked ? '../icons/LikedIcon.svg' : '../icons/LikeIcon.svg'}/> 
                    <p className='clickable-text' style={{marginBottom:'0px'}}>Like</p>
                </div>
                <div style={likeAndCommentStyle}>
                    <img src='../icons/CommentIcon.svg'/>
                    <p className='clickable-text' style={{marginBottom:'0px'}}>Comment</p>
                </div>
            </div>
        </div>
        )
        :(<div><LoadingCard/></div>)
        }
    </div>
  )
}

export default Post


// --- Main function
function timeAgo(dateParam) {
    if (!dateParam) {
      return null;
    }
  
    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();
  
  
    if (seconds < 5) {
      return 'now';
    } else if (seconds < 60) {
      return `${ seconds } seconds ago`;
    } else if (seconds < 90) {
      return 'about a minute ago';
    } else if (minutes < 60) {
      return `${ minutes } minutes ago`;
    } else if (isToday) {
      return getFormattedDate(date, 'Today'); // Today at 10:20
    } else if (isYesterday) {
      return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
      return getFormattedDate(date, false, true); // 10. January at 10:20
    }
  
    return getFormattedDate(date); // 10. January 2017. at 10:20
  }

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  
  function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let hoursToInt = parseInt(hours);
    let timeVar = "AM";

    if(hoursToInt > 12 && hoursToInt < 24) {
        hours = hoursToInt % 12;
        timeVar = "PM";
    }
    else if(hours === "24" || hours === "00") {
        hours = 12;
        timeVar = "PM";
    }
  
    if (minutes < 10) {
      // Adding leading zero to minutes
      minutes = `0${ minutes }`;
    }
  
    if (prefomattedDate) {
      // Today at 10:20
      // Yesterday at 10:20
      return `${ prefomattedDate } at ${ hours }:${ minutes } ${timeVar }`;
    }
  
    if (hideYear) {
      // 10. January at 10:20
      return `${ day } ${ month } at ${ hours }:${ minutes } ${timeVar }`;
    }
  
    // 10. January 2017. at 10:20
    return `${ day } ${ month } ${ year } at ${ hours }:${ minutes } ${timeVar }`;
  }
  
  
