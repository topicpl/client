/* eslint-disable no-console */
import Cookies from 'universal-cookie';
// eslint-disable-next-line import/no-extraneous-dependencies
import io from 'socket.io-client';
import { isDev } from '../../appConfig';

const cookies = new Cookies();

let socket;
if (isDev) socket = io('http://localhost:3000');
else socket = io('http://139.59.137.236:3000');
let identity;
let roomSid;

export function rememberIdentity(sid, id) {
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
    identity,
    roomSid,
    socketToken: cookies.get('socketToken'),
    data,
  });
}
