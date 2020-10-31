import React from 'react';
import useRoomJoin from '../../hooks/useRoomJoin';
import useReceiveTransport from '../../hooks/useReceiveTransport';
import useSyncParticipants from '../../hooks/useSyncParticipants';

const peerId = `${Math.random().toString()}-participant`;

const Test = () => {
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
  const { receiveTrack } = useReceiveTransport({ peerId, rtpCapabilities, mountVideo });
  const { syncInit, participantsIds } = useSyncParticipants({ peerId });

  const onJoinClick = async () => {
    await joinRoom();
    await syncInit();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
  );
};

export default Test;
