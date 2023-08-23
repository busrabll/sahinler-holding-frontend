import React, { useEffect, useState } from 'react';
import './Feed.css'
import TweetBox from './TweetBox';
import Post from './Post';

function Feed({createDate}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    /*const dateOptions = {timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric'};
    const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
    const dateAsFormattedString = dateFormatter.format(new Date(createDate));*/


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