import { useQuery } from '@apollo/client';
import { ReactElement } from 'react';
import { useParams } from 'react-router';
import styles from '../../assets/scss/PartyRoom.module.scss';
import Header from '../../components/Header';
import { GET_PARTY } from '../../queries/party';

export default function PartyHeader(): ReactElement {
  const { partyId } = useParams<{ partyId: string }>();
  const { data } = useQuery(GET_PARTY, {
    variables: { partyId },
  });

  return (
    <Header
      content={
        <div className={styles.partyDetail}>
          <div className={styles.partyName}>{data?.party.partyName}</div>
          <div className={styles.numUsers}>
            <i className="fas fa-users" />
            {data?.party.numUsers}명
          </div>
          <div className={styles.bookMarked}>
            <i className="fas fa-star" />
            {data?.party.bookmarked}명
          </div>
        </div>
      }
    />
  );
}
