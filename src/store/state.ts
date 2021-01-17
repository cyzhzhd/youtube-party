import { atom, selector } from 'recoil';
import { fetchPartyList } from '../api';

export const sessionId = atom<string>({
  key: 'sessionId',
  default: 'member',
});

export const partyRoomId = atom<string | null>({
  key: 'partyRoomId',
  default: null,
});

export const message = atom<string>({
  key: 'message',
  default: '',
});

interface messages {
  uid: string;
  content: string;
}
export const messages = atom<messages[]>({
  key: 'messagees',
  default: [],
});

export const socketQueue = atom<any>({
  key: 'socketQueue',
  default: [],
});

export const videoList = atom<any>({
  key: 'videoList',
  default: [],
});

export const currentVideoId = atom<string | null>({
  key: 'currentVideoId',
  default: null,
});

export const currentVideo = selector<string | null>({
  key: 'currentVideo',
  get: ({ get }) => {
    const list = get(videoList);
    console.log(list);
    const id = get(currentVideoId);
    const curVideo = list.find((element: any) => element.vid === id);
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
