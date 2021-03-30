import { ReactElement, useEffect, useState } from 'react';
import styles from '../../assets/scss/SearchBar.module.scss';
import DropDown from '../DropDown';
import { OperationVariables, QueryLazyOptions } from '@apollo/client';
import loadItemFromLocalStorage, { addItemOnLocalStorage } from '../../helper/localStorage';
import SearchBarHeader from './SearchBarHeader';
import { localStorageData, UserSuggest } from '../../types';
import SearchSuggests from './SearchSuggests';
import SearchHistory from './SearchHistory';

const DEFAULT_WITH = 40;
const SEARCH_HISTORY = 'SearchHistoryLists';
interface Props {
  suggests?: UserSuggest[];
  fetchSuggestion: (options?: QueryLazyOptions<OperationVariables> | undefined) => void;
  width: number;
}
function SearchBar({ suggests, fetchSuggestion, width }: Props): ReactElement {
  const [isActivated, setIsActivated] = useState<boolean>(false);

  const [userInput, setUserInput] = useState<string>('');
  useEffect(() => {
    if (userInput) {
      fetchSuggestion({ variables: { keyword: userInput } });
    }
  }, [userInput]);

  function storeSearchHistory(name = '') {
    if (!name) return;
    const data: localStorageData = {
      id: name,
      type: 'user',
      updateTime: new Date(),
    };
    addItemOnLocalStorage<localStorageData>(data, SEARCH_HISTORY);
    setUserInput('');
    setIsActivated(false);
  }
  const [searchHistory, setSearchHistory] = useState<localStorageData[]>(
    loadItemFromLocalStorage<localStorageData>(SEARCH_HISTORY)
  );
  return (
    <div
      className={isActivated ? styles.activatedSearchWrapper : styles.searchWrapper}
      style={{ width: isActivated ? `${width}px` : `${DEFAULT_WITH}px` }}
    >
      <DropDown
        header={<SearchBarHeader {...{ isActivated, setIsActivated, userInput, setUserInput, storeSearchHistory }} />}
      >
        {isActivated ? (
          <div
            className={styles.searchSuggest}
            style={{ width: isActivated ? `${width - 27}px` : `${DEFAULT_WITH}px` }}
          >
            {userInput ? (
              <SearchSuggests {...{ suggests, storeSearchHistory }} />
            ) : searchHistory.length ? (
              <SearchHistory
                {...{
                  searchHistory,
                  setSearchHistory,
                  storeSearchHistory,
                }}
              />
            ) : (
              '검색 기록이 없습니다.'
            )}
          </div>
        ) : (
          <></>
        )}
      </DropDown>
    </div>
  );
}

export default SearchBar;
