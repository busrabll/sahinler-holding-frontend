import React, { useState } from 'react'
import './Post.css'
import { Link } from 'react-router-dom';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import { Avatar, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from 'axios';


function Post(props) {

  const { userName, userId, datetime, text } = props;

  const [liked, setLiked] = useState(false);

  const DeletePost = () => {
  }

  const deleteTweet = e => {
    e.preventDefault();
    DeletePost();
  }

  const handleLike = () => {

    setLiked(!liked);
  }

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
          <CreateIcon fontSize='small' />
          <IconButton onClick={deleteTweet} aria-label='delete post'>
            <DeleteIcon fontSize='small' />
          </IconButton>
          <IconButton onClick={handleLike} aria-label='add to favorites'>
            <FavoriteIcon style={liked ? { color: "#a9000b" } : null} fontSize='small' />
          </IconButton>
          <BookmarkBorderIcon fontSize='small' />
        </div>
      </div>
    </div>
  )
}

export default Post