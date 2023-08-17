import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';

function Post(props) {

  const { userName, userId, text, postId} = props;

  return (
    <div className="post">
      <div className="post__avatar">
        <Link className="link" to={{ pathname: '/users/' + userId }}>
          <Avatar aria-label='recipe'>
            {userName.charAt(0).toUpperCase()}
          </Avatar>
        </Link>
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {userName}
            </h3>
          </div>
          <div className="post__HeaderDescription">
            <p>{text}</p>
          </div>
        </div>
        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
          <PublishIcon fontSize="small" />
        </div>
      </div>
    </div>
  )
}

export default Post