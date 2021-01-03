import React from 'react';
import { useParams } from 'react-router';

export default function PartyRoom() {
  const { name } = useParams();
  return <>{name}</>;
}
