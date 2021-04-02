import { ReactElement } from 'react';
import styles from '../../assets/scss/SearchBar.module.scss';

interface Props {
  isActivated: boolean;
  setIsActivated: React.Dispatch<React.SetStateAction<boolean>>;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
}
export default function SearchBarHeader({ isActivated, setIsActivated, userInput, setUserInput }: Props): ReactElement {
  return (
    <div className={styles.searchBox}>
      <i className={['fas fa-search', styles.searchIcon].join(' ')} onClick={() => setIsActivated(true)} />
      {isActivated && (
        <>
          <input
            className={styles.inputSearch}
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            type="text"
            autoComplete="off"
            autoFocus
          />
          <i
            className={['fas fa-times', styles.xIcon].join(' ')}
            onClick={() => {
              setIsActivated(false);
              setUserInput('');
            }}
          />
        </>
      )}
    </div>
  );
}
