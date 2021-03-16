import { ReactElement } from 'react';
import styles from '../../assets/scss/Auth.module.scss';
import useInput from '../../hooks/useInput';

interface Props {
  singInMode: () => void;
}
export default function SignUp({ singInMode }: Props): ReactElement {
  const [ID, IDInput, setID] = useInput({ type: 'text' });
  const [PW, PWInput, setPW] = useInput({ type: 'password' });
  const [confirmPW, confirmPWInput, setConfirmPW] = useInput({ type: 'password' });
  const [nickName, nickNameInput, setNickName] = useInput({ type: 'text' });

  function signUpHandler() {
    // auth function
    console.log(ID, PW, nickName);
    setID('');
    setPW('');
    setNickName('');
  }
  return (
    <div className={styles.singInWrapper}>
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
        <div onClick={singInMode}>로그인 하기</div>
      </div>
      <div className={styles.signBtn}>
        <button onClick={signUpHandler}>계정 만들기</button>
      </div>
    </div>
  );
}
