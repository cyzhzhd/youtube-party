import { ReactElement, useEffect, useState } from 'react';
import styles from '../../assets/scss/SearchBar.module.scss';
import DropDown from '../DropDown';
import { OperationVariables, QueryLazyOptions } from '@apollo/client';
import SearchBarHeader from './SearchBarHeader';
import { Suggest } from '../../types';
import SearchSuggest from './SearchSuggest';

const DEFAULT_WITH = 40;
interface Props {
  suggests?: Suggest[];
  fetchSuggestion: (options?: QueryLazyOptions<OperationVariables> | undefined) => void;
  width: number;
  action: (id: string) => void;
}
function SearchBar({ suggests, fetchSuggestion, width, action }: Props): ReactElement {
  const [isActivated, setIsActivated] = useState<boolean>(false);

  const [userInput, setUserInput] = useState<string>('');
  useEffect(() => {
    if (userInput) {
      fetchSuggestion({ variables: { keyword: userInput } });
    }
  }, [userInput]);
  return (
    <div
      className={isActivated ? styles.activatedSearchWrapper : styles.searchWrapper}
      style={{ width: isActivated ? `${width}px` : `${DEFAULT_WITH}px` }}
    >
      <DropDown header={<SearchBarHeader {...{ isActivated, setIsActivated, userInput, setUserInput }} />}>
        {isActivated ? (
          <div
            className={styles.searchSuggest}
            style={{ width: isActivated ? `${width - 27}px` : `${DEFAULT_WITH}px` }}
          >
            {userInput && suggests?.map(suggest => <SearchSuggest key={suggest.id} {...{ suggest, action }} />)}
          </div>
        ) : (
          <></>
        )}
      </DropDown>
    </div>
  );
}

export default SearchBar;
