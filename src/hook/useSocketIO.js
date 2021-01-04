import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { io } from 'socket.io-client';
import { sessionId, partyRoomId } from '../store/state';

const url = 'https://www.utubeparty.com';
const socket = io(url, {
  reconnectionDelay: 10000,
  transports: ['websocket'],
}).connect();

export default function useSocketIO() {
  const roomId = useRecoilValue(partyRoomId);
  const setSessionId = useSetRecoilState(sessionId);

  useEffect(() => {
    if (!roomId) return;
    socket.on('sessionId', (data) => {
      setSessionId(data);
      socket.emit('join', 'main');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);
}
