import React, { useEffect, useState } from 'react';
import './Feed.css'
import TweetBox from './TweetBox';
import Post from './Post';

function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/posts")
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
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>

            <TweetBox />

            {posts.map(post => (
                <Post
                    userName={post.userName}
                    lastName={post.lastName}
                    text={post.text}
                />
            ))}
        </div>
    );
}

export default Feed;