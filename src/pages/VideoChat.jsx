import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Room from './Room';

const VideoChat = () => {
  const { category } = useParams();
  const roomName = category;

  const [username, setUsername] = useState('');
  const [token, setToken] = useState(null);

  const connect = () => {
    axios.get(`http://localhost:3000/token/${username}/${roomName}`)
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
        <div style={{ marginBottom: '20px' }}>{`user name: ${username}`}</div>
        user Name:
        <input onChange={(e) => setUsername(e.target.value)} onKeyDown={(event) => (event.key === 'Enter' ? connect() : null)} />
        <button disabled={!username} onClick={connect}>Connect</button>
      </div>
    );
  }
  return render;
};

export default VideoChat;
