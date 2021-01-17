import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import '../../assets/css/PartyList.css';
import CeateParty from './CreateParty';
import coverImage from '../../assets/images/cover.png';
import { partyList } from '../../store/state';
import { PartyListResponse } from '../../types';

function DisplayPartyList(list: PartyListResponse[]) {
  const partyList = list.map((val: PartyListResponse) => (
    <div key={val._id} className="partyList-party">
      <Link to={`/partyRoom/${val._id}/${val.name}`}>
        <div className="partyList-cover-image">
          <img alt="coverImage" src={coverImage} />
        </div>
        <div className="partyList-details-wrapper">
          <div className="partyList-detail">
            <div>{val.name}</div>
            <div>{val.hostId}</div>
            <div>{val.userList.length}</div>
          </div>
          <div className="partyList-intro">{val.description}</div>
        </div>
      </Link>
    </div>
  ));

  return partyList;
}

export default function PartyList(): ReactElement {
  const partyListLoadable = useRecoilValueLoadable(partyList);

  let content = null;
  switch (partyListLoadable.state) {
    case 'hasValue':
      content = DisplayPartyList(partyListLoadable.contents);
      break;
    case 'hasError':
      content = '데이터를 불러오는 중 에러 발생';
      break;
    default:
      content = '...';
  }

  return (
    <ul className="party-list">
      <li className="partyList-parties-wrapper">
        <CeateParty />
        {content}
      </li>
    </ul>
  );
}
