import { useEffect } from 'react';

interface Props {
  wrapperRef: React.RefObject<HTMLDivElement>;
  action: () => void;
}
function useClickOutside({ wrapperRef, action }: Props): void {
  function handleClickOutside(event: MouseEvent) {
    const { current } = wrapperRef;
    if (current && !current.contains(event.target as Node)) {
      action();
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
