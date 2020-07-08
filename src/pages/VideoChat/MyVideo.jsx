import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Spinner from '../../components/LoadingIcon';

const MyVideoContainer = styled.div`
  width: 80%;
  background: ${({ theme }) => theme.color.black}
  position: relative;
`;

const Video = styled.video`
    width: 100%;
`;

const LoadingIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    min-height: 50vh;
    align-items: center;
`;

const MyVideo = () => {
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
      <Video autoPlay id="my-video" />
    </MyVideoContainer>
  );
};

export default MyVideo;
