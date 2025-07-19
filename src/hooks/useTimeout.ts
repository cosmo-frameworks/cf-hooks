import React from "react";

/**
 * A custom hook that sets up a timeout to execute a callback function after a specified delay.
 *
 * @param callback - The function to be executed after the delay.
 * @param delay - The time in milliseconds to wait before executing the callback. If null, the timeout is not set.
 * @returns void
 */
export function useTimeout(callback: () => void, delay: number) {
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay === null) return;
    const id = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}
