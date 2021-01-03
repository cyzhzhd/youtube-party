import React from 'react';
import './assets/css/App.css';
import FrindList from './component/FriendList';
import PartyList from './component/PartyList';
import useSocketIO from './hook/useSocketIO';

function App() {
  const { sessionId, friendList, socketUpdateFlag } = useSocketIO();

  console.log(sessionId);
  return (
    <div className='App'>
      <FrindList friendList={friendList} />
      <PartyList socketUpdateFlag={socketUpdateFlag} sessionId={sessionId} />
    </div>
  );
}

export default App;
