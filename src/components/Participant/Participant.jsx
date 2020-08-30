import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ParticipantButtons from './ParticipantButtons';
import appConfig from '../../../appConfig';

let videoTrackGlobal;
let audioTrackGlobal;
const ParticipantContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  grid-column: ${({ totalParticipants, myself }) => (totalParticipants === 3 || totalParticipants === 5)
    && myself
    && '1 /span 2;'};
`;

const VideoFrame = styled.video`
  width: 100%;
  height: 100%;
  transform: scale(1.011);
  object-fit: cover;
  max-height: ${({ totalParticipants }) => {
    if (totalParticipants >= 2 && totalParticipants <= 4) return `calc(99vh / ${2});`;
    if (totalParticipants === 2) return `calc(99vh / ${2});`;
    if (totalParticipants >= 5) return `calc(99vh / ${3});`;
    return '99vh';
  }};
`;

const Participant = ({
  participant,
  totalParticipants,
  myself,
  handleLogout,
  nextRoomHandler,
  isConnecting,
}) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [isMicrophoneMuted, setMicrophoneMuted] = useState(false);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) => Array.from(trackMap.values())
    .map((publication) => publication.track)
    .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === 'video') {
        setVideoTracks((videoTrackList) => [...videoTrackList, track]);
      } else if (track.kind === 'audio') {
        setAudioTracks((audioTrackList) => [...audioTrackList, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === 'video') {
        setVideoTracks((videoTrackList) => videoTrackList.filter((v) => v !== track));
      } else if (track.kind === 'audio') {
        setAudioTracks((audioTrackList) => audioTrackList.filter((a) => a !== track));
      }
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    videoTrackGlobal = videoTrack;
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      window.onunload = () => videoTrack.detach();
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    audioTrackGlobal = audioTrack;
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      window.onunload = () => audioTrack.detach();
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  const nextRoom = () => {
    nextRoomHandler()
      .then(() => {
        if (videoTrackGlobal && videoTrackGlobal.detach) videoTrackGlobal.detach();
        if (audioTrackGlobal && audioTrackGlobal.detach) audioTrackGlobal.detach();
      })
      .catch(console.error);
  };

  return (
    <ParticipantContainer
      className="participant"
      totalParticipants={totalParticipants}
      myself={myself}
    >
      <ParticipantButtons
        handleLogout={handleLogout}
        myself={myself}
        participant={participant}
        nextRoomHandler={nextRoom}
        isConnecting={isConnecting}
        setMicrophoneMuted={setMicrophoneMuted}
        isMicrophoneMuted={isMicrophoneMuted}
      />
      <VideoFrame ref={videoRef} autoPlay totalParticipants={totalParticipants} />
      <audio ref={audioRef} autoPlay muted={myself || isMicrophoneMuted} />
    </ParticipantContainer>
  );
};

export default Participant;
