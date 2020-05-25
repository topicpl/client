import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Video from 'twilio-video';
import VideoChat from './VideoChat';

const VideoComp = (props) => {
  const { category } = useParams();

  const [userName, setUserName] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [roomName, setRoomName] = useState(category);

  const connectRoom = (token) => {
    Video.connect(token, { name: roomName }).then((room) => {
      console.log('Connected to Room "%s"', room.name);

      room.participants.forEach(participantConnected);
      room.on('participantConnected', participantConnected);

      room.on('participantDisconnected', participantDisconnected);
      room.once('disconnected', (error) => room.participants.forEach(participantDisconnected));
    })
      .catch((error) => {
        console.log('errorcode: ', error.code);
        console.log('error: ', error);
      });
  };

  const participantConnected = (participant) => {
    console.log('participant: ', participant);
    console.log('Participant "%s" connected', participant.identity);

    const div = document.querySelector('[video-id=video-wrapper]');
    div.id = participant.sid;
    div.innerText = participant.identity;

    participant.on('trackSubscribed', (track) => trackSubscribed(div, track, participant.identity));
    participant.on('trackUnsubscribed', trackUnsubscribed);

    participant.tracks.forEach((publication) => {
      if (publication.isSubscribed) {
        trackSubscribed(div, publication.track, participant.identity);
      }
    });

    document.body.appendChild(div);
  };

  const participantDisconnected = (participant) => {
    console.log('Participant "%s" disconnected', participant.identity);
    console.log('participant.sid: ', participant);
    document.getElementById(participant.sid).remove();
  };

  const trackSubscribed = (div, track, identity) => {
    const videoEl = div.appendChild(track.attach());
    videoEl.setAttribute('testid', identity);
  };

  const trackUnsubscribed = (track) => {
    track.detach().forEach((element) => element.remove());
  };

  const connect = () => {
    axios.get(`http://localhost:3000/token/${userName}/${roomName}`)
      .then((res) => {
        console.log('token: ', res.data.token);
        return res.data.token;
      })
      .then(connectRoom);
  };
  return (
    <div>
      <div>
        <span>
          {userName}
          {' '}
        </span>
        <span>
          - room name:
          {category}
        </span>
      </div>
      <input onChange={(e) => setUserName(e.target.value)} />
      <button disabled={!(userName)} onClick={connect}>connect</button>
      <div video-id="video-wrapper" />
      <div>
        testid
        <VideoChat />
      </div>
    </div>
  );
};

export default VideoComp;
