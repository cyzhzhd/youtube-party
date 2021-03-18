import { ReactElement } from 'react';
import styles from '../assets/scss/Main.module.scss';
import logo from '../assets/images/logo.png';
import { useHistory } from 'react-router';
import { useReactiveVar } from '@apollo/client';
import { jwtVar } from '../cache';
import { deleteToken } from '../api/index';

function Auth(): ReactElement {
  const history = useHistory();
  const jwt = useReactiveVar(jwtVar);

  function logout() {
    const refreshToken = window.localStorage.getItem('refreshToken');
    if (refreshToken) {
      deleteToken({ token: refreshToken });
      window.localStorage.removeItem('refreshToken');
      jwtVar('');
    }
    history.push('/auth');
  }
  if (jwt) {
    return (
      <div onClick={logout}>
        로그아웃
        <i className="fas fa-sign-out-alt" />
      </div>
    );
  } else {
    return (
      <div onClick={() => history.push('/auth')}>
        로그인
        <i className="fas fa-sign-in-alt" />
      </div>
    );
  }
}

interface Props {
  content: ReactElement;
}
export default function Header({ content }: Props): ReactElement {
  return (
    <div className={styles.header}>
      <div>
        <img className={styles.headerLogo} alt="logo" src={logo} />
      </div>
      {content}
      <div className={styles.headerOptions}>
        <div>
          검색
          <i className="fas fa-search" />
        </div>
        <Auth />
      </div>
    </div>
  );
}
