import React, { useState, useEffect } from 'react';
import { useParams, Link as Hyperlink } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Room from '../../components/Room';
import appConfig from '../../../appConfig';
import Button from '../../components/Button';
import MyVideo from './MyVideo';

const VideoChat = () => {
  const { category } = useParams();

  const [roomName, setRoomName] = useState(null);
  const [token, setToken] = useState(null);
  const [isConnecting, setIsConnecting] = useState(null);

  const connect = () => {
    setIsConnecting(true);
    axios.get(`${appConfig.serverUrl}/getRoom/${category}`)
      .then((res) => {
        setRoomName(res.data.room.uniqueName);
        setToken(res.data.token);
      })
      .catch(console.error)
      .finally(() => setIsConnecting(false));
  };


  const handleLogout = () => setToken(null);


  let render;
  if (token && roomName) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Container>
        <Button>
          <Hyperlink to="/">Back to Categories</Hyperlink>
        </Button>
        <Heading>{`Category: ${category}`}</Heading>
        <MyVideo connect={connect} isConnecting={isConnecting} />
      </Container>
    );
  }
  return render;
};

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Heading = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.medium}
`;

export default VideoChat;
