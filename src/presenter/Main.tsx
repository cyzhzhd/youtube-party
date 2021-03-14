import React, { ReactElement } from 'react';
import '../assets/css/Main.css';
import useParty from '../model/Party/PartyModel';
import FrindList from '../view/main/FriendList';
import PartyList from '../view/main/PartyList';

function Main(): ReactElement {
  const {
    operations: { createParty },
  } = useParty();

  return (
    <div className="Main">
      <PartyList {...{ createParty }} />
      <FrindList />
    </div>
  );
}

export default Main;
