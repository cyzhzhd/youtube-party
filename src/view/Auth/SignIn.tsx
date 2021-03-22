import { useReactiveVar } from '@apollo/client';
import { ReactElement, useState } from 'react';
import styles from '../../assets/scss/Auth.module.scss';
import useInput from '../../hooks/useInput';
import { jwtVar } from '../../cache';
import { useHistory } from 'react-router';
import { fetchTokens } from '../../api';

interface Props {
  showSignUpPage: () => void;
}
export default function SingIn({ showSignUpPage }: Props): ReactElement {
  const jwt = useReactiveVar(jwtVar);
  const history = useHistory();
  if (jwt) {
    history.push('/');
  }

  const [errorMsg, setErrorMsg] = useState('');
  const [ID, IDInput, setID] = useInput({ type: 'text' });
  const [PW, PWInput, setPW] = useInput({ type: 'password' });
  async function signInHandler() {
    if (!ID) {
      setErrorMsg('아이디를 입력해주세요.');
      return;
    }
    if (!PW) {
      setErrorMsg('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const token = await fetchTokens({ id: ID, password: PW });
      window.localStorage.setItem('refreshToken', token.refreshToken);
      jwtVar(token.accessToken);
      history.push('/');
    } catch (error) {
      setErrorMsg('아이디와 비밀번호를 확인해주세요.');
    }
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
        <div onClick={showSignUpPage}>계정 만들기</div>
      </div>
      {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
      <div className={styles.signBtn}>
        <button onClick={signInHandler}>로그인 하기</button>
      </div>
    </div>
  );
}
