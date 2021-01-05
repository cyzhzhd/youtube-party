import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { io } from 'socket.io-client';
import { sessionId, partyRoomId, socketQueue, messages } from '../store/state';

const url = 'https://www.utubeparty.com';
const socket = io(url, {
  reconnectionDelay: 10000,
  transports: ['websocket'],
}).connect();

export default function useSocketIO() {
  const roomId = useRecoilValue(partyRoomId);
  const setUid = useSetRecoilState(sessionId);
  const [queue, setQueue] = useRecoilState(socketQueue);
  const [msgs, setMsgs] = useRecoilState(messages);

  useEffect(() => {
    socket.on('sessionId', (data) => {
      setUid(data);
    });
  }, [setUid]);

  useEffect(() => {
    socket.on('deliverChat', (data) => {
      console.log(data);
      setMsgs([...msgs, { uid: data.uid, content: data.content }]);
    });
  }, [msgs, setMsgs]);

  useEffect(() => {
    if (queue.length < 1) return;

    const action = queue[0];
    switch (action.type) {
      case 'sendMsg':
        socket.emit('sendMsg', {
          uid: action.uid,
          content: action.content,
          roomId,
        });
        break;
      default:
        console.log('default', action);
    }

    setQueue(queue.slice(1));
  }, [queue, roomId, setQueue]);

  useEffect(() => {
    if (!roomId) return;

    socket.emit('join', roomId);
  }, [roomId]);
}
