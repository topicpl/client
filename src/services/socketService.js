/* eslint-disable no-console */
import Cookies from 'universal-cookie';
// eslint-disable-next-line import/no-extraneous-dependencies
import io from 'socket.io-client';

const cookies = new Cookies();

const socket = io('http://localhost:3111');
let identity;
let roomSid;

export function rememberIdentity(sid, id) {
  console.log("\nremember identity\nidentity: "+id+"\nsid: "+sid+"\n");
  identity = id;
  roomSid = sid;
}

socket.on('connect', () => {
  console.log('connected to socket');
});
socket.on('message', (data) => {
  console.log(data);
});

export function emit(event, data) {
  socket.emit(event, {
    identity: identity,
    roomSid: roomSid,
    socketToken: cookies.get('socketToken'),
    data: data,
  });
}