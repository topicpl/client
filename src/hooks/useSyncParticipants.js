import { useState } from 'react';
import { syncParticipants } from '../pages/TestPage/my-signaling';


const useSyncParticipants = ({ peerId }) => {
  const [participantsIds, setParticipantsIds] = useState(null);

  const syncRequest = () => {
    syncParticipants({ peerId })
      .then((res) => {
        const ids = Object.keys(res.peers);
        setParticipantsIds(ids);
      })
      .catch(console.error);
  };

  const syncInit = () => {
    setInterval(syncRequest, 2000);
  };


  return { participantsIds, syncInit };
};

export default useSyncParticipants;
