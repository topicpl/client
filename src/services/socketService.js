import Cookies from 'universal-cookie';
import io from 'socket.io-client';

const cookies = new Cookies();

const socket = io('http://localhost:3111');
var identity;
var roomSid;

export function rememberIdentity(id, sid)
{
  identity = id;
  roomSid = sid;
}

socket.on('connect', socket => {
  console.log('connected to socket');
});
socket.on('message', data => {
  console.log(data);
});

export function emit(event, data){ 
  socket.emit(event, {
      identity,
      roomSid,
      socketToken: cookies.get('socketToken'),
      data
  });
};
