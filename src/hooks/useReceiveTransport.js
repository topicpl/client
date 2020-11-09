import { useState } from 'react';
import { createReceiveTransport } from '../pages/TestPage/transportHelpers';
import * as mySignaling from '../pages/TestPage/my-signaling';

const sleep = (delayTime) => new Promise((resolve) => setTimeout(() => resolve(), delayTime));

const useReceiveRoomTransport = ({ peerID, rtpCapabilities, mountVideo }) => {
  const [recvTransport, setRecvTransport] = useState(null);

  const receiveTrack = async (peerIDToReceive) => {
    if (!recvTransport) {
      const recvTransportData = await createReceiveTransport({ rtpCapabilities, peerID, peerIpToReceive: peerIDToReceive });
      setRecvTransport(recvTransportData);
    }
    const consumerParameters = await mySignaling.receiveTrack({ peerID, mediapeerID: peerID, mediaTag: 'cam-video', rtpCapabilities })
      .catch(console.error);
    const consumer = await recvTransport.consume({ ...consumerParameters, appData: { peerID: peerIDToReceive, mediaTag: 'cam-video' } });


    const consumerParametersAudio = await mySignaling.receiveTrack({ peerID, mediapeerID: peerID, mediaTag: 'cam-audio', rtpCapabilities })
      .catch(console.error);

    const consumerAudio = await recvTransport.consume({ ...consumerParametersAudio, appData: { peerID: peerIDToReceive, mediaTag: 'cam-audio' } });
    while (recvTransport.connectionState !== 'connected') {
      // eslint-disable-next-line no-await-in-loop
      await sleep(100);
    }

    await mySignaling.resumeCustomer({ consumerId: consumerAudio.id });
    await mySignaling.resumeCustomer({ consumerId: consumer.id });

    mountVideo(consumer);
    mountVideo(consumerAudio);
  };

  return { receiveTrack };
};
export default useReceiveRoomTransport;
