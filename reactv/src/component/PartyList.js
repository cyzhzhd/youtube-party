import React, { useEffect, useState } from 'react';
import '../assets/css/PartyList.css';
import { fetchPartyList, createParty } from '../api/index.js';
import plusImage from '../assets/images/plus.png';
import coverImage from '../assets/images/cover.png';
import useInput from '../hook/useInput';

function DisplayPartyList(props) {
  const partyList = props.partyList.map((val) => (
    <div key={val._id} className='partyList-party'>
      <div className='partyList-cover-image'>
        <img alt='coverImage' src={coverImage} />
      </div>
      <div className='partyList-details-wrapper'>
        <div className='partyList-detail'>
          <div>{val.name}</div>
          <div>{val.hostId}</div>
          <div>{val.userList.length}</div>
        </div>
        <div className='partyList-intro'>{val.description}</div>
      </div>
    </div>
  ));

  return <>{partyList}</>;
}

export default function PartyList(props) {
  const [partyList, setpartyList] = useState([
    {
      name: 'room1',
      _id: '12345',
      host: 'ehyun',
      userList: [],
      description: '아무거나 다봐',
    },
    {
      name: 'room2',
      _id: '12346',
      host: 'ekwon',
      userList: [],
      description: '유행 지난 드라마 보는 방',
    },
    {
      name: 'room3',
      _id: '12347',
      host: 'kwon',
      userList: [],
      description: '인기 드라마 몰아보기',
    },
    {
      name: 'room3',
      _id: '12348',
      host: 'kwon',
      userList: [],
      description: '가수 ㅇㅇㅇ 방송 몰아보기',
    },
  ]);
  const [partyName, setPartyName, partyNameInput] = useInput({ type: 'text' });
  const [partyDesc, setPartyDesc, partyDescInput] = useInput({ type: 'text' });

  useEffect(() => {
    fetchPartyList()
      .then(({ data }) => {
        setpartyList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.socketUpdateFlag]);

  async function createRoom() {
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
    <ul className='party-list'>
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
