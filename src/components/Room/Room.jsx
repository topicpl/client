import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import styled from 'styled-components';
import Participant from '../Participant';

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

const Room = ({ roomName, token, handleLogout, nextRoomHandler, isConnecting }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);


  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) => prevParticipants.filter((p) => p !== participant));
    };

    Video.connect(token, { name: roomName })
      .then((roomData) => {
        setRoom(roomData);
        roomData.on('participantConnected', participantConnected);
        roomData.on('participantDisconnected', participantDisconnected);
        roomData.participants.forEach(participantConnected);
      });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach((trackPublication) => {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        }
        return currentRoom;
      });
    };
  }, [roomName, token]);

  const totalParticipants = participants.length + 1;
  const remoteParticipants = participants.map((participant) => <Participant key={participant.sid} participant={participant} totalParticipants={totalParticipants} />);

  return (
    <RoomContainer className="room">
      <ParticipantsWrapper totalParticipants={totalParticipants}>
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
      </ParticipantsWrapper>
    </RoomContainer>
  );
};

export default Room;
