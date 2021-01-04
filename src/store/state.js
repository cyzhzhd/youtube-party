import { atom, selector } from 'recoil';
import { fetchPartyList } from '../api';

export const sessionId = atom({
  key: 'sessionId',
  default: 'member',
});

export const partyRoomId = atom({
  key: 'partyRoomId',
  default: null,
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
