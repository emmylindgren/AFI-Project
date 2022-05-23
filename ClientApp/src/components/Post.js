import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../config';
import LoadingCard from './LoadingCard';
import TimeAgo from './TimeAgo';
import './PostComment.css';
import { Link } from 'react-router-dom';

function Post({post, withComment = true}) {
    
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
        <div className='postCard'>
                <div className='profileInfoStyle'>
                    <img className='imgStyle' src={API_ADRESS + "/api/profile/image/"+ post.po_Owner.pr_Id} id="profile-image"/>
                    <div>
                        <h3 style={{marginBottom:'0',}}>{profile.pr_Firstname+ ' ' + profile.pr_Lastname}</h3>
                        <p className='gray-body-text' style={{marginBottom:'0',fontSize:'0.8rem',}}><TimeAgo dateParam ={post.po_Date}/></p>
                    </div>
                </div>
            <div className='commentWrapper'>
                <p>{post.po_Content}</p>
            </div>
            <div className='likeAndCommentWrapper'>
                <div className='likeAndCommentStyle' onClick ={() => {likePost()}}>
                    <img src= {liked ? '../icons/LikedIcon.svg' : '../icons/LikeIcon.svg'}/> 
                    <p className='clickable-text' style={{marginBottom:'0px'}}>Like</p>
                </div>
                {withComment ?
                <div className='likeAndCommentStyle'>
                  <Link to='../Comments' className='clickableComment' state={{postID:post.po_Id}}><span></span></Link>
                    <img src='../icons/CommentIcon.svg'/>
                    <p className='clickable-text' style={{marginBottom:'0px'}}>Comment</p>
                </div>
                : ""
                }
            </div>
        </div>
        )
        :(<div><LoadingCard/></div>)
        }
    </div>
  )
}

export default Post