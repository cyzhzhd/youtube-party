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
  currentVideoId,
} from '../store/state';

const url = process.env.REACT_APP_API_HOST as string;
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
  const [curVideoId, setCurVideoId] = useRecoilState(currentVideoId);

  useEffect(() => {
    socket.on('deliverVideoTime', (data: any) => {
      console.log('deliverVideoTime', data);
      if (data.videoId !== curVideoId) {
        setCurVideoId(data.videoId);
      }
      setTime(data.time);
      setIsUpToDate(false);
    });
  }, [curVideoId, setCurVideoId, setIsUpToDate, setTime]);

  useEffect(() => {
    socket.on('deliverVideoId', (data: any) => {
      console.log('deliverVideoId', data);
      setCurVideoId(data.videoId);
    });
  });

  // once user joined the website
  useEffect(() => {
    socket.on('sessionId', (data: any) => {
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
    socket.on('deliverPartyDetail', (partyDetail: any) => {
      console.log(partyDetail);
      setList(partyDetail.videos);
    });
  }, [setList]);

  // when chatting
  useEffect(() => {
    socket.once('deliverChat', (data: any) => {
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
          add: action.add,
          partyId,
          videoId: action.videoId,
        });
        break;
      case 'syncVideoTime':
        socket.emit('syncVideoTime', {
          uid,
          partyId,
          videoId: action.videoId,
          time: action.time,
        });
        break;
      case 'syncVideoId':
        socket.emit('syncVideoId', {
          uid,
          partyId,
          videoId: action.videoId,
        });
        break;
      default:
        console.log('default', action);
    }

    setQueue(queue.slice(1));
  }, [queue, partyId, setQueue, uid]);
}
