import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  socketQueueVar,
  messagesVar,
  videoListVar,
  currentVideoTimeVar,
  isTimeUpToDateVar,
  currentVideoIdVar,
  userVar,
} from '../../cache';
import { generateRandomId } from '../../helper/generateRandomId';
import { ChatMsg, PartyResponse, VideoInfo } from '../../types';

const SERVER_URL = process.env.REACT_APP_API_HOST as string;
const socket = io(SERVER_URL, {
  reconnectionDelay: 10000,
  transports: ['websocket'],
}).connect();

export default function initSocket(): void {
  const currentVideoId = useReactiveVar(currentVideoIdVar);
  const queue = useReactiveVar(socketQueueVar);
  const msgs = useReactiveVar(messagesVar);
  const videoList = useReactiveVar(videoListVar);
  const currentVideoTime = useReactiveVar(currentVideoTimeVar);
  const isTimeUpToDate = useReactiveVar(isTimeUpToDateVar);
  const user = useReactiveVar(userVar);

  useEffect(() => {
    socket.once('sessionId', (sessionId: string) => {
      initUser();

      function initUser() {
        user ? userVar({ ...user, sessionId }) : createAnonymouseUser();
      }
      function createAnonymouseUser() {
        userVar({
          nickName: generateRandomId(),
          sessionId,
        });
      }
    });
  }, []);

  useEffect(() => {
    socket.once('deliverVideoTime', ({ videoId: deliveredVideoId, time }: VideoInfo) => {
      synchronizeVideo();

      function synchronizeVideo() {
        if (deliveredVideoId !== currentVideoId) {
          currentVideoIdVar(deliveredVideoId);
        }
        currentVideoTimeVar(time);
        isTimeUpToDateVar(false);
      }
    });
  }, [currentVideoId, isTimeUpToDate, currentVideoTime]);

  useEffect(() => {
    socket.once('deliverVideoId', ({ videoId }: { videoId: string }) => {
      synchronizeVideoId();

      function synchronizeVideoId() {
        currentVideoIdVar(videoId);
      }
    });
  });

  useEffect(() => {
    socket.once('deliverPartyDetail', ({ videos }: PartyResponse) => {
      synchronizeVideoList();

      function synchronizeVideoList() {
        if (!currentVideoId) currentVideoIdVar(videos[0]?.vid);
        videoListVar(videos);
      }
    });
  }, [videoList]);

  useEffect(() => {
    socket.once('deliverChat', (data: ChatMsg) => {
      addReceivingMessageOnMessages();

      function addReceivingMessageOnMessages() {
        messagesVar([...msgs, { ...data }]);
      }
    });
  }, [msgs]);

  useEffect(() => {
    if (queue.length > 1) {
      emitFirstActionInQueue();
      socketQueueVar(queue.slice(1));
    }

    function emitFirstActionInQueue() {
      const action = queue[0];
      switch (action.type) {
        case 'joinPartyRoom':
          socket.emit(action.type, {
            partyId: action.partyId,
          });
          break;
        case 'sendMsg':
          socket.emit(action.type, {
            uid: user?.uid,
            nickName: user?.nickName,
            content: action.content,
            partyId: action.partyId,
          });
          break;
        case 'updateVideoList':
          socket.emit(action.type, {
            uid: user?.uid,
            nickName: user?.nickName,
            add: action.add,
            partyId: action.partyId,
            videoId: action.videoId,
          });
          break;
        case 'syncVideoTime':
          socket.emit(action.type, {
            uid: user?.uid,
            nickName: user?.nickName,
            partyId: action.partyId,
            videoId: action.videoId,
            time: action.time,
          });
          break;
        case 'syncVideoId':
          socket.emit(action.type, {
            uid: user?.uid,
            nickName: user?.nickName,
            partyId: action.partyId,
            videoId: action.videoId,
          });
          break;
      }
    }
  }, [queue]);
}
