import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../config';
import Post from '../components/Post';
import LoadingCard from '../components/LoadingCard';
import ErrorCard from '../components/ErrorCard';
import TextInput from '../components/form/TextInput';
import BackButton from '../components/BackButton';
import Comment from '../components/Comment';
import Button from '../components/Button';
import { useLocation } from 'react-router-dom';

function Comments() {
    const [post, setPost] = useState([]);
    const [postState, setPostState] = useState('loading');

    const [comments, setComments] = useState([]);
    const [commentState, setCommentState] = useState('loading');
    const location = useLocation();
    const { postID } = location.state;

    const [comment, setComment] = useState('');

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {

        async function fetchData() {
            axios.defaults.headers.common = {
                "ApiKey": localStorage.getItem("ApiKey"),
            };
            axios.get(API_ADRESS + '/api/Post/' + postID)
                .then(res => {
                    setPost(res.data)
                    setPostState('loaded')

                })
                .catch(err => {
                    setPostState('error')
                    console.log(err)
                })

            axios.get(API_ADRESS + '/api/Comment/fromPost/' + postID)
                .then(res => {
                    setComments(res.data)
                    setCommentState('loaded')
                    if (res.data.length < 1) {
                        setCommentState('nodata')
                    }

                })
                .catch(err => {
                    setCommentState('error')
                    console.log(err)
                })
        }
        fetchData()
    }, [])

    let renderComments = (comments) => {
        return comments.map(comment => {
            return <div key={comment.co_Id}><Comment comment={comment} /></div>
        })
    }
    const getCurrentPostState = () => {
        switch (postState) {
            case 'loading':
                return <LoadingCard />
            case 'loaded':
                return <div style={{ marginBottom: '2rem', }}><Post post={post} withComment={false} /></div>
            case 'error':
                return <ErrorCard
                    iconChoice={'filenotfound'}
                    infoText={"Oops, there was a problem when fetching your data! Try again later."}
                />
        }
    }

    const getCurrentCommentState = () => {
        switch (commentState) {
            case 'loading':
                return <LoadingCard />
            case 'loaded':
                return renderComments(comments)
            case 'nodata':
                return <ErrorCard
                    infoText={"No comments yet! Maybe add one?"}
                />
            case 'error':
                return <ErrorCard
                    iconChoice={'filenotfound'}
                    infoText={"Oops, there was a problem when fetching your data! Try again later."}
                />
        }
    }

    const submitComment = async () => {
        let form = new FormData();

        form.append('commentdata', JSON.stringify({
            Co_Content: comment,
        }));

        form.append('id', localStorage.getItem('profileId'))
        form.append('postId', postID)

        axios.post(API_ADRESS + '/api/comment', form)
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    setError('');
                    setSuccess('Successfully commented.');
                    setComment('');
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

    return (
        <div className='page-container' style={{ backgroundColor: 'var(--light-gray)', height: '100vh', }}>
            <div className='page-content'>
                <div style={{ marginBottom: '2rem', }}>
                    <BackButton text={"Your Neighbourhood"} to={'../Wall'} />
                </div>
                {getCurrentPostState()}
                <div style={writeCommentStyle}>
                    <div style={{ display: 'flex' }}>
                        <img
                            src={`${API_ADRESS}/api/profile/image/${localStorage.getItem('profileId')}`}
                            className='imgStyle'
                        />
                        <TextInput placeholder='Write a comment...' value={comment} onChange={setComment} />
                    </div>
                    <div style={{ width: '100px' }}>
                        <Button text="Post" onClick={submitComment} buttonColorChoice="green" iconChoice="post" />
                    </div>
                </div>
                <p className='err-text'>{error}</p>
                <p className='success-text'>{success}</p>
                <div>
                    <h1 style={{ color: 'var(--black)' }}>Comments</h1>
                    {getCurrentCommentState()}
                </div>
            </div>
        </div>
    )
}

const writeCommentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'var(--white)',
    height: '80px',
    padding: '10px',
    borderRadius: '10px'
}

export default Comments
