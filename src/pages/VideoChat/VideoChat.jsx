/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import ReactGA, { event } from 'react-ga';
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
    const queryVal = getQueryVariable('room');
    setRoomParam(queryVal);
    event({ category: 'link-room', action: 'load', label: queryVal });
  }, []);

  const nextRoomHandler = () => {
    setRoomData(null);
    setIsConnecting(true);
    event({ category: 'video-buttons', action: 'click', label: 'next-room' });
    axios.post(`${appConfig.serverUrl}/api/findNextRoom`, { category, currentRoomSid: roomData.sid })
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
    event({ category: 'video-buttons', action: 'click', label: 'connect-click' });
    event({ category: 'category-connection', action: 'click', label: category });
    setIsConnecting(true);
    axios.post(`${appConfig.serverUrl}/api/getRoom`, { category, roomParam })
      .then((res) => {
        cookies.set('socketToken', res.data.socketToken, { path: '/' });
        rememberIdentity(res.data.room.sid, res.data.identity);
        const roomSid = res.data.room.sid;
        const { identity } = res.data;
        emit('registerSocket', { roomSid, identity });
        history.push({ search: `?room=${res.data.room.uniqueName}` });
        setRoomData(res.data.room);
        setToken(res.data.token);
        console.log(res.data.room);
      })
      .catch(() => {
        setIsConnecting(false);
        connect();
      })
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
