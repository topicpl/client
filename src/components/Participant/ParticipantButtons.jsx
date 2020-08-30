import React, { useState } from 'react';
import { IoMdWalk, IoIosRemoveCircleOutline, IoMdArrowForward, IoIosMicOff, IoIosMic, IoIosSend } from 'react-icons/io';
import styled from 'styled-components';
import { RiCameraLine, RiCameraOffLine } from 'react-icons/ri';
import { AiOutlineExclamation } from 'react-icons/ai';
import { GiSpeakerOff, GiSpeaker } from 'react-icons/gi';
import { event } from 'react-ga';
import Button from '../Button';
// import { emit } from '../../services/socketService';

const Buttons = styled.div`
  position: absolute;
  left: 50%;
  top: 93%;
  transform: translate(-50%,-50%);
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;
const logButtonEvent = (label) => event({ category: 'video-buttons', action: 'click', label });


const MyButtons = ({ handleLogout, nextRoomHandler, isConnecting }) => {
  const [isMyMicrophoneMuted, setIsMyMicrophoneMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const toggleMicrophone = () => {
    setIsMyMicrophoneMuted(!isMyMicrophoneMuted);
    logButtonEvent(isMyMicrophoneMuted ? 'microphone-on' : 'microphone-on');
  };

  return (
    <>
      <Button Icon={IoMdWalk} color="red" onClick={handleLogout} title="Leave" />
      <Button
        Icon={isMyMicrophoneMuted ? IoIosMicOff : IoIosMic}
        onClick={toggleMicrophone}
        title={isMyMicrophoneMuted ? 'Unmute' : 'Mute'}
      />
      <Button
        Icon={isVideoOn ? RiCameraOffLine : RiCameraLine}
        onClick={() => setIsVideoOn(!isVideoOn)}
        title={isVideoOn ? 'Hide camera' : 'Show camera'}
      />
      <Button onClick={nextRoomHandler} Icon={IoMdArrowForward} color="green" title="Next room" disabled={isConnecting} />
    </>
  );
};

const OtherParticipantButtons = ({ /* participant, */ isMicrophoneMuted, setMicrophoneMuted }) => {
  // const participantIdentity = participant.identity;
  const toggleMicrophone = () => {
    setMicrophoneMuted(!isMicrophoneMuted);
    logButtonEvent(isMicrophoneMuted ? 'other-participant-microphone-on' : 'other-participant-microphone-off');
  };

  // const startVoteKickHandler = () => {
  //   emit('startVoteKick', { participantIdentity });
  //   logButtonEvent('start-vote-kick');
  // };

  return (
    <>
      <Button
        Icon={isMicrophoneMuted ? GiSpeakerOff : GiSpeaker}
        onClick={toggleMicrophone}
        title={isMicrophoneMuted ? 'Mute' : 'Unmute'}
      />
      {/* <Button
        Icon={IoIosRemoveCircleOutline}
        onClick={startVoteKickHandler}
        title="Initialize vote to kick user"
      /> */}
      {/* <Button Icon={AiOutlineExclamation} title="Report user" onClick={() => logButtonEvent('report-user')} /> */}
      {/* <Button Icon={IoIosSend} title="Send private message" onClick={() => logButtonEvent('send-private-message')} /> */}
    </>
  );
};

const ParticipantButtons = ({ myself, handleLogout, participant, nextRoomHandler, isMicrophoneMuted, setMicrophoneMuted }) => (
  <Buttons>
    {myself ? <MyButtons handleLogout={handleLogout} nextRoomHandler={nextRoomHandler} /> : <OtherParticipantButtons participant={participant} isMicrophoneMuted={isMicrophoneMuted} setMicrophoneMuted={setMicrophoneMuted} />}
  </Buttons>
);

export default ParticipantButtons;
