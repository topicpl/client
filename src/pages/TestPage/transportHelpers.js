
import { Device } from 'mediasoup-client';
import * as mySignaling from './my-signaling';

export const createReceiveTransport = async ({ rtpCapabilities, peerID }) => {
  const device = new Device();
  await device.load({ routerRtpCapabilities: rtpCapabilities });

  const { transportOptions } = await mySignaling.createTransport({ direction: 'recv', peerID });


  const recvTransport = device.createRecvTransport(transportOptions);

  recvTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
    const { error } = await mySignaling.connectTransport({ transportId: transportOptions.id, dtlsParameters, peerID });
    return error ? errback() : callback();
  });
  recvTransport.on('connectionstatechange', async (state) => {
    // eslint-disable-next-line no-console
    console.log(`transport ${recvTransport.id} connectionstatechange ${state}`);
    // for this simple sample code, assume that transports being
    // closed is an error (we never close these transports except when
    // we leave the room)
    if (state === 'closed' || state === 'failed' || state === 'disconnected') {
      // eslint-disable-next-line no-console
      console.log('transport closed ... leaving the room and resetting');
    }
  });

  return recvTransport;
};
