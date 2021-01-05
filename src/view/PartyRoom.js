import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import '../assets/css/PartyRoom.css';
import Videolist from '../component/PartyRoom/VideoList';
import MainVideo from '../component/PartyRoom/MainVideo';
import Chat from '../component/PartyRoom/Chat';
import { useSetRecoilState } from 'recoil';
import { partyRoomId } from '../store/state';

export default function PartyRoom() {
  const { id, name } = useParams();
  const setId = useSetRecoilState(partyRoomId);

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  return (
    <div className='party-room'>
      <div className='party-room-menu-bar'>{name}</div>
      <MainVideo />
      <Chat />
      <Videolist />
    </div>
  );
}
