import { ReactElement, useState } from 'react';
import styles from '../../assets/scss/Auth.module.scss';
import useInput from '../../hooks/useInput';

interface Props {
  signUpMode: () => void;
  signInUesr: (id: string, password: string) => void;
}
export default function SingIn({ signUpMode, signInUesr }: Props): ReactElement {
  const [ID, IDInput, setID] = useInput({ type: 'text' });
  const [PW, PWInput, setPW] = useInput({ type: 'password' });

  const [errorMsg, setErrorMsg] = useState('');
  function signInHandler() {
    if (!ID) {
      setErrorMsg('아이디를 입력해주세요.');
      return;
    }
    if (!PW) {
      setErrorMsg('비밀번호를 입력해주세요.');
      return;
    }
    signInUesr(ID, PW);
    setID('');
    setPW('');
  }
  return (
    <div className={styles.singInWrapper}>
      <div className={styles.title}>로그인</div>
      <div className={styles.inputForm}>
        <div>
          <div>아이디</div>
          <div>{IDInput}</div>
        </div>
        <div>
          <div>비밀번호</div>
          <div>{PWInput}</div>
        </div>
      </div>
      <div className={styles.optionWrapper}>
        <div>아이디 혹은 비밀번호를 잊었습니까?</div>
        <div onClick={signUpMode}>계정 만들기</div>
      </div>
      {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
      <div className={styles.signBtn}>
        <button onClick={signInHandler}>로그인 하기</button>
      </div>
    </div>
  );
}
