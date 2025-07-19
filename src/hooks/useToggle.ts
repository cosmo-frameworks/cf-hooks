import { useCallback, useState } from "react";


/**
 * A custom React hook that manages a boolean state and provides functions to toggle, set on, or set off the state.
 *
 * @param initial - The initial value of the boolean state. Default is `false`.
 *
 * @returns An array containing four functions:
 * - The first function returns the current boolean state.
 * - The second function toggles the boolean state between `true` and `false`.
 * - The third function sets the boolean state to `true`.
 * - The fourth function sets the boolean state to `false`.
 */
export function useToggle(
  initial = false
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setOn = useCallback(() => setValue(true), []);
  const setOff = useCallback(() => setValue(false), []);

  return [value, toggle, setOn, setOff];
}
