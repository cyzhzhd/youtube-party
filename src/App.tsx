import { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './assets/scss/App.module.scss';
import Main from './presenter/Main';
import PartyRoom from './presenter/PartyRoom';
import SocketIO from './model/Socket/SocketModel';
import Auth from './presenter/Auth';
import useInit from './model/Main/initModel';

function App(): ReactElement {
  SocketIO();
  useInit();

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
