import { ReactElement } from 'react';
import styles from '../assets/scss/Main.module.scss';
import logo from '../assets/images/logo.png';
import { useHistory } from 'react-router';
import { useReactiveVar } from '@apollo/client';
import { jwtVar, userVar } from '../cache';
import { deleteTokenOnDB } from '../api/index';
import DropDown from './DropDown';

interface Props {
  content: ReactElement;
}
export default function Header({ content }: Props): ReactElement {
  const history = useHistory();
  return (
    <div className={styles.header}>
      <div className={styles.headerLogo} onClick={() => history.push('/')}>
        <img alt="logo" src={logo} />
      </div>
      <div className={styles.headerContent}>{content}</div>
      <div className={styles.headerOptions}>
        <div className={styles.searchBar}>
          검색
          <i className="fas fa-search" />
        </div>
        <LoginStatus />
      </div>
    </div>
  );
}

function LoginStatus(): ReactElement {
  const history = useHistory();
  const jwt = useReactiveVar(jwtVar);
  if (!jwt) {
    return (
      <div className={styles.loginIcon} onClick={() => history.push('/auth')}>
        로그인
        <i className="fas fa-sign-in-alt" />
      </div>
    );
  }

  function logout() {
    const refreshToken = window.localStorage.getItem('refreshToken');
    if (refreshToken) {
      deleteTokenOnDB({ token: refreshToken });
      window.localStorage.removeItem('refreshToken');
    }
    jwtVar('');
    history.push('/auth');
  }

  const user = useReactiveVar(userVar);
  return (
    <DropDown
      offset={{ left: -80, top: 40 }}
      header={
        <div className={styles.userName}>
          <div>{user?.nickName}</div>
          <i className="fas fa-chevron-down" />
        </div>
      }
    >
      <div className={styles.userProfile}>
        <div>프로필 편집</div>
        <div onClick={logout}>로그아웃</div>
      </div>
    </DropDown>
  );
}
