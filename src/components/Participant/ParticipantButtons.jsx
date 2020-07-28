import React, { useState } from 'react';
import { IoMdWalk, IoIosRemoveCircleOutline, IoMdArrowForward, IoIosMicOff, IoIosMic, IoIosSend } from 'react-icons/io';
import styled from 'styled-components';
import { RiCameraLine, RiCameraOffLine } from 'react-icons/ri';
import { AiOutlineExclamation } from 'react-icons/ai';
import { GiSpeakerOff, GiSpeaker } from 'react-icons/gi';
import Button from '../Button';

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
const MyButtons = ({ handleLogout }) => {
  const [isMyMicrophoneMuted, setIsMyMicrophoneMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  return (
    <>
      <Button Icon={IoMdWalk} color="red" onClick={handleLogout} title="Leave" />
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
      <Button Icon={IoMdArrowForward} color="green" title="Next room" />
    </>
  );
};

const OtherParticipantButtons = () => {
  const [isParticipantMuted, setIsParticipantMuted] = useState(true);
  return (
    <>
      <Button
        Icon={isParticipantMuted ? GiSpeaker : GiSpeakerOff}
        onClick={() => setIsParticipantMuted(!isParticipantMuted)}
        title={isParticipantMuted ? 'Mute' : 'Unmute'}
      />
      <Button Icon={IoIosRemoveCircleOutline} title="Initialize vote to kick user" />
      <Button Icon={AiOutlineExclamation} title="Report user" />
      <Button Icon={IoIosSend} title="Send privet message" />
    </>
  );
};

const ParticipantButtons = ({ myself, handleLogout }) => (
  <Buttons>
    {myself ? <MyButtons handleLogout={handleLogout} /> : <OtherParticipantButtons />}
  </Buttons>
);

export default ParticipantButtons;
