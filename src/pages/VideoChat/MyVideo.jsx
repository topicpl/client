import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Spinner from '../../components/LoadingIcon';
import Button from '../../components/Button';

const MyVideoContainer = styled.div`
  width: 80%;
  background: ${({ theme }) => theme.color.black};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Video = styled.video`
  width: 100%;
  margin-bottom: 10px;
  `;

  const LoadingIconWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  min-height: 82vmin;
  align-items: center;
`;

const MyVideo = ({ isConnecting, connect }) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    getDevices();
  }, []);

  const getDevices = () => {
    const defaultSettings = {
      audio: true,
      video: true,
    };

    navigator.mediaDevices.getUserMedia(defaultSettings)
      .then((stream) => {
        const video = document.querySelector('#my-video');
        video.srcObject = stream;
        setIsVideoLoading(false);
        stream.onremovetrack = () => console.warn('Stream ended');
      })
      .catch(console.error);
  };
  return (
    <MyVideoContainer>
      {isVideoLoading && (
        <LoadingIconWrapper>
          <Spinner />
        </LoadingIconWrapper>
      )}
      <Video style={{ display: !isVideoLoading ? 'block' : 'none' }} autoPlay id="my-video" />
      <Button variant="success" disabled={isConnecting} isLoading={isConnecting} onClick={connect}>Connect</Button>
    </MyVideoContainer>
  );
};

export default MyVideo;
