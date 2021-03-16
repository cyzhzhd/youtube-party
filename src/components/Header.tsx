import { ReactElement } from 'react';
import styles from '../assets/scss/Main.module.scss';
import logo from '../assets/images/logo.png';
import { useHistory } from 'react-router';

interface Props {
  content: ReactElement;
}
export default function Header({ content }: Props): ReactElement {
  const history = useHistory();
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
        <div onClick={() => history.push('/auth')}>
          로그인
          <i className="fas fa-sign-in-alt" />
        </div>
      </div>
    </div>
  );
}
