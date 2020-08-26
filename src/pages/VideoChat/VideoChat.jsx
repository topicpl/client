/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import Room from '../../components/Room';
import appConfig from '../../../appConfig';
import MyVideo from './MyVideo';
import Layout from '../../app/Layout';
import { emit, rememberIdentity } from '../../services/socketService';
import { getQueryVariable } from '../../utils/helpers';

const cookies = new Cookies();

const VideoChat = () => {
  const history = useHistory();
  const { category } = useParams();
  const [roomParam, setRoomParam] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [token, setToken] = useState(null);
  const [isConnecting, setIsConnecting] = useState(null);


  useEffect(() => {
    setRoomParam(getQueryVariable('room'));
  }, []);

  const nextRoomHandler = () => {
    setRoomData(null);
    setIsConnecting(true);
    axios.post(`${appConfig.serverUrl}/findNextRoom`, { category, currentRoomSid: roomData.sid })
      .then((res) => {
        const { room } = res.data;
        setRoomParam(room.uniqueName);
        history.push({ search: `?room=${room.uniqueName}` });
        setRoomData(room);
        setToken(res.data.token);
      })
      .catch(console.error)
      .finally(() => setIsConnecting(false));
  };

  const connect = () => {
    setIsConnecting(true);
    axios.post(`${appConfig.serverUrl}/getRoom`, { category, roomParam })
      .then((res) => {
        cookies.set('socketToken', res.data.socketToken, { path: '/' });
        rememberIdentity(res.data.room.sid, res.data.identity);
        const roomSid = res.data.room.sid;
        const { identity } = res.data;
        emit('registerSocket', { roomSid, identity });
        history.push({ search: `?room=${res.data.room.uniqueName}` });
        setRoomData(res.data.room);
        setToken(res.data.token);
      })
      .catch(console.error)
      .finally(() => setIsConnecting(false));
  };

  const handleLogout = () => {
    history.push({ search: '' });
    setToken(null);
  };

  let render;
  if (token && roomData && roomData.uniqueName) {
    render = (
      <Room roomName={roomData.uniqueName} token={token} handleLogout={handleLogout} nextRoomHandler={nextRoomHandler} isConnecting={isConnecting} />
    );
  } else {
    render = (
      <Container>
        <Heading>{`Category: ${category}`}</Heading>
        <MyVideo connect={connect} isConnecting={isConnecting} />
      </Container>
    );
  }
  return <Layout>{render}</Layout>;
};

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Heading = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export default VideoChat;
