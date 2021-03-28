import { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './assets/scss/App.module.scss';
import PCMain from './presenter/PCMain';
import PartyRoom from './presenter/PartyRoom';
import SocketIO from './model/Socket/SocketModel';
import Auth from './presenter/Auth';
import useInitAuth from './model/Main/initAuthModel';

function App(): ReactElement {
  SocketIO();
  useInitAuth();

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
          <PCMain />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
