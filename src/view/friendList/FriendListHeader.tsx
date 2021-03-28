import { ReactElement } from 'react';
import styles from '../../assets/scss/FriendList.module.scss';

export default function FriendListHeader(): ReactElement {
  return (
    <div className={styles.header}>
      <div>친구 목록</div>
      <i className="fas fa-search" />
    </div>
  );
}
