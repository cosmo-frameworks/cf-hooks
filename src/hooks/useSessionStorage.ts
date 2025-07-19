import React from "react";

/**
 * Custom hook to manage a value in session storage.
 *
 * @template T - The type of the value to be stored.
 * @param {string} key - The key under which the value is stored in session storage.
 * @param {T} initialValue - The initial value to use if no value is found in session storage.
 * @returns {[T, (value: T) => void]} - Returns a tuple containing the current stored value and a function to update it.
 */
export function useSessionStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = React.useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStored(value);
    window.sessionStorage.setItem(key, JSON.stringify(value));
  };

  return [stored, setValue] as const;
}
