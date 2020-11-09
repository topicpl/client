import { useState } from 'react';
import { getParticipants } from '../services/participantsService';


const useSyncParticipants = () => {
  const [participantsIds, setParticipantsIds] = useState(null);

  const syncRequest = () => {
    setParticipantsIds(getParticipants());
  };

  const syncInit = () => {
    setInterval(syncRequest, 2000);
  };


  return { participantsIds, syncInit };
};

export default useSyncParticipants;
