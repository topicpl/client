import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
// import Participant from '../Participant';
import { getCreds } from '../../services/tokenService';

import useRoomJoin from '../../hooks/useRoomJoin';
import useReceiveTransport from '../../hooks/useReceiveTransport';
import useSyncParticipants from '../../hooks/useSyncParticipants';

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
const peerId = `${Math.random().toString()}-participant`;

const Room = ({ roomName, handleLogout, nextRoomHandler, isConnecting }) => {
  console.log('Room -> roomName', roomName);
  const userVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;


        stream.onremovetrack = () => console.warn('Stream ended');
      });
  });

  const mountVideo = (consumer) => {
    console.log('mountVideo -> consumer', consumer);
    const videoWrapper = document.querySelector('#participants');

    const videoEl = document.createElement(consumer.kind);
    videoEl.setAttribute('participant-id', consumer.id);
    videoEl.srcObject = new MediaStream([consumer.track]);
    // videoEl.setAttribute('controls', '');
    videoEl.setAttribute('playsinline', '');
    videoWrapper.appendChild(videoEl);
    videoEl.play()
      .catch((error) => console.warn('audioElem.play() failed:%o', error));
  };


  const { joinRoom, rtpCapabilities, isConnected } = useRoomJoin({ mountVideo, peerId, roomName });
  const { receiveTrack } = useReceiveTransport({ peerId, rtpCapabilities, mountVideo });
  const { syncInit, participantsIds } = useSyncParticipants({ peerId });

  const onJoinClick = async () => {
    await joinRoom();
    await syncInit();
  };

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
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
        <button onClick={onJoinClick} disabled={isConnected}>Join</button>
        <div>
          currentParticipant:
          <div>
            <h1 style={{ color: 'red', padding: '20px', fontSize: '30px', zIndex: 10 }}>
              <span>
                my participant id:
                <input style={{ padding: '10px', width: '400px' }} value={peerId} readOnly />
              </span>
            </h1>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Available participants:</span>
          {
            participantsIds && participantsIds.map((id) => (
              <div className={{ display: 'flex' }} key={id}>
                <span>{id}</span>
                <button disabled={id === peerId} onClick={() => receiveTrack(id)}>connect</button>
              </div>
            ))
          }
        </div>
        <div id="participants" />
      </div>
    </RoomContainer>
  );
};
export default Room;
