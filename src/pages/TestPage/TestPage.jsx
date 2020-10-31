import React, { useEffect, useState } from 'react';
import { Device } from 'mediasoup-client';
import * as mySignaling from './my-signaling';
import useRoomJoin from '../../hooks/useRoomJoin';

const peerId = `${Math.random().toString()}-participant`;
const sleep = (delayTime) => new Promise((resolve) => setTimeout(() => resolve(), delayTime));
const Test = () => {
  const [peerIpToReceive, setPeerIpToReceive] = useState('');
  const [receiveTransportOptions, setReceiveTransportOptions] = useState(null);


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


  const createReceiveTransport = async () => {
    const device = new Device();
    await device.load({ routerRtpCapabilities: rtpCapabilities });

    const { transportOptions } = await mySignaling.createTransport({ direction: 'recv', peerId });


    const recvTransport = device.createRecvTransport(transportOptions);

    recvTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      const { error } = await mySignaling.connectTransport({ transportId: transportOptions.id, dtlsParameters, peerId: peerIpToReceive });
      return error ? errback() : callback();
    });
    recvTransport.on('connectionstatechange', async (state) => {
      console.log(`transport ${recvTransport.id} connectionstatechange ${state}`);
      // for this simple sample code, assume that transports being
      // closed is an error (we never close these transports except when
      // we leave the room)
      if (state === 'closed' || state === 'failed' || state === 'disconnected') {
        console.log('transport closed ... leaving the room and resetting');
      }
    });

    return recvTransport;
  };

  const receiveTrack = async () => {
    const recvTransport = await createReceiveTransport();
    const consumerParameters = await mySignaling.receiveTrack({ peerId, mediaPeerId: peerId, mediaTag: 'cam-video', rtpCapabilities })
      .catch(console.error);
    console.log('receiveTrack -> consumerParameters', consumerParameters);

    const consumer = await recvTransport.consume({
      ...consumerParameters,
      appData: { peerId: peerIpToReceive, mediaTag: 'cam-video' },
    });
    while (recvTransport.connectionState !== 'connected') {
      console.log('  transport connstate', recvTransport.connectionState);
      await sleep(100);
    }

    await mySignaling.resumeCustomer({ consumerId: consumer.id });

    mountVideo(consumer.track);
  };

  useEffect(() => {

  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button onClick={joinRoom} disabled={isConnected}>Join</button>
      <div>
        currentParticipant:
        {' '}
        <div>
          <h1 style={{ color: 'red', padding: '20px', fontSize: '30px', zIndex: 10 }}>
            <span>
              my participant id:
              {' '}
              <input style={{ padding: '10px', width: '400px' }} value={peerId} readOnly />
            </span>
          </h1>
        </div>
      </div>
      <input onChange={(e) => setPeerIpToReceive(e.target.value)} />
      <button onClick={receiveTrack}>
        receive
      </button>
      <div style={{ color: 'green' }}>
        <span style={{ padding: '10px' }}>
          { peerIpToReceive }
        </span>
      </div>
      <div id="participants" />
      {/* <video width="320" height="240" autoPlay playsInline id="my-video" controls /> */}
    </div>
  );
};

export default Test;
