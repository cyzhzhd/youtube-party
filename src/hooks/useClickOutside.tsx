import { useEffect } from 'react';

interface Props {
  wrapperRef: React.RefObject<HTMLDivElement>;
  close: () => void;
}
function useClickOutside({ wrapperRef, close }: Props): void {
  function handleClickOutside(event: MouseEvent) {
    const { current } = wrapperRef;
    if (current && !current.contains(event.target as Node)) {
      close();
    }
  }
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
}

export default useClickOutside;
