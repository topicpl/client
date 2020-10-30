import React, { useEffect, useState } from 'react';
import { Device } from 'mediasoup-client';
import * as mySignaling from './my-signaling';

const peerId = `${Math.random().toString()}-participant`;

const Test = () => {
  const [rtpCapabilities, setRtpCapabilities] = useState(null);
  const [peerIpToReceive, setPeerIpToReceive] = useState('');
  const [isInRoom, setIsInRoom] = useState(false);


  const main = async () => {
    setIsInRoom(true);
    const device = new Device();

    // Communicate with our server app to retrieve router RTP capabilities.
    const { routerRtpCapabilities } = await mySignaling.getRouterRtpCapabilities({ peerId });
    setRtpCapabilities(routerRtpCapabilities);
    // Load the device with the router RTP capabilities.
    await device.load({ routerRtpCapabilities });
    device.observer.on('newtransport', (transport) => {
      console.log('new transport created [id:%s]', transport.id);
    });
    // Check whether we can produce video to the router.
    if (!device.canProduce('video')) {
      console.warn('cannot produce video');
      // Abort next steps.
    }

    // Create a transport in the server for sending our media through it.
    const { transportOptions } = await mySignaling.createTransport({ direction: 'send', peerId });

    // Create the local representation of our server-side transport.
    const sendTransport = device.createSendTransport(transportOptions);
    // Set transport "connect" event handler.
    sendTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      // Here we must communicate our local parameters to our remote transport.
      mySignaling.connectTransport({ transportId: sendTransport.id, dtlsParameters })
        .then(callback)// Done in the server, tell our transport.
        .catch(errback); // Something was wrong in server side.
    });

    // Set transport "produce" event handler.
    sendTransport.on('produce', ({ kind, rtpParameters, appData }, callback, errback) => {
      mySignaling.sendTrack({ peerId, transportId: sendTransport.id, kind, rtpParameters, appData })
        .then(callback)
        .catch(errback);
    });

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const webcamTrack = stream.getVideoTracks()[0];
    const webcamProducer = await sendTransport.produce({ track: webcamTrack, appData: { mediaTag: 'cam-video' } });
  };

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

    const consumer = await recvTransport.consume({
      ...consumerParameters,
      appData: { peerId: peerIpToReceive, mediaTag: 'cam-video' },
    });

    await mySignaling.resumeCustomer({ consumerId: consumer.id });

    const videoEl = document.querySelector('#my-video');
    videoEl.srcObject = new MediaStream([consumer.track.clone()]);

    videoEl.play()
      .catch((error) => console.warn('audioElem.play() failed:%o', error));
  };

  useEffect(() => {

  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button onClick={main} disabled={isInRoom}>Join</button>
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
      <video width="320" height="240" autoPlay playsInline id="my-video" controls />
    </div>
  );
};

export default Test;
