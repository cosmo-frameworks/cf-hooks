import React from "react";

/**
 * A custom hook that triggers a callback function when a click is detected outside of a specified element.
 *
 * @typeParam T - The type of the HTML element to be monitored for outside clicks.
 * @param handler - A callback function to be executed when a click is detected outside the referenced element.
 * @returns A ref object that should be attached to the element you want to monitor for outside clicks.
 */
export function useClickOutside<T extends HTMLElement>(handler: () => void) {
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [handler]);

  return ref;
}
