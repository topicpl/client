import { useState } from 'react';
import { createReceiveTransport } from '../pages/TestPage/transportHelpers';
import * as mySignaling from '../pages/TestPage/my-signaling';

const sleep = (delayTime) => new Promise((resolve) => setTimeout(() => resolve(), delayTime));

const useReceiveRoomTransport = ({ peerId, rtpCapabilities, mountVideo }) => {
  const [recvTransport, setRecvTransport] = useState(null);

  const receiveTrack = async ({ peerIpToReceive }) => {
    if (!recvTransport) {
      const recvTransportData = await createReceiveTransport({ rtpCapabilities, peerId, peerIpToReceive });
      setRecvTransport(recvTransportData);
    }

    const consumerParameters = await mySignaling.receiveTrack({ peerId, mediaPeerId: peerId, mediaTag: 'cam-video', rtpCapabilities })
      .catch(console.error);

    const consumer = await recvTransport.consume({
      ...consumerParameters,
      appData: { peerId: peerIpToReceive, mediaTag: 'cam-video' },
    });
    while (recvTransport.connectionState !== 'connected') {
      // eslint-disable-next-line no-await-in-loop
      await sleep(100);
    }

    await mySignaling.resumeCustomer({ consumerId: consumer.id });

    mountVideo(consumer.track);
  };

  return { receiveTrack };
};
export default useReceiveRoomTransport;
