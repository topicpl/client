import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaUserInjured, FaLink } from 'react-icons/fa';
import { IoMdReverseCamera } from 'react-icons/io';
import { GoSettings } from 'react-icons/go';
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

const Buttons = styled.div`
  position: absolute;
  top: 200px;
  left: 200px;
`;

const MyVideo = ({ isConnecting, connect }) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef();

  useEffect(() => {
    getDevices();
    return stopStream;
  }, []);

  const stopStream = () => {
    const [audio, video] = videoRef.current.srcObject.getTracks();
    audio.stop();
    video.stop();
  };

  const getDevices = () => {
    const defaultSettings = {
      audio: true,
      video: true,
    };

    navigator.mediaDevices
      .getUserMedia(defaultSettings)
      .then((stream) => {
        videoRef.current.srcObject = stream;
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
      <Video ref={videoRef} style={{ display: !isVideoLoading ? 'block' : 'none' }} autoPlay />
      <Buttons>
        <Button Icon={FaLink} color="blur" />
        <Button Icon={GoSettings} color="blur" />
        <Button Icon={IoMdReverseCamera} color="blur" />
        <Button
          onClick={connect}
          isLoading={isConnecting}
          Icon={FaUserInjured}
          color="green"
        />
      </Buttons>
    </MyVideoContainer>
  );
};

export default MyVideo;
