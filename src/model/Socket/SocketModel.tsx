import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  sessionIdVar,
  socketQueueVar,
  messagesVar,
  videoListVar,
  videoTimeVar,
  isTimeUpToDateVar,
  videoIdVar,
  userDataVar,
} from '../../cache';
import { generateRandomId } from '../../helper/generateRandomId';
import { ChatMsg, PartyResponse, VideoInfo } from '../../types';

const url = process.env.REACT_APP_API_HOST as string;
const socket = io(url, {
  reconnectionDelay: 10000,
  transports: ['websocket'],
}).connect();

export default function initSocket(): void {
  // const uid = useReactiveVar(sessionIdVar);
  const videoId = useReactiveVar(videoIdVar);
  const queue = useReactiveVar(socketQueueVar);
  const msgs = useReactiveVar(messagesVar);
  const videoList = useReactiveVar(videoListVar);
  const videoTime = useReactiveVar(videoTimeVar);
  const isTimeUpToDate = useReactiveVar(isTimeUpToDateVar);
  const userData = useReactiveVar(userDataVar);

  /**
   * once user joined the website, get a session Id from server
   */
  useEffect(() => {
    socket.on('sessionId', (data: string) => {
      console.log('userData', userData);
      if (userData) {
        userDataVar({ ...userData, sessionId: data });
      } else {
        userDataVar({
          nickName: generateRandomId(),
          sessionId: data,
        });
      }
      sessionIdVar(data);
    });
  }, []);

  useEffect(() => {
    socket.on('deliverVideoTime', (data: VideoInfo) => {
      console.log('deliverVideoTime', data);
      if (data.videoId !== videoId) {
        videoIdVar(data.videoId);
      }
      videoTimeVar(data.time);
      isTimeUpToDateVar(false);
    });
  }, [videoId, isTimeUpToDate, videoTime]);

  useEffect(() => {
    socket.on('deliverVideoId', (data: { videoId: string }) => {
      console.log('deliverVideoId', data);
      videoIdVar(data.videoId);
    });
  });

  // when video is added in the list
  useEffect(() => {
    socket.once('deliverPartyDetail', (partyDetail: PartyResponse) => {
      console.log(partyDetail);
      if (!videoId) videoIdVar(partyDetail.videos[0]?.vid);
      videoListVar(partyDetail.videos);
    });
  }, [videoList]);

  /**
   * receiving chat message
   */
  useEffect(() => {
    socket.once('deliverChat', (data: ChatMsg) => {
      console.log(data);
      messagesVar([...msgs, { ...data }]);
    });
  }, [msgs]);

  // when there is a request for socket server
  useEffect(() => {
    if (queue.length < 1) return;

    const action = queue[0];
    console.log(queue);
    switch (action.type) {
      case 'joinPartyRoom':
        socket.emit('joinPartyRoom', {
          partyId: action.partyId,
        });
        break;
      case 'sendMsg':
        socket.emit('sendMsg', {
          uid: userData?.uid,
          nickName: userData?.nickName,
          content: action.content,
          partyId: action.partyId,
        });
        break;
      case 'updateVideoList':
        socket.emit('updateVideoList', {
          uid: userData?.uid,
          nickName: userData?.nickName,
          add: action.add,
          partyId: action.partyId,
          videoId: action.videoId,
        });
        break;
      case 'syncVideoTime':
        socket.emit('syncVideoTime', {
          uid: userData?.uid,
          nickName: userData?.nickName,
          partyId: action.partyId,
          videoId: action.videoId,
          time: action.time,
        });
        break;
      case 'syncVideoId':
        socket.emit('syncVideoId', {
          uid: userData?.uid,
          nickName: userData?.nickName,
          partyId: action.partyId,
          videoId: action.videoId,
        });
        break;
      default:
        console.log('default', action);
    }

    socketQueueVar(queue.slice(1));
  }, [queue]);
}
