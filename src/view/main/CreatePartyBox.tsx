import { ReactElement } from 'react';
import styles from '../../assets/scss/PartyList.module.scss';
import useInput from '../../hooks/useInput';

interface Props {
  createParty: (partyName: string) => void;
}
export default function CreatePartyBox({ createParty }: Props): ReactElement {
  const [partyName, partyNameInput, setPartyName] = useInput({ type: 'text' });

  async function onClickHandler() {
    createParty(partyName);
    setPartyName('');
  }
  return (
    <div className={[styles.party, styles.createPartyBox].join(' ')}>
      <div>
        <i className="fas fa-plus fa-4x" onClick={onClickHandler} />
      </div>
      <div>방 이름을 입력해주세요.</div>
      <div>{partyNameInput}</div>
    </div>
  );
}
