import { ReactElement, useState } from 'react';
import styles from '../../assets/scss/SearchBar.module.scss';
import { Suggest } from '../../types';

interface SearchSuggestsProps {
  suggest: Suggest;
  action: (id: string) => void;
}
export default function SearchSuggest({ suggest, action }: SearchSuggestsProps): ReactElement {
  const [sendRequest, setSendRequest] = useState<boolean>(false);
  function sendFriendRequest(id: string) {
    if (!sendRequest) {
      action(id);
    }
    setSendRequest(sendRequest => !sendRequest);
  }
  return (
    <div className={styles.suggestStoreWrapper} onClick={() => sendFriendRequest(suggest.id)}>
      <div className={styles.suggestStoreNameWrapper}>
        <div className={styles.suggestStoreIcon}>
          <i className="fas fa-user-tie" />
        </div>
        <div className={styles.suggestStoreName}>
          {suggest.name} ({suggest.id})
        </div>
      </div>
      <div className={styles.suggestStoreCategory}>
        {sendRequest ? (
          <i className={['fas fa-user-check', styles.friendRequest].join(' ')} />
        ) : (
          <i className="fas fa-user-plus" />
        )}
      </div>
    </div>
  );
}
