import React, { ReactElement } from 'react';
import '../assets/css/Main.css';
import FrindList from '../component/main/FriendList';
import PartyList from '../component/main/PartyList';

function Main(): ReactElement {
  return (
    <div className="Main">
      <PartyList />
      <FrindList />
    </div>
  );
}

export default Main;
