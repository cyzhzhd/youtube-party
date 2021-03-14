export default function throttle(callback: (...unknown) => void, limit: number): (...unknown) => void {
  let waiting = false;
  return function (...args) {
    if (!waiting) {
      callback.apply(this, args);
      waiting = true;
      setTimeout(() => (waiting = false), limit);
    }
  };
}
