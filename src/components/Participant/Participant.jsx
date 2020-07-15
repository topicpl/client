import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoMdWalk } from 'react-icons/io';
import Button from '../Button';

const ParticipantContainer = styled.div`
  position: relative;
  grid-column: ${({ totalParticipants, myself }) => ((totalParticipants === 3 || totalParticipants === 5) && myself) && '1 /span 2;'}
`;

const VideoFrame = styled.video`
  width: 100%;
  max-height: ${({ totalParticipants }) => {
    if (totalParticipants >= 2 && totalParticipants <= 4) return `calc(99vh / ${2});`;
    if (totalParticipants === 2) return `calc(99vh / ${2});`;
    if (totalParticipants >= 5) return `calc(99vh / ${3});`;
    return '99vh';
  }}
`;

const Buttons = styled.div`
  position: absolute;
  top: 200px;
  left: 200px;
  z-index: 1;
`;

const Participant = ({ participant, totalParticipants, myself, handleLogout }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

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
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <ParticipantContainer className="participant" totalParticipants={totalParticipants} myself={myself}>
      <Buttons>
        {myself && <Button Icon={IoMdWalk} color="red" onClick={handleLogout} />}
      </Buttons>
      {/* <h3>{participant.identity}</h3> */}
      <VideoFrame ref={videoRef} autoPlay totalParticipants={totalParticipants} />
      <audio ref={audioRef} autoPlay muted />
    </ParticipantContainer>
  );
};

export default Participant;
