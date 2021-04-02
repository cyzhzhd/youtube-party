import { ReactElement } from 'react';
import styles from '../../assets/scss/SearchBar.module.scss';
import loadItemFromLocalStorage from '../../helper/localStorage';
import { localStorageData } from '../../types';

const SEARCH_HISTORY = 'SearchHistoryLists';
interface SearchHistoryProps {
  searchHistory: localStorageData[];
  setSearchHistory: React.Dispatch<React.SetStateAction<localStorageData[]>>;
  storeSearchHistory(name?: string): void;
}
export default function SearchHistory({
  searchHistory,
  setSearchHistory,
  storeSearchHistory,
}: SearchHistoryProps): ReactElement {
  function deleteHistory(name?: string) {
    const loadedSearchHistory = loadItemFromLocalStorage<localStorageData>(SEARCH_HISTORY);
    const deletingHistoryIndex = loadedSearchHistory.findIndex(history => history.id === name);
    loadedSearchHistory.splice(deletingHistoryIndex, 1);
    localStorage.setItem(SEARCH_HISTORY, JSON.stringify(loadedSearchHistory));
    setSearchHistory(loadedSearchHistory);
  }
  return (
    <>
      {searchHistory.map(({ updateTime, id, type }: localStorageData) => {
        const day = new Date(updateTime);
        const month = day.getMonth() + 1;
        const date = day.getDate();
        return (
          <div key={updateTime.toString()} className={styles.suggestStoreWrapper}>
            <div className={styles.suggestHistoryWrapper} onClick={() => storeSearchHistory(id)}>
              <div className={styles.suggestStoreIcon}>
                {type === 'PLACE_POI' ? <i className="fas fa-map-marker-alt" /> : <i className="fas fa-search" />}
              </div>
              <div className={styles.suggestStoreName}>{id}</div>
              <div className={styles.searchedDay}>{`${month}.${date}`}</div>
            </div>
            <button className={styles.suggestStoreDelete} onClick={() => deleteHistory(id)}>
              X
            </button>
          </div>
        );
      })}
    </>
  );
}
