import { useLazyQuery } from '@apollo/client';
import { ReactElement } from 'react';
import styles from '../../assets/scss/FriendList.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import { SEARCH_USER } from '../../queries/search';

interface Props {
  action: (id: string) => void;
}
export default function FriendListHeader({ action }: Props): ReactElement {
  const [searchUser, { data }] = useLazyQuery(SEARCH_USER);

  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>친구 목록</div>
      <div className={styles.headerSearchIcon}>
        <SearchBar suggests={data?.searchedUser} fetchSuggestion={searchUser} width={280} action={action} />
      </div>
    </div>
  );
}
