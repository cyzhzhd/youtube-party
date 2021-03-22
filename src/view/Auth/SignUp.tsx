import { ReactElement, useState } from 'react';
import styles from '../../assets/scss/Auth.module.scss';
import useInput from '../../hooks/useInput';

interface Props {
  showSignInPage: () => void;
  signUpUser: (id: string, password: string, nickName: string) => void;
}
export default function SignUp({ showSignInPage, signUpUser }: Props): ReactElement {
  const [ID, IDInput, setID] = useInput({ type: 'text' });
  const [PW, PWInput, setPW] = useInput({ type: 'password' });
  const [confirmPW, confirmPWInput, setConfirmPW] = useInput({ type: 'password' });
  const [nickName, nickNameInput, setNickName] = useInput({ type: 'text' });

  const [errorMsg, setErrorMsg] = useState('');
  function signUpHandler() {
    if (!ID) {
      setErrorMsg('아이디를 입력해주세요.');
      return;
    }
    if (!nickName) {
      setErrorMsg('닉네임을 입력해주세요.');
      return;
    }
    if (!PW || !confirmPW) {
      setErrorMsg('패스워드를 입력해주세요.');
      return;
    }
    if (PW !== confirmPW) {
      setErrorMsg('비밀번호를 다시 확인해주세요.');
      return;
    }

    signUpUser(ID, PW, nickName);
    setID('');
    setPW('');
    setConfirmPW('');
    setNickName('');
    setErrorMsg('');
  }
  return (
    <div className={styles.signInWrapper}>
      <div className={styles.title}>회원가입</div>
      <div className={styles.inputForm}>
        <div>
          <div>아이디</div>
          <div>{IDInput}</div>
        </div>
        <div>
          <div>닉네임</div>
          <div>{nickNameInput}</div>
        </div>
        <div>
          <div>비밀번호</div>
          <div>{PWInput}</div>
        </div>
        <div>
          <div>비밀번호 재확인</div>
          <div>{confirmPWInput}</div>
        </div>
      </div>
      <div className={styles.optionWrapper}>
        <div onClick={showSignInPage}>이미 아이디가 있으십니까?</div>
      </div>
      {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
      <div className={styles.signBtn}>
        <button onClick={signUpHandler}>계정 만들기</button>
      </div>
    </div>
  );
}
