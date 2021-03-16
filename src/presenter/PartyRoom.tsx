import { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from '../assets/scss/PartyRoom.module.scss';
import Videolist from '../view/partyRoom/VideoList';
import MainVideo from '../view/partyRoom/MainVideo';
import Chat from '../view/partyRoom/Chat';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_PARTY } from '../queries/party';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { socketQueueVar, videoIdVar, videoListVar } from '../cache';
import Header from '../components/Header';

export default function PartyRoom(): ReactElement {
  const { partyId } = useParams<{ partyId: string }>();
  const queue = useReactiveVar(socketQueueVar);
  useEffect(() => {
    socketQueueVar([
      ...queue,
      {
        type: 'joinPartyRoom',
        partyId,
      },
    ]);
  }, []);

  const { data, error, loading } = useQuery(GET_PARTY, {
    variables: { partyId },
  });

  const videoId = useReactiveVar(videoIdVar);
  const videoList = useReactiveVar(videoListVar);
  if (!videoId) videoIdVar(data?.party?.videos[0]?.vid);
  if (!videoList?.length) videoListVar(data?.party?.videos);

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className={styles.partyRoom}>
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
      <MainVideo />
      <div className={styles.banner}>
        <Videolist />
        <Chat />
      </div>
    </div>
  );
}
