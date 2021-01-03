import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './view/Main';
import PartyRoom from './view/PartyRoom';
import useSocketIO from './hook/useSocketIO';

function App() {
  const { sessionId, friendList, socketUpdateFlag } = useSocketIO();

  return (
    <div className='App'>
      <Switch>
        <Route path='/partyRoom/:id/:name'>
          <PartyRoom />
        </Route>
        <Route path='/'>
          <Main
            friendList={friendList}
            socketUpdateFlag={socketUpdateFlag}
            sessionId={sessionId}
          ></Main>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
