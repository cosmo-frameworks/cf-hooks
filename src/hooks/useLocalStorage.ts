import React from "react";

/**
 * A custom hook that synchronizes a state variable with localStorage.
 *
 * @template T - The type of the state variable.
 * @param key - The key under which the value is stored in localStorage.
 * @param initialValue - The initial value to use if no value is found in localStorage.
 * @returns A tuple containing the current state and a function to update it.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStored(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [stored, setValue] as const;
}
