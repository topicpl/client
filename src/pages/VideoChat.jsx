import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Room from '../components/Room';
import appConfig from '../../appConfig';

const VideoChat = () => {
  const { category } = useParams();
  const roomName = category;

  const [userName, setUsername] = useState('');
  const [token, setToken] = useState(null);

  const connect = () => {
    axios.get(`${appConfig.serverUrl}/token/${userName}/${roomName}`)
      .then((res) => {
        setToken(res.data.token);
      });
  };

  const handleLogout = () => setToken(null);


  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <div>
        <div>{`Category: ${roomName}`}</div>
        <div style={{ marginBottom: '20px' }}>{`user name: ${userName}`}</div>
        user Name:
        <input onChange={(e) => setUsername(e.target.value)} onKeyDown={(event) => (event.key === 'Enter' ? connect() : null)} />
        <button disabled={!userName} onClick={connect}>Connect</button>
      </div>
    );
  }
  return render;
};

export default VideoChat;
