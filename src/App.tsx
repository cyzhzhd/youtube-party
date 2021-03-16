import { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './assets/scss/App.module.scss';
import Main from './presenter/Main';
import PartyRoom from './presenter/PartyRoom';
import SocketIO from './model/Socket/SocketModel';
import Auth from './presenter/Auth';

function App(): ReactElement {
  SocketIO();

  return (
    <div className={styles.App}>
      <Switch>
        <Route exact path="/auth">
          <Auth />
        </Route>
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
