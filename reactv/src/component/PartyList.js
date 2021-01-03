import React, { useEffect, useState } from 'react';
import '../assets/css/PartyList.css';
import { fetchPartyList, createParty } from '../api/index.js';
// image는 항상 이렇게 임포트 해야하는지? vue에서는 src="../assets/plus.png"로 했음.
import plusImage from '../assets/images/plus.png';
import coverImage from '../assets/images/cover.png';
import useInput from '../hook/useInput';

function DisplayPartyList(props) {
  const partyList = [];

  props.partyList.forEach((val) => {
    partyList.push(
      <div key={val.id} className='partyList-party'>
        <div className='partyList-cover-image'>
          <img alt='coverImage' src={coverImage} />
        </div>
        <div className='partyList-details-wrapper'>
          <div className='partyList-detail'>
            <div>{val.name}</div>
            <div>{val.host}</div>
            <div>{val.numMembers}</div>
          </div>
          <div className='partyList-intro'>{val.intro}</div>
        </div>
      </div>
    );
  });

  return <>{partyList}</>;
}

export default function PartyList() {
  const [partyList, setpartyList] = useState([
    {
      name: 'room1',
      id: '12345',
      host: 'ehyun',
      numMembers: 0,
      intro: '아무거나 다봐',
    },
    {
      name: 'room2',
      id: '12346',
      host: 'ekwon',
      numMembers: 0,
      intro: '유행 지난 드라마 보는 방',
    },
    {
      name: 'room3',
      id: '12347',
      host: 'kwon',
      numMembers: 0,
      intro: '인기 드라마 몰아보기',
    },
    {
      name: 'room3',
      id: '12348',
      host: 'kwon',
      numMembers: 0,
      intro: '가수 ㅇㅇㅇ 방송 몰아보기',
    },
  ]);
  const [partyName, partyNameInput] = useInput({ type: 'text' });
  const [partyDesc, partyDescInput] = useInput({ type: 'text' });

  // useEffect(() => {
  //   fetchPartyList().then((response) => {
  //     console.log(response);
  //   });
  // }, [partyList]);

  function createRoom() {
    console.log(partyName, partyDesc);
  }

  return (
    <ul>
      <li className='partyList-parties-wrapper'>
        <div className='partyList-party create-room'>
          <img src={plusImage} alt='create' onClick={createRoom} />
          <p>방 이름과 소개 메세지를 입력해주세요.</p>
          <div>
            <div>이름: {partyNameInput}</div>
            <div>소개: {partyDescInput}</div>
          </div>
        </div>
        <DisplayPartyList partyList={partyList} />
      </li>
    </ul>
  );
}
