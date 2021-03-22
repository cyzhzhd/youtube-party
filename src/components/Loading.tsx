import { ReactElement } from 'react';
import styles from '../assets/scss/App.module.scss';

function Loading(): ReactElement {
  return (
    <div className={styles.loader}>
      <i className="fa fa-fan fa-spin" />
    </div>
  );
}

export default Loading;
