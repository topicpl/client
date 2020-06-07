import React, { useState } from 'react';
import { useParams, Link as Hyperlink } from 'react-router-dom';
import axios from 'axios';
import Room from '../components/Room';
import appConfig from '../../appConfig';
import Button from '../components/Button';

const VideoChat = () => {
  const { category } = useParams();

  const [roomName, setRoomName] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(null);


  const connect = () => {
    setIsLoading(true);
    axios.get(`${appConfig.serverUrl}/getRoom/${category}`)
      .then((res) => {
        setRoomName(res.data.room.uniqueName);
        setToken(res.data.token);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLogout = () => setToken(null);


  let render;
  if (token && roomName) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <div>
        <Button>
          <Hyperlink to="/">Categories</Hyperlink>
        </Button>
        <div>{`Category: ${category}`}</div>
        <Button variant="success" disabled={isLoading} onClick={connect}>Connect</Button>
      </div>
    );
  }
  return render;
};

export default VideoChat;
