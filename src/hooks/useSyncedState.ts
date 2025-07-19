import React from "react";

/**
 * A custom React hook that synchronizes a state variable with localStorage.
 * It allows for persistent state across page reloads and multiple tabs.
 *
 * @param key - The key under which the state is stored in localStorage.
 * @param initial - The initial value of the state if no value is found in localStorage.
 * @returns A tuple containing the current state and a function to update it.
 */
export function useSyncedState<T>(key: string, initial: T) {
  const [state, setState] = React.useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initial;
  });

  React.useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setState(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key]);

  const update = (val: T) => {
    localStorage.setItem(key, JSON.stringify(val));
    setState(val);
  };

  return [state, update] as const;
}
