import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Room from '../../components/Room';
import appConfig from '../../../appConfig';
import MyVideo from './MyVideo';
import { getQueryVariable } from '../../utils/helpers';


const VideoChat = (props) => {
  const history = useHistory();
  const { category } = useParams();
  const [roomParam, setRoomParam] = useState(null);

  useEffect(() => {
    setRoomParam(getQueryVariable('room'));
  }, []);


  const [roomName, setRoomName] = useState(null);
  const [token, setToken] = useState(null);
  const [isConnecting, setIsConnecting] = useState(null);

  const connect = () => {
    setIsConnecting(true);
    axios.post(`${appConfig.serverUrl}/getRoom`, { category, roomParam })
      .then((res) => {
        history.push({ search: `?room=${res.data.room.uniqueName}` });
        setRoomName(res.data.room.uniqueName);
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
  if (token && roomName) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Container>
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
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export default VideoChat;
