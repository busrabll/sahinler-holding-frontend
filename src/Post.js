import React, { useState } from 'react'
import './Post.css'
import { Link } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';


function Post(props) {

  const { userName, userId, createDate, text } = props;

  const [liked, setLiked] = useState(false);

  const handleLike = () => {

    setLiked(!liked);
  }

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
              {userName} • {createDate}
            </h3>
          </div>
          <div className="post__HeaderDescription">
            <p>{text}</p>
          </div>
        </div>
        <div className="post__footer">
          {/*<ChatBubbleOutlineIcon fontSize="small" />
          <PublishIcon fontSize="small" />
          <RepeatIcon fontSize="small" />*/}
          <IconButton onClick={handleLike} aria-label='add to favorites'>
            <FavoriteIcon style={liked ? { color: "#a9000b"} : null} fontSize='small' />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Post