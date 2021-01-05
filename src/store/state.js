import { atom, selector } from 'recoil';
import { fetchPartyList } from '../api';
import Youtube from 'react-youtube';

export const sessionId = atom({
  key: 'sessionId',
  default: 'member',
});

export const partyRoomId = atom({
  key: 'partyRoomId',
  default: null,
});

export const videoList = atom({
  key: 'videoList',
  default: [],
});

export const message = atom({
  key: 'message',
  default: '',
});

export const messages = atom({
  key: 'messagees',
  default: [],
});

export const socketQueue = atom({
  key: 'socketQueue',
  default: [],
});

export const videoListThumbnail = selector({
  key: 'videoListThumbnail',
  get: ({ get }) => {
    const list = get(videoList);
    return list.map((val) => {
      return (
        <li key={val}>
          <Youtube
            videoId={val}
            opts={{
              height: '180',
              width: '240',
            }}
          />
        </li>
      );
    });
  },
});

export const currentVideo = selector({
  key: 'currentVideo',
  get: ({ get }) => {
    const list = get(videoList);
    const val = list[0];
    return (
      <Youtube
        videoId={val}
        opts={{
          height: '480',
          width: '720',
        }}
      />
    );
  },
});

export const partyList = selector({
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
