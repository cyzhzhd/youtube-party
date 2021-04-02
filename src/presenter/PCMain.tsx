import { ReactElement } from 'react';
import styles from '../assets/scss/Main.module.scss';
import useParty from '../model/Party/PartyModel';
import FrindList from './FriendList';
import Header from '../components/Header';
import PartyList from '../view/partylist/PartyList';

const NAVBAR_ITEMS = ['트렌딩', '즐겨찾기', '나의 파티룸', '친구의 파티룸'];
export default function PCMain(): ReactElement {
  const {
    operations: { createParty },
  } = useParty();

  return (
    <div className={styles.main}>
      <Header
        content={
          <div className={styles.navBar}>
            {NAVBAR_ITEMS.map(item => (
              <div key={item}>{item}</div>
            ))}
          </div>
        }
      />
      <div className={styles.body}>
        <div className={styles.partyList}>
          <PartyList {...{ createParty }} />
        </div>
        <div className={styles.friendList}>
          <FrindList />
        </div>
      </div>
    </div>
  );
}
