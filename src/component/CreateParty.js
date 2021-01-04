import React from 'react';
import useInput from '../hook/useInput';
import { createParty } from '../api/index.js';
import plusImage from '../assets/images/plus.png';

export default function CreateParty() {
  const [partyName, setPartyName, partyNameInput] = useInput({ type: 'text' });
  const [partyDesc, setPartyDesc, partyDescInput] = useInput({ type: 'text' });

  async function createRoom(props) {
    const options = {
      name: partyName,
      description: partyDesc,
      hostId: props.sessionId,
    };
    const newParty = await createParty(options);
    console.log(newParty);
    setPartyName('');
    setPartyDesc('');
  }
  return (
    <div className='partyList-party create-room'>
      <img src={plusImage} alt='create' onClick={createRoom} />
      <p>방 이름과 소개 메세지를 입력해주세요.</p>
      <div>
        <div>이름: {partyNameInput}</div>
        <div>소개: {partyDescInput}</div>
      </div>
    </div>
  );
}
