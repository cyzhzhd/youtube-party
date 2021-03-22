import { useReactiveVar } from '@apollo/client';
import { ReactElement, useState } from 'react';
import { useHistory } from 'react-router';
import styles from '../assets/scss/Auth.module.scss';
import { jwtVar } from '../cache';
import useUser from '../model/User/UserModel';
import SingIn from '../view/Auth/SignIn';
import SignUp from '../view/Auth/SignUp';

export default function Auth(): ReactElement {
  const jwt = useReactiveVar(jwtVar);
  const history = useHistory();
  if (jwt) {
    history.push('/');
  }

  const {
    operations: { signUpUser },
  } = useUser();

  const [isLoginMode, setIsLoginMode] = useState(true);
  return (
    <div className={styles.authWrapper}>
      <div className={styles.auth}>
        {isLoginMode ? (
          <SingIn showSignUpPage={() => setIsLoginMode(false)} />
        ) : (
          <SignUp showSignInPage={() => setIsLoginMode(true)} {...{ signUpUser }} />
        )}
      </div>
    </div>
  );
}
