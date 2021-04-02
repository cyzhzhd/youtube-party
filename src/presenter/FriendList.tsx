import { ReactElement } from 'react';
import styles from '../assets/scss/FriendList.module.scss';
import useUser from '../model/User/UserModel';
import FriendListHeader from '../view/friendList/FriendListHeader';

export default function FriendList(): ReactElement {
  const {
    operations: { sendFriendRequest },
  } = useUser();
  return (
    <div className={styles.friendListWrapper}>
      <FriendListHeader action={sendFriendRequest} />
      <div className={styles.friendList}>
        <ul>hi</ul>
      </div>
    </div>
  );
}
