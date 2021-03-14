import { ReactElement } from 'react';
import useInput from '../../hooks/useInput';
import plusImage from '../../assets/images/plus.png';

interface Props {
  createParty: (string) => void;
}
export default function CreatePartyBox({ createParty }: Props): ReactElement {
  const [partyName, partyNameInput, setPartyName] = useInput({ type: 'text' });

  async function onClickHandler() {
    createParty(partyName);
    setPartyName('');
  }
  return (
    <div className="partyList-party create-room">
      <img src={plusImage} alt="create" onClick={onClickHandler} />
      <p>방 이름과 소개 메세지를 입력해주세요.</p>
      <div>
        <div>이름: {partyNameInput}</div>
      </div>
    </div>
  );
}
