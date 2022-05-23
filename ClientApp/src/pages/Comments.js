import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../config';
import Post from '../components/Post';
import LoadingCard from '../components/LoadingCard';
import ErrorCard from '../components/ErrorCard';
import BackButtonGreen from '../components/BackButtonGreen';
import BackButton from '../components/BackButton';
import Comment from '../components/Comment';
import { useLocation } from 'react-router-dom';

function Comments() {
    const [post, setPost] = useState([]);
    const [postState, setPostState] = useState('loading');

    const [comments, setComments] = useState([]);
    const [commentState, setCommentState] = useState('loading');
    const location = useLocation();
    const {postID} = location.state;

    useEffect(async ()=>{
        axios.defaults.headers.common = {
            "ApiKey": localStorage.getItem("ApiKey"),
            };
        axios.get(API_ADRESS + '/api/Post/'+postID)
        .then(res =>{
            setPost(res.data)
            setPostState('loaded')
           
        })
        .catch(err =>{
            setPostState('error')
            console.log(err)
        })
        
        axios.get(API_ADRESS + '/api/Comment/fromPost/'+postID)
        .then(res =>{
            setComments(res.data)
            setCommentState('loaded')
           
        })
        .catch(err =>{
            setCommentState('error')
            console.log(err)
        })

    },[])

    let renderComments = (comments) =>{
        return comments.map(comment => {
            return <div key={comment.co_Id}><Comment comment={comment}/></div>
        })
    }
    const getCurrentPostState = () => {
        switch(postState){
            case 'loading':
                return <LoadingCard/>
            case 'loaded':
                return <div style ={{marginBottom:'2rem',}}><Post post={post} withComment={false}/></div>
            case 'error':
                return <ErrorCard
                iconChoice={'filenotfound'} 
                infoText={"Oops, there was a problem when fetching your data! Try again later."}
                    />
        }
    }

    const getCurrentCommentState = () => {
        switch(commentState){
            case 'loading':
                return <LoadingCard/>
            case 'loaded':
                return renderComments(comments)
            case 'error':
                return <ErrorCard
                iconChoice={'filenotfound'} 
                infoText={"Oops, there was a problem when fetching your data! Try again later."}
                    />
        }
    }

  return (
    <div className='page-container' style={{backgroundColor:'var(--light-gray)',height: '100vh',}}>
          <div className='page-content'>
              <div style={{marginBottom:'2rem',}}>
                <BackButton text={"Your Neighbourhood"} to={'../Wall'}/>
              </div>
                {getCurrentPostState()}
                <div style={{backgroundColor:'var(--white)'}}><p>Här ska man kunna adda en comment hihih</p></div>
              <div>
                <h1 style={{color:'var(--black)'}}>Comments</h1>
                {getCurrentCommentState()}
              </div>
          </div>
    </div>
  )
}

export default Comments
