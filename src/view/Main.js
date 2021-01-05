import React from 'react';
import '../assets/css/Main.css';
import FrindList from '../component/Main/FriendList';
import PartyList from '../component/Main/PartyList';

function Main() {
  return (
    <div className='Main'>
      <PartyList />
      <FrindList />
    </div>
  );
}

export default Main;
