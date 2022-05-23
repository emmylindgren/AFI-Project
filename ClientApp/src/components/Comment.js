import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../config';
import LoadingCard from './LoadingCard';
import TimeAgo from './TimeAgo';


function Comment({comment}) {
    
    const [profile,setProfile] = useState();
    const [loaded,setLoaded] = useState(false);
    const [liked, setLiked] = useState(false);

    useEffect(()=>{    
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
        };
        
        axios.get(API_ADRESS + '/api/profile/shortdetails/' + comment.co_Owner.pr_Id)
            .then(res => {
                setProfile(res.data);
                setLiked(comment.co_Likes.find((like) => {
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
            axios.delete(API_ADRESS + '/api/Comment/unlike/'+ comment.co_Id + '/' + parseInt(localStorage.getItem("profileId")))
            .catch(function (error){
                console.log(error);
            });
            setLiked(false);
        }
        else{
            axios.post(API_ADRESS + '/api/Comment/like/'+ comment.co_Id + '/' + parseInt(localStorage.getItem("profileId")))
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
                        <img className='imgStyle' src={API_ADRESS + "/api/profile/image/"+ comment.co_Owner.pr_Id} id="profile-image"/>
                        <div>
                            <h3 style={{marginBottom:'0',}}>{profile.pr_Firstname+ ' ' + profile.pr_Lastname}</h3>
                            <p className='gray-body-text' style={{marginBottom:'0',fontSize:'0.8rem',}}><TimeAgo dateParam ={comment.co_Date}/></p>
                        </div>
                    </div>
                <div className='commentWrapper'>
                    <p>{comment.co_Content}</p>
                </div>
                <div className='likeAndCommentWrapper'>
                    <div className='likeAndCommentStyle' onClick ={() => {likePost()}}>
                        <img src= {liked ? '../icons/LikedIcon.svg' : '../icons/LikeIcon.svg'}/> 
                        <p className='clickable-text' style={{marginBottom:'0px'}}>Like</p>
                    </div>
                </div>
            </div>
            )
            :(<div><LoadingCard/></div>)
            }
        </div>
      )
}

export default Comment