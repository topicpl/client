import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { event } from 'react-ga';
import Room from '../../components/Room';
import appConfig from '../../../appConfig';
import MyVideo from './MyVideo';
import Layout from '../../app/Layout';
import { getCreds } from '../../services/tokenService';
import { emit, rememberIdentity } from '../../services/socketService';
import { getQueryVariable } from '../../utils/helpers';

// const cookies = new Cookies();

const VideoChat = () => {
  const history = useHistory();
  const { category } = useParams();
  const [roomParam, setRoomParam] = useState(null);
  const [roomID, setRoomID] = useState(null);
  const [isConnecting, setIsConnecting] = useState(null);

  useEffect(() => {
    const queryVal = getQueryVariable('room') || 'art--5bgsbe224ke3skz695';
    setRoomParam(queryVal);
    event({ category: 'link-room', action: 'load', label: queryVal });
  }, []);

  const nextRoomHandler = () => {
    setRoomID(null);
    setIsConnecting(true);
    event({ category: 'video-buttons', action: 'click', label: 'next-room' });
    return axios.post(`${appConfig.serverUrl}/api/findNextRoom`, { category, currentRoomSid: roomID })
      .then((res) => {
        handleLogout();
        const { room } = res.data;
        setRoomParam(room.uniqueName);
        history.push({ search: `?room=${room.uniqueName}` });
        setRoomID(room);
      //  setToken(res.data.token);
      })
      .catch(console.error)
      .finally(() => setIsConnecting(false));
  };

  const connect = () => {
    event({
      category: 'video-buttons',
      action: 'click',
      label: 'connect-click',
    });
    event({
      category: 'category-connection',
      action: 'click',
      label: category,
    });
    setRoomID(roomParam);
    // setIsConnecting(true);
    // const { id, token } = getCreds();
    // if (!token || !id) return setIsConnecting(false);
    // axios
    //   .post(`${appConfig.serverUrl}/api/connect`, { category, roomParam, token, id })
    //   .then((res) => {
    //     history.push({ search: `?room=${res.data.roomID}` });
    //     setRoomID(res.data.roomID);
    //   })
    //   .catch(() => {
    //     setIsConnecting(false);
    //     connect();
    //   })
    //   .finally(() => setIsConnecting(false));
  };

  const handleLogout = () => {
    history.push({ search: '' });
    // setToken(null);
  };

  let render;
  if (/* token */1 && roomID) {
    render = (
      <Room
        roomName={roomID}
        handleLogout={handleLogout}
        nextRoomHandler={nextRoomHandler}
        isConnecting={isConnecting}
      />
    );
  } else {
    render = (
      <Container>
        <MyVideo connect={connect} isConnecting={isConnecting} />
      </Container>
    );
  }
  return <Layout>{render}</Layout>;
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; */
`;

export default VideoChat;
