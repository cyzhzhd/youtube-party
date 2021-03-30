import { ReactElement, useEffect, useRef, useState } from 'react';
import styles from '../assets/scss/DropDown.module.scss';
import useClickOutside from '../hooks/useClickOutside';

interface Props {
  header: ReactElement;
  children: ReactElement;
  offset?: { top: number; left: number };
  selectedVal?: string | number;
}
function DropDown({ header, children, offset, selectedVal }: Props): ReactElement {
  const [visible, setVisible] = useState<boolean>(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside({ wrapperRef, action: () => setVisible(false) });

  useEffect(() => {
    setVisible(!visible);
  }, [selectedVal]);

  return (
    <div className={styles.dropDownWrapper} ref={wrapperRef}>
      <div className={styles.header} onClick={() => setVisible(!visible)}>
        {header}
      </div>
      {visible && (
        <div className={styles.dropDown} style={{ left: `${offset?.left}px`, top: `${offset?.top}px` }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default DropDown;
