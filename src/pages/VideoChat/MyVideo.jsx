// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
// import { FiLink } from 'react-icons/fi';
// import { IoMdReverseCamera } from 'react-icons/io';
// import { GoSettings } from 'react-icons/go';
import { RiUserSearchLine } from 'react-icons/ri';
import Spinner from '../../components/LoadingIcon';
import Button from '../../components/Button';
import RegularButton from '../../components/Button/oldButton';

const MyVideoContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.black};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Video = styled.video`
  height: 100%;
  /* MIRRORING */
  transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
`;

const CenteredElement = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  min-height: 82vmin;
  align-items: center;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  margin-bottom: 10px;
`;

const Buttons = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -50%);
  z-index: 1;

  /* display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px; */
`;

const MyVideo = ({ isConnecting, connect }) => {
  const [isVideoLoading, setIsVideoLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const videoRef = useRef();

  useEffect(() => {
    getDevices();
    return stopStream;
  }, []);
  // You have denied access to your devices. Your partners will not be able to see and hear you.
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

    setErrorMessage(null);
    setIsVideoLoading(true);
    navigator.mediaDevices
      .getUserMedia(defaultSettings)
      .then((stream) => {
        videoRef.current.srcObject = stream;
        stream.onremovetrack = () => console.warn('Stream ended');
      })
      .catch((err) => {
        console.error(err);
        if (err.name === 'NotFoundError') setErrorMessage('Camera not found');
        else setErrorMessage(err.message);
      })
      .finally(() => setIsVideoLoading(false));
  };
  return (
    <MyVideoContainer>
      {(isVideoLoading || errorMessage) && (
        <CenteredElement>
          {isVideoLoading && <Spinner />}
          {errorMessage && !isVideoLoading && (
            <ErrorContainer>
              <ErrorMessage>{errorMessage}</ErrorMessage>
              <RegularButton onClick={getDevices}>Try Again</RegularButton>
            </ErrorContainer>
          )}
        </CenteredElement>
      )}
      <Video
        ref={videoRef}
        style={{ display: !isVideoLoading ? 'block' : 'none' }}
        autoPlay
        muted
      />
      {!errorMessage && !isVideoLoading && (
        <>
          <Buttons>
            {/* <Button Icon={FiLink} color="blur" /> */}
            {/* <Button Icon={GoSettings} color="blur" /> */}
            {/* <Button Icon={IoMdReverseCamera} color="blur" /> */}
            <Button
              onClick={connect}
              isLoading={isConnecting}
              Icon={RiUserSearchLine}
              color="green"
            />
          </Buttons>
        </>
      )}
    </MyVideoContainer>
  );
};

export default MyVideo;
