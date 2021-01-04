import React from 'react';
import { useParams } from 'react-router';
import AddVideo from '../component/PartyRoom/AddVideo';
import Videolist from '../component/PartyRoom/VideoList';

export default function PartyRoom() {
  const { name } = useParams();
  return (
    <>
      {name}
      <br />
      <AddVideo />
      <Videolist />
    </>
  );
}
