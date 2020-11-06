import { useState } from 'react';
import { createReceiveTransport } from '../pages/TestPage/transportHelpers';
import * as mySignaling from '../pages/TestPage/my-signaling';

const sleep = (delayTime) => new Promise((resolve) => setTimeout(() => resolve(), delayTime));

const useReceiveRoomTransport = ({ peerId, rtpCapabilities, mountVideo }) => {
  const [recvTransport, setRecvTransport] = useState(null);

  const receiveTrack = async (peerIdToReceive) => {
    if (!recvTransport) {
      const recvTransportData = await createReceiveTransport({ rtpCapabilities, peerId, peerIpToReceive: peerIdToReceive });
      setRecvTransport(recvTransportData);
    }

    const consumerParameters = await mySignaling.receiveTrack({ peerId, mediaPeerId: peerId, mediaTag: 'cam-video', rtpCapabilities })
      .catch(console.error);
    const consumer = await recvTransport.consume({ ...consumerParameters, appData: { peerId: peerIdToReceive, mediaTag: 'cam-video' } });


    const consumerParametersAudio = await mySignaling.receiveTrack({ peerId, mediaPeerId: peerId, mediaTag: 'cam-audio', rtpCapabilities })
      .catch(console.error);

    const consumerAudio = await recvTransport.consume({ ...consumerParametersAudio, appData: { peerId: peerIdToReceive, mediaTag: 'cam-audio' } });
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