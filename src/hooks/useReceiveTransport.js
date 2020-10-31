import { createReceiveTransport } from '../pages/TestPage/transportHelpers';
import * as mySignaling from '../pages/TestPage/my-signaling';

const sleep = (delayTime) => new Promise((resolve) => setTimeout(() => resolve(), delayTime));

const useReceiveRoomTransport = ({ peerId, rtpCapabilities, mountVideo, peerIpToReceive }) => {
  const receiveTrack = async () => {
    const recvTransport = await createReceiveTransport({ rtpCapabilities, peerId, peerIpToReceive });
    const consumerParameters = await mySignaling.receiveTrack({ peerId, mediaPeerId: peerId, mediaTag: 'cam-video', rtpCapabilities })
      .catch(console.error);
    console.log('receiveTrack -> consumerParameters', consumerParameters);

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
