import React, { useState } from 'react';
import useRoomJoin from '../../hooks/useRoomJoin';
import useReceiveTransport from '../../hooks/useReceiveTransport';

const peerId = `${Math.random().toString()}-participant`;

const Test = () => {
  const [peerIpToReceive, setPeerIpToReceive] = useState('');


  const mountVideo = (track) => {
    const videoWrapper = document.querySelector('#participants');

    const videoEl = document.createElement('video');
    videoEl.srcObject = new MediaStream([track.clone()]);
    videoEl.setAttribute('controls', '');
    videoEl.setAttribute('playsinline', '');
    videoWrapper.appendChild(videoEl);
    videoEl.play()
      .catch((error) => console.warn('audioElem.play() failed:%o', error));
  };


  const { joinRoom, rtpCapabilities, isConnected } = useRoomJoin({ mountVideo, peerId });
  const { receiveTrack } = useReceiveTransport({ peerId, rtpCapabilities, mountVideo, peerIpToReceive });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button onClick={joinRoom} disabled={isConnected}>Join</button>
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
      <input onChange={(e) => setPeerIpToReceive(e.target.value)} />
      <button onClick={() => receiveTrack()}>receive</button>
      <div id="participants" />
    </div>
  );
};

export default Test;
