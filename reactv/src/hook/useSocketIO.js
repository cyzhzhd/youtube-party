import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const url = 'https://www.utubeparty.com';

export default function useSocketIO() {
  console.log('useSocketIO');
  const [sessionId, setSessionId] = useState('');
  const [partyRoom, setPartyRoom] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [socketUpdateFlag, setSocketUpdateFlag] = useState(true);

  useEffect(() => {
    const socket = io(url, {
      reconnectionDelay: 10000,
      transports: ['websocket'],
    }).connect();

    socket.on('sessionId', (data) => {
      setSessionId(data);

      socket.emit('join', 'main');
    });

    socket.on('party-list-updated', () => {
      setSocketUpdateFlag(!socketUpdateFlag);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    sessionId,
    partyRoom,
    setPartyRoom,
    friendList,
    setFriendList,
    socketUpdateFlag,
  };
}
