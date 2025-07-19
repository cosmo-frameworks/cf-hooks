import React from "react";

/**
 * A custom React hook that tracks the mounted state of a component.
 *
 * This hook returns a ref object that indicates whether the component
 * is currently mounted or not. It is useful for avoiding state updates
 * on unmounted components.
 *
 * @returns {React.MutableRefObject<boolean>} A ref object with a boolean
 * value that is `true` if the component is mounted and `false` otherwise.
 */
export function useIsMounted() {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
