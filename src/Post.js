import React, { useEffect, useState } from 'react'
import './Post.css'
import { Link, useNavigate } from 'react-router-dom';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import { Avatar, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from 'axios';

function Post(props) {

  const { userName, userId, datetime, text, likes } = props;
  const [likeCount, setLikeCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(false);
  var [likeId, setLikeId] = useState(null);
  var [postId, setPostId] = useState(null);
  const navigate = useNavigate();
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

  const EditTweet = (postId) => {
    navigate("/posts/edit/" + postId)
  }

  const DeleteTweet = /*async*/() => {

    /*try {
      let result = await axios.delete(
        "/api/posts/" + postId
      );
      console.log(result.response.data)
    } catch (error) {
      console.error(error.response.data);
    }*/
    axios({
      method: 'delete',
      url: '/api/posts/'+postId,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error.response.data);
      });
  }

  const saveLike = () => {

    axios({
      method: 'post',
      url: '/api/likes',
      data: {
        userId: userId,
        postId: postId
      }
    })
      .then(function (response) {
        console.log(JSON.stringify(response));
      })
      .catch(function (error) {
        console.error(error.response.data);
      });

  };

  const deleteLike = () => {

    axios({
      method: 'delete',
      url: '/api/likes/'+likeId,
    })
      .then(function (response) {
        console.log(JSON.stringify(response));
      })
      .catch(function (error) {
        console.error(error.response.data);
      });

  };

  const handleLike = () => {

    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1)
    } else {
      deleteLike();
      setLikeCount(likeCount - 1)
    }
  }

  const handlePost = () => {
  }

  const checkLikes = () => {
    var likeControl = likes.find((like => like.userId === userId));
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  }

  useEffect(() => { checkLikes() }, [])

  return (
    <div className="post">
      <div className="post__avatar">
        <Link className="link" to={{ pathname: '/users/' + userId }}>
          <Avatar aria-label='recipe'
            sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
            {userName.charAt(0).toUpperCase()}
          </Avatar>
        </Link>
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {userName} • {formatDistanceToNowStrict(datetime)}
            </h3>
          </div>
          <div className="post__HeaderDescription">
            <p>{text}</p>
          </div>
        </div>
        <div className="post__footer">
          <IconButton onClick={() => { EditTweet(postId) }} aria-label='edit post'>
            <CreateIcon fontSize='small' />
          </IconButton>
          <IconButton onClick={() => { DeleteTweet(postId) }} aria-label='delete post'>
            <DeleteIcon fontSize='small' />
          </IconButton>
          <IconButton onClick={handleLike} aria-label='add to favorites'>
            <FavoriteIcon style={isLiked ? { color: "#a9000b" } : null} fontSize='small' />
            <div className='like_font'>
              {likeCount}
            </div>
          </IconButton>
          <IconButton onClick={handlePost} aria-label='save post'>
            <BookmarkBorderIcon fontSize='small' />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Post