import { ReactElement, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/scss/PartyList.module.scss';
import CeatePartyBox from './CreatePartyBox';
import coverImage from '../../assets/images/cover.png';
import { PartyListResponse } from '../../types';
import { useQuery } from '@apollo/client';
import { GET_PARTY_LIST } from '../../queries/party';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const PAGENATION_LIMIT = 20;
interface Props {
  createParty: (partyName: string) => void;
}
export default function PartyList({ createParty }: Props): ReactElement {
  const { data, error, loading, fetchMore } = useQuery(GET_PARTY_LIST, {
    variables: { limit: PAGENATION_LIMIT },
  });

  const observerRef = useRef<HTMLDivElement | null>(null);
  function fetchMoreOnIntersect() {
    if (data?.parties.hasMore) {
      fetchMore({
        variables: { cursor: data?.parties.cursor },
      });
    }
  }
  useIntersectionObserver({ observerRef, action: fetchMoreOnIntersect });

  if (error) return <Error />;
  if (loading) return <Loading />;
  return (
    <ul className={styles.partyListWrapper}>
      <li className={styles.partyList}>
        <CeatePartyBox {...{ createParty }} />
        {data?.parties.parties.map((party: PartyListResponse) => (
          <div key={party._id} className={styles.party}>
            <Link to={`/partyRoom/${party._id}`}>
              <div className={styles.partyName}>{party.partyName}</div>
              <div>
                <img className={styles.thumbnail} alt="coverImage" src={coverImage} />
              </div>
              <div className={styles.partyDetailWrapper}>
                <div className={styles.partyDetail}>
                  <div className={styles.hostID}>
                    <i className="fas fa-user" />
                    {party.hostId}
                  </div>
                  <div>
                    <i className="fas fa-users" />
                    {party.numUsers}명
                  </div>
                  <div>
                    <i className="fas fa-star" />
                    {party.bookmarked}명
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </li>
      <div ref={observerRef}></div>
    </ul>
  );
}
