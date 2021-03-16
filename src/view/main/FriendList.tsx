import { ReactElement } from 'react';
import styles from '../../assets/scss/FriendList.module.scss';

export default function FriendList(): ReactElement {
  return <div className={styles.friendList}>친구 목록</div>;
}
