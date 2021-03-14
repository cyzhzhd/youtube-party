import { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import './assets/css/App.css';
import Main from './presenter/Main';
import PartyRoom from './presenter/PartyRoom';
import SocketIO from './model/Socket';

function App(): ReactElement {
  SocketIO();

  return (
    <div className="App">
      <Switch>
        <Route exact path="/partyRoom/:partyId">
          <PartyRoom />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
