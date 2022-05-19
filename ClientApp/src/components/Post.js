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

        }
        else{
            axios.post(API_ADRESS + '/api/Post/like/'+ post.po_Id + '/' + parseInt(localStorage.getItem("profileId")))
            .catch(function (error){
                console.log(error);
            });
        }

    }

  return (
    <div>
        {loaded ? 
        (
        <div style={postCard}>
            <div style={profileInfoStyle}>
                <img style={imgStyle} src={API_ADRESS + "/api/profile/image/"+ post.po_Owner.pr_Id} id="profile-image"/>
                <h3>{profile.pr_Firstname+ ' ' + profile.pr_Lastname}</h3>
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
