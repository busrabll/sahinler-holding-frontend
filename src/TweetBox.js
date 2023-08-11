import React, { useState} from 'react';
import "./TweetBox.css";
import { Avatar, Button } from '@mui/material';

function TweetBox() {

  const [tweetMessage, setTweetMessage] = useState("");

  const sendTweet = e => {
    e.preventDefault();
  }

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="images/user.png"></Avatar>
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's Happening?"
            type="text">
          </input>
        </div>
        <Button onClick={sendTweet} type="submit" className="tweetBox__tweetButton">Send</Button>
      </form>
    </div>
  )
}

export default TweetBox;