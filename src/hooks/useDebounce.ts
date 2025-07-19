import React from "react";

/**
 * Custom React hook that debounces a value by a specified delay.
 *
 * @param value - The value to be debounced.
 * @param delay - The delay in milliseconds to debounce the value. Defaults to 300ms.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
