import React, { useState } from 'react';
import { IoMdWalk, IoIosRemoveCircleOutline, IoMdArrowForward, IoIosMicOff, IoIosMic, IoIosSend } from 'react-icons/io';
import styled from 'styled-components';
import { RiCameraLine, RiCameraOffLine } from 'react-icons/ri';
import { AiOutlineExclamation } from 'react-icons/ai';
import { GiSpeakerOff, GiSpeaker } from 'react-icons/gi';
import Button from '../Button';

const Buttons = styled.div`
  position: absolute;
  top: 200px;
  left: 200px;
  z-index: 1;
`;
const MyButtons = ({ handleLogout }) => {
  const [isMyMicrophoneMuted, setIsMyMicrophoneMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  return (
    <>
      <Button Icon={IoMdWalk} color="red" onClick={handleLogout} title="Leave" />
      <Button Icon={IoMdArrowForward} color="green" title="Next room" />
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
