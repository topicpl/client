import React, { useState } from 'react';
import { useParams, Link as Hyperlink } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import Room from '../components/Room';
import appConfig from '../../appConfig';
import Button from '../components/Button';
import * as socket from '../services/socketService';

const cookies = new Cookies();

const VideoChat = () => {
  const { category } = useParams();

  const [roomName, setRoomName] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(null);


  const connect = () => {
    setIsLoading(true);
    axios.get(`${appConfig.serverUrl}/getRoom/${category}`)
      .then((res) => {
        cookies.set('socketToken', res.data.socketToken, {path: '/'});
        socket.rememberIdentity(res.data.identity, res.data.room.sid);
        setRoomName(res.data.room.uniqueName);
        setToken(res.data.token);
        socket.emit('startVoteKick', {user: "testUser"});
      })
      .catch(console.error)
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
      <Container>
        <Button>
          <Hyperlink to="/">Back to Categories</Hyperlink>
        </Button>
        <Heading>{`Category: ${category}`}</Heading>
        <Button variant="success" disabled={isLoading} isLoading={isLoading} onClick={connect}>Connect</Button>
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
