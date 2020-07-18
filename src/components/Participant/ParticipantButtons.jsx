import React, { useState } from 'react';
import { IoMdWalk, IoIosRemoveCircleOutline, IoMdArrowForward, IoIosMicOff, IoIosMic } from 'react-icons/io';
import styled from 'styled-components';
import Button from '../Button';

const Buttons = styled.div`
  position: absolute;
  top: 200px;
  left: 200px;
  z-index: 1;
`;
const ParticipantButtons = ({ myself, handleLogout }) => {
  const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
  return (
    <Buttons>
      {myself
        ? (
          <>
            <Button Icon={IoMdWalk} color="red" onClick={handleLogout} title="Exit the room" />
            <Button Icon={IoMdArrowForward} color="green" onClick={handleLogout} title="Search next room" />
            <Button
              Icon={isMicrophoneMuted ? IoIosMicOff : IoIosMic}
              onClick={() => setIsMicrophoneMuted(!isMicrophoneMuted)}
              title={isMicrophoneMuted ? 'Unmute microphone' : 'Mute microphone'}
            />
          </>
        ) : (
          <>
            <Button Icon={IoIosRemoveCircleOutline} color="red" onClick={handleLogout} title="Initialize vote to kick user" />
          </>
        )}
    </Buttons>
  );
};

export default ParticipantButtons;
