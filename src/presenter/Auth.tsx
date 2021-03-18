import { ReactElement, useState } from 'react';
import styles from '../assets/scss/Auth.module.scss';
import useUser from '../model/User/UserModel';
import SingIn from '../view/Auth/SignIn';
import SignUp from '../view/Auth/SignUp';

export default function Auth(): ReactElement {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {
    operations: { signUpUser },
  } = useUser();
  return (
    <div className={styles.authWrapper}>
      <div className={styles.auth}>
        {isLoginMode ? (
          <SingIn signUpMode={() => setIsLoginMode(false)} />
        ) : (
          <SignUp signInMode={() => setIsLoginMode(true)} {...{ signUpUser }} />
        )}
      </div>
    </div>
  );
}
