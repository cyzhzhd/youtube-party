import { ReactElement, useState } from 'react';
import styles from '../assets/scss/Auth.module.scss';
import SingIn from '../view/Auth/SignIn';
import SignUp from '../view/Auth/SignUp';

export default function Auth(): ReactElement {
  const [isLoginMode, setIsLoginMode] = useState(true);
  return (
    <div className={styles.authWrapper}>
      <div className={styles.auth}>
        {isLoginMode ? (
          <SingIn singUpMode={() => setIsLoginMode(false)} />
        ) : (
          <SignUp singInMode={() => setIsLoginMode(true)} />
        )}
      </div>
    </div>
  );
}
