/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  IoMdWalk,
  IoIosRemoveCircleOutline,
  IoMdArrowForward,
  IoIosMicOff,
  IoIosMic,
  IoIosSend,
} from 'react-icons/io';
import styled from 'styled-components';
import { RiCameraLine, RiCameraOffLine } from 'react-icons/ri';
import {
  AiOutlineExclamation,
  AiOutlineCheck,
  AiOutlineClose,
} from 'react-icons/ai';
import { GiSpeakerOff, GiSpeaker } from 'react-icons/gi';
import Button from '../Button';
import { emit } from '../../services/socketService';

const Buttons = styled.div`
  position: absolute;
  left: 50%;
  top: 93%;
  transform: translate(-50%, -50%);
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;
const MyButtons = ({ handleLogout, nextRoomHandler, isConnecting }) => {
  const [isMyMicrophoneMuted, setIsMyMicrophoneMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  return (
    <>
      <Button
        Icon={IoMdWalk}
        color="red"
        onClick={handleLogout}
        title="Leave"
      />
      <Button
        Icon={isMyMicrophoneMuted ? IoIosMicOff : IoIosMic}
        onClick={() => setIsMyMicrophoneMuted(!isMyMicrophoneMuted)}
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

const OtherParticipantButtons = ({ participant }) => {
  // eslint-disable-next-line no-console
  console.log(participant.sid);
  const participantIdentity = participant.identity;
  const [isParticipantMuted, setIsParticipantMuted] = useState(true);
  return (
    <>
      <Button
        Icon={isParticipantMuted ? GiSpeaker : GiSpeakerOff}
        onClick={() => setIsParticipantMuted(!isParticipantMuted)}
        title={isParticipantMuted ? 'Mute' : 'Unmute'}
      />
      <Button
        Icon={IoIosRemoveCircleOutline}
        onClick={() => emit('startVoteKick', { participantIdentity })}
        title="Initialize vote to kick user"
      />
      <Button Icon={AiOutlineExclamation} title="Report user" />
      <Button Icon={IoIosSend} title="Send privet message" />
      {/*
      <Button
        Icon={AiOutlineCheck}
        onClick={() => emit('voteKick', { participantIdentity, value: true })}
        title={`kick${participantIdentity}`}
      />
      <Button
        Icon={AiOutlineClose}
        onClick={() => emit('voteKick', { participantIdentity, value: false })}
        title={`kick${participantIdentity}`}
      /> */}
    </>
  );
};

const ParticipantButtons = ({ myself, handleLogout, participant, nextRoomHandler }) => (
  <Buttons>
    {myself ? <MyButtons handleLogout={handleLogout} nextRoomHandler={nextRoomHandler} /> : <OtherParticipantButtons participant={participant} />}
  </Buttons>
);

export default ParticipantButtons;
