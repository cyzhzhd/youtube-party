import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './assets/css/App.css';
import Main from './view/Main';
import PartyRoom from './view/PartyRoom';
import SocketIO from './component/SocketIO';

function App() {
  SocketIO();

  return (
    <div className='App'>
      <Switch>
        <Route path='/partyRoom/:id/:name'>
          <PartyRoom />
        </Route>
        <Route path='/'>
          <Main></Main>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
