import { ReactElement } from 'react';
import styles from '../../assets/scss/SearchBar.module.scss';
import { UserSuggest } from '../../types';

interface SearchSuggestsProps {
  suggests?: UserSuggest[];
  storeSearchHistory(name?: string): void;
}
export default function SearchSuggests({ suggests, storeSearchHistory }: SearchSuggestsProps): ReactElement {
  return (
    <>
      {suggests?.map(({ uid, nickName }) => (
        <div key={uid} className={styles.suggestStoreWrapper} onClick={() => storeSearchHistory(nickName)}>
          <div className={styles.suggestStoreNameWrapper}>
            <div className={styles.suggestStoreIcon}>
              <i className="fas fa-user-tie" />
            </div>
            <div className={styles.suggestStoreName}>
              {nickName} ({uid})
            </div>
          </div>
          <div className={styles.suggestStoreCategory}>
            <i className="fas fa-user-plus" />
          </div>
        </div>
      ))}
    </>
  );
}
