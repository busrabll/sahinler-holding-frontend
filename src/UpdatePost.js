import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import './Post.css'
import { Link } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material'
import "./TweetBox.css";
import { Button } from '@mui/material';
import axios from 'axios';

function UpdatePost(props) {

    const { postId } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userName, userId, datetime, refreshPosts} = props;
    const [text, setText] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {

        axios({
            method: 'post',
            url: '/api/posts',
            data: {
                userId: userId,
                text: text
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const sendTweet = e => {
        e.preventDefault();
        savePost();
        refreshPosts();
        setIsSent(true);
        setText("")
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };

    useEffect(() => {
        fetch("/api/posts/" + postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setLoading(true);
                    setPosts(result);
                },
                (error) => {
                    setLoading(true);
                    setError(error);
                }
            )
    }, [])

    return (
        <div>
            <div className="tweetBox">
                <form>
                    <div className="tweetBox__input">
                        <Link className="link" to={{ pathname: '/users/' + userId }}>
                            <Avatar aria-label='recipe'
                                sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
                                
                            </Avatar>
                        </Link>
                        <input required
                            onChange={(e) => handleText(e.target.value)}
                            value={text}
                            placeholder="What's Happening"
                            type="text" />
                    </div>
                    <Button onClick={sendTweet} type='submit' className="tweetBox__tweetButton"
                        sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>Send</Button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePost;