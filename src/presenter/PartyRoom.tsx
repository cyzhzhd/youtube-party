import { ReactElement } from 'react';
import { useParams } from 'react-router';
import styles from '../assets/scss/PartyRoom.module.scss';
import Videolist from '../view/partyRoom/VideoList';
import MainVideo from '../view/partyRoom/MainVideo';
import Chat from '../view/partyRoom/Chat';
import PartyHeader from '../view/partyRoom/PartyHeader';
import usePartyRoom from '../model/Party/PartyRoomModel';

export default function PartyRoom(): ReactElement {
  const { partyId } = useParams<{ partyId: string }>();
  const partyModel = usePartyRoom(partyId);
  if (partyModel.error) return partyModel.error;
  if (partyModel.loading) return partyModel.loading;

  return (
    <div className={styles.partyRoom}>
      <PartyHeader />
      <MainVideo />
      <div className={styles.banner}>
        <Videolist />
        <Chat />
      </div>
    </div>
  );
}
