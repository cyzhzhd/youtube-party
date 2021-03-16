import { useEffect } from 'react';

const OBSERVER_OPTION = {
  root: null,
  rootMargin: '0px',
  threshold: 0.9,
};
interface Props {
  observerRef: React.MutableRefObject<HTMLElement | null>;
  action: () => void;
  dependencyArr?: unknown[];
}

function useIntersectionObserver({ observerRef, action, dependencyArr = [] }: Props): void {
  function checkIntersect(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        action();
      }
    });
  }
  useEffect(() => {
    let observer: IntersectionObserver;
    if (observerRef.current) {
      observer = new IntersectionObserver(checkIntersect, OBSERVER_OPTION);
      observer.observe(observerRef.current as Element);
      return () => {
        observer?.disconnect();
      };
    }
  }, [observerRef.current, action, ...dependencyArr]);
}

export default useIntersectionObserver;
