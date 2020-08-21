/* eslint-disable no-console */
import Cookies from "universal-cookie";
// eslint-disable-next-line import/no-extraneous-dependencies
import io from "socket.io-client";

const cookies = new Cookies();

const socket = io("http://localhost:3111");
let identity;
let roomSid;

export function rememberIdentity(sid, id) {
  identity = id;
  roomSid = sid;
}

socket.on("connect", () => {
  console.log("connected to socket");
});
socket.on("startedVoteKick", (data) => {
  console.log("started voteKick for " + data.participantIdentity);
});
socket.on("updateVoteKickStatus", (data) => {
  console.log(
    "agreed: " +
      data.agreed +
      "\nneeded agree votes: " +
      data.votesToKick +
      "\ndisagreed: " +
      data.disagreed
  );
});
socket.on("voteKickEnded", (data) => {
  console.log("Vote kick ended, success: " + data.success);
});

export function emit(event, data) {
  socket.emit(event, {
    identity,
    roomSid,
    socketToken: cookies.get("socketToken"),
    data,
  });
}
