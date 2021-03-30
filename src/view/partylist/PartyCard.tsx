import { ReactElement } from 'react';
import styles from '../../assets/scss/PartyList.module.scss';
import coverImage from '../../assets/images/cover.png';

interface Props {
  partyName: string;
  hostId: string;
  numUsers: number;
  bookmarked: number;
}
export default function PartCard({ partyName, hostId, numUsers, bookmarked }: Props): ReactElement {
  return (
    <>
      <div className={styles.partyName}>{partyName}</div>
      <div>
        <img className={styles.thumbnail} alt="coverImage" src={coverImage} />
      </div>
      <div className={styles.partyDetailWrapper}>
        <div className={styles.partyDetail}>
          <div className={styles.hostID}>
            <i className="fas fa-user" />
            {hostId}
          </div>
          <div>
            <i className="fas fa-users" />
            {numUsers}명
          </div>
          <div>
            <i className="fas fa-star" />
            {bookmarked}명
          </div>
        </div>
      </div>
    </>
  );
}
