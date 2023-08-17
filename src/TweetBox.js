import React, { useState } from 'react';
import "./TweetBox.css";
import { Link } from 'react-router-dom';
import { Avatar, Button, IconButton, styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));*/

export default function TweetBox(props) {

  const { userId, userName, refreshPosts} = props;
  const [text, setText] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [open, setOpen] = React.useState(false);

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

  /*fetch("/api/posts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        text: "text",
        userId: 1
      }),
    })

    .then((res) => res.json())
    .catch((err) => console.log("error"))*/

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

  return (
    <div>
      <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <div className="tweetBox">
        <form>
          <div className="tweetBox__input">
            <Link className="link" to={{ pathname: '/users/' + userId }}>
              <Avatar aria-label='recipe'>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>

            <input
              onChange={(e) => handleText(e.target.value)}
              value={text}
              placeholder="What's Happening"
              type="text" />

          </div>
          <Button onClick={sendTweet} type='submit' className="tweetBox__tweetButton">Send</Button>
        </form>
      </div>
    </div>

  )
}
