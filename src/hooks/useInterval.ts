import React from "react";

/**
 * Custom hook that sets up an interval to repeatedly call a provided callback function.
 *
 * @param callback - The function to be executed at each interval.
 * @param delay - The delay in milliseconds for the interval. If null, the interval is paused.
 * @returns void
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
