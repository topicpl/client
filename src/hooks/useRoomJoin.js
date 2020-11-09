import { useState } from 'react';
import axios from 'axios';
import { Device } from 'mediasoup-client';
import appConfig from '../../appConfig';
import { getCreds } from '../services/tokenService';
import * as mySignaling from '../pages/TestPage/my-signaling';

const useRoomJoin = ({ peerID, roomID }) => {
  const device = new Device();
  const [rtpCapabilities, setRtpCapabilities] = useState(null);

  const joinRoom = async () => {

    // Communicate with our server app to retrieve router RTP capabilities.
      const { routerRtpCapabilities } = await mySignaling.getRouterRtpCapabilities();
      setRtpCapabilities(routerRtpCapabilities);
      // Load the device with the router RTP capabilities.
      await device.load({ routerRtpCapabilities });
      device.observer.on('newtransport', (transport) => {
        console.warn('new transport created [id:%s]', transport.id);
      });
      // Check whether we can produce video to the router.
      if (!device.canProduce('video')) {
        console.warn('cannot produce video');
      // Abort next steps.
      }

      // Create a transport in the server for sending our media through it.
      const { transportOptions } = await mySignaling.createTransport({ direction: 'send', peerID, roomID });

      // Create the local representation of our server-side transport.
      const sendTransport = device.createSendTransport(transportOptions);
      // Set transport "connect" event handler.
      sendTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      // Here we must communicate our local parameters to our remote transport.
        mySignaling.connectTransport({ peerID, transportId: sendTransport.id, dtlsParameters })
          .then(callback)// Done in the server, tell our transport.
          .catch(errback); // Something was wrong in server side.
      });

      // Set transport "produce" event handler.
      sendTransport.on('produce', ({ kind, rtpParameters, appData }, callback, errback) => {
        mySignaling.sendTrack({ peerID, transportId: sendTransport.id, kind, rtpParameters, appData })
          .then(callback)
          .catch(errback);
      });

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const webcamTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];

      await sendTransport.produce({ track: webcamTrack, appData: { mediaTag: 'cam-video' } });
      await sendTransport.produce({ track: audioTrack, appData: { mediaTag: 'cam-audio' } });
  };

  return { joinRoom, rtpCapabilities };
};


export default useRoomJoin;
