import { ReactElement } from 'react';
import styles from '../../assets/scss/FriendList.module.scss';
import FriendListHeader from './FriendListHeader';

export default function FriendList(): ReactElement {
  return (
    <div className={styles.friendListWrapper}>
      <FriendListHeader />
      <div className={styles.friendList}>
        <ul>hi</ul>
      </div>
    </div>
  );
}
