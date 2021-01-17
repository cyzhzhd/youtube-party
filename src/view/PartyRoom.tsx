import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router';
import '../assets/css/PartyRoom.css';
import Videolist from '../component/partyRoom/VideoList';
import MainVideo from '../component/partyRoom/MainVideo';
import Chat from '../component/partyRoom/Chat';
import { useSetRecoilState } from 'recoil';
import { partyRoomId } from '../store/state';

export default function PartyRoom(): ReactElement {
  const { id, name } = useParams<{ id: string; name: string }>();
  const setId = useSetRecoilState(partyRoomId);

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  return (
    <div className="party-room">
      <div className="party-room-menu-bar">{name}</div>
      <MainVideo />
      <Chat />
      <Videolist />
    </div>
  );
}
