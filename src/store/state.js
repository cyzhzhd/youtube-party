import { atom, selector } from 'recoil';
import { fetchPartyList, fetchYoutubeThumnail } from '../api';

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

export const videoListThumbnail = selector({
  key: 'videoListThumbnail',
  get: async ({ get }) => {
    const list = get(videoList);
    return list.map((val) => {
      return (
        <li key={val}>
          <img src={fetchYoutubeThumnail(val)} alt='error' />
        </li>
      );
    });
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
