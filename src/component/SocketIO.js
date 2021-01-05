import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { io } from 'socket.io-client';
import {
  sessionId,
  partyRoomId,
  socketQueue,
  messages,
  videoList,
  currentVideoTime,
  isTimeUpToDate,
} from '../store/state';

const url = 'https://www.utubeparty.com';
const socket = io(url, {
  reconnectionDelay: 10000,
  transports: ['websocket'],
}).connect();

export default function SocketIO() {
  const partyId = useRecoilValue(partyRoomId);
  const [uid, setUid] = useRecoilState(sessionId);
  const setList = useSetRecoilState(videoList);
  const setTime = useSetRecoilState(currentVideoTime);
  const [queue, setQueue] = useRecoilState(socketQueue);
  const [msgs, setMsgs] = useRecoilState(messages);
  const setIsUpToDate = useSetRecoilState(isTimeUpToDate);

  useEffect(() => {
    console.log('deliverVideoTime');
    socket.on('deliverVideoTime', (data) => {
      console.log('deliverVideoTime', data);
      setTime(data.time);
      setIsUpToDate(false);
    });
  }, [setIsUpToDate, setTime]);

  // once user joined the website
  useEffect(() => {
    socket.on('sessionId', (data) => {
      setUid(data);
    });
  }, [setUid]);

  // once user joined a partyroom
  useEffect(() => {
    if (!partyId) return;

    socket.emit('join', partyId);
  }, [partyId]);

  // when video is added in the list
  useEffect(() => {
    socket.on('deliverPartyDetail', (partyDetail) => {
      console.log(partyDetail);
      setList(partyDetail.videos);
    });
  }, [setList]);

  // when chatting
  useEffect(() => {
    socket.once('deliverChat', (data) => {
      console.log(data);
      setMsgs([...msgs, { uid, content: data.content }]);
    });
  }, [msgs, setMsgs, uid]);

  // when there is a request for socket server
  useEffect(() => {
    if (queue.length < 1) return;

    const action = queue[0];
    console.log(queue);
    switch (action.type) {
      case 'sendMsg':
        socket.emit('sendMsg', {
          uid,
          content: action.content,
          partyId,
        });
        break;
      case 'updateVideoList':
        socket.emit('updateVideoList', {
          uid,
          partyId,
          videoId: action.videoId,
        });
        break;
      case 'syncVideo':
        socket.emit('syncVideo', {
          uid,
          partyId,
          videoId: action.videoId,
          time: action.time,
        });
        break;
      default:
        console.log('default', action);
    }

    setQueue(queue.slice(1));
  }, [queue, partyId, setQueue, uid]);
}
