import React from 'react';
import '../assets/css/Main.css';
import FrindList from '../component/FriendList';
import PartyList from '../component/PartyList';

function Main(props) {
  return (
    <div className='Main'>
      <PartyList />
      <FrindList />
    </div>
  );
}

export default Main;
