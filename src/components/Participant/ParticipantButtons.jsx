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
const ParticipantButtons = ({ myself, handleLogout }) => {
  const [isMyMicrophoneMuted, setIsMyMicrophoneMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isParticipantMuted, setIsParticipantMuted] = useState(true);
  return (
    <Buttons>
      {myself
        ? (
          <>
            <Button Icon={IoMdWalk} color="red" onClick={handleLogout} title="Exit the room" />
            <Button Icon={IoMdArrowForward} color="green" title="Search next room" />
            <Button
              Icon={isMyMicrophoneMuted ? IoIosMicOff : IoIosMic}
              onClick={() => setIsMyMicrophoneMuted(!isMyMicrophoneMuted)}
              title={isMyMicrophoneMuted ? 'Unmute microphone' : 'Mute microphone'}
            />
            <Button
              Icon={isVideoOn ? RiCameraOffLine : RiCameraLine}
              onClick={() => setIsVideoOn(!isVideoOn)}
              title={isVideoOn ? 'Hide camera' : 'Show camera'}
            />
          </>
        ) : (
          <>
            <Button
              Icon={isParticipantMuted ? GiSpeaker : GiSpeakerOff}
              onClick={() => setIsParticipantMuted(!isParticipantMuted)}
              title={isParticipantMuted ? 'Mute this user' : 'Unmute this user'}
            />
            <Button Icon={IoIosRemoveCircleOutline} onClick={handleLogout} title="Initialize vote to kick user" />
            <Button Icon={AiOutlineExclamation} title="Report user" />
            <Button Icon={IoIosSend} title="Send privet message" />
          </>
        )}
    </Buttons>
  );
};

export default ParticipantButtons;
