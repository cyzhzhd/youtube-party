import { ReactElement } from 'react';
import styles from '../../assets/scss/SearchBar.module.scss';

interface Props {
  isActivated: boolean;
  setIsActivated: React.Dispatch<React.SetStateAction<boolean>>;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  storeSearchHistory(name?: string): void;
}
export default function SearchBarHeader({
  isActivated,
  setIsActivated,
  userInput,
  setUserInput,
  storeSearchHistory,
}: Props): ReactElement {
  function openSearchBarOrSearch() {
    userInput ? storeSearchHistory() : setIsActivated(true);
  }
  return (
    <div className={styles.searchBox}>
      <i className={['fas fa-search', styles.searchIcon].join(' ')} onClick={openSearchBarOrSearch} />
      {isActivated && (
        <>
          <input
            className={styles.inputSearch}
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && storeSearchHistory()}
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
