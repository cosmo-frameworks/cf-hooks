import React from "react";

/**
 * A custom hook that returns a stable callback function which always has the latest version of the provided function.
 *
 * @param fn - The function to be invoked. It can accept any number of arguments and return any value.
 * @returns A stable callback function that always calls the latest version of the provided function.
 */
export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = React.useRef(fn);
  ref.current = fn;
  return React.useCallback(((...args: any[]) => ref.current(...args)) as T, []);
}
