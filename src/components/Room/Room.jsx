import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Peer from 'simple-peer';
// import Participant from '../Participant';
import { getCreds } from '../../services/tokenService';
import { emit } from '../../services/socketService';

const { token } = getCreds();

const RoomContainer = styled.div`
  position: relative;
`;
const ParticipantsWrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  display: grid;
  grid-template-columns: ${({ totalParticipants }) => {
    if (totalParticipants > 2) return 'repeat(2, 1fr);';
    return '1fr;';
  }}
  grid-template-rows: ${({ totalParticipants }) => {
    if (totalParticipants === 1) return '1fr;';
    if (totalParticipants < 1) return 'repeat(2, 1fr);';
  }}
`;

const Room = ({ roomName, handleLogout, nextRoomHandler, isConnecting }) => {
  const userVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;

        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (signal) => {
          emit('signal', signal);
        });


        stream.onremovetrack = () => console.warn('Stream ended');
      });
  });

  // const totalParticipants = participants.length + 1;
  // const remoteParticipants = participants.map((participant) => <Participant key={participant.sid} participant={participant} totalParticipants={totalParticipants} />);

  return (
    <RoomContainer className="room">
      <video muted ref={userVideo} autoPlay playsInline />
      {/* <ParticipantsWrapper totalParticipants={totalParticipants}>
        {remoteParticipants}
        {room && (
          <Participant
            isConnecting={isConnecting}
            myself
            nextRoomHandler={nextRoomHandler}
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            totalParticipants={totalParticipants}
            handleLogout={handleLogout}
          />
        )}
      </ParticipantsWrapper> */}
    </RoomContainer>
  );
};
export default Room;
