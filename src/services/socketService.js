/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import io from 'socket.io-client';
import appConfig from '../../appConfig';

let socket;
if (appConfig.isDev) socket = io('http://localhost:3000');
else
  socket = io('https://thetopic.pl', { path: '/api/socket.io', secure: true });
let identity;
let roomSid;
let socketToken;

export function rememberIdentity(token, sid, id) {
  socketToken = token;
  identity = id;
  roomSid = sid;
}
socket.on('startedVoteKick', (data) => {
  console.log(`started voteKick for ${data.participantIdentity}`);
});
socket.on('updateVoteKickStatus', (data) => {
  console.log(
    `agreed: ${data.agreed}\nneeded agree votes: ${data.votesToKick}\ndisagreed: ${data.disagreed}`
  );
});
socket.on('voteKickEnded', (data) => {
  console.log(`Vote kick ended, success: ${data.success}`);
});
socket.on('authenticationFailed', () => {
  emit('registerSocket', { roomSid, identity });
});

export function emit(event, data) {
  socket.emit(event, {
    identity,
    roomSid,
    socketToken,
    data,
  });
}
