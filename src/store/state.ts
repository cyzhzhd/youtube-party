import { atom, selector } from 'recoil';
import { fetchPartyList } from '../api';
import { messagesType, QueueItem, Video } from '../types';

export const sessionId = atom<string>({
  key: 'sessionId',
  default: 'member',
});

export const partyRoomId = atom<string>({
  key: 'partyRoomId',
  default: '',
});

export const message = atom<string>({
  key: 'message',
  default: '',
});

export const messages = atom<messagesType[]>({
  key: 'messagees',
  default: [],
});

export const socketQueue = atom<Partial<QueueItem>[]>({
  key: 'socketQueue',
  default: [],
});

export const videoList = atom<Video[]>({
  key: 'videoList',
  default: [],
});

export const currentVideoId = atom<string>({
  key: 'currentVideoId',
  default: '',
});

export const currentVideo = selector<string>({
  key: 'currentVideo',
  get: ({ get }) => {
    const list = get(videoList);
    console.log(list);
    const id = get(currentVideoId);
    const curVideo = list.find((element: Video) => element.vid === id);
    if (curVideo) {
      return curVideo.vid;
    }

    return list[0] && list[0].vid;
  },
});

export const currentVideoTime = atom<number>({
  key: 'currentVideoTime',
  default: 0,
});

export const isTimeUpToDate = atom<boolean>({
  key: 'isTimeUpToDate',
  default: true,
});

export const partyList = selector<any>({
  key: 'partyList',
  get: async () => {
    try {
      const response = await fetchPartyList();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
});
