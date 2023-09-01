import React, { useEffect, useState } from 'react';
import './Feed.css'
import TweetBox from './TweetBox';
import Post from './Post';

function Feed({ createDate }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refreshPosts = () => {

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
    }

    useEffect(() => {
        refreshPosts();
    }, [posts])

    if (error) {
        return <div>Error</div>;
    } else if (!loading) {
        return <div>Loading...</div>;
    } else {

        return (
            <div className="feed">
                <div className="feed__header">
                    <h2>Home</h2>
                </div>

                <TweetBox userId={6} userName={"korhan"} refreshPosts={refreshPosts} />

                {posts.map(post => (
                    <Post
                        likes={post.postLikes}
                        postId={post.postId}
                        userId={post.userId}
                        datetime={new Date("2023-08-22")}
                        userName={post.userName}
                        text={post.text}

                    />
                ))}
            </div>

        );
    }
}

export default Feed;