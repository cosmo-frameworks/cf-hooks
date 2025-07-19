import React from "react";

/**
 * A custom React hook that tracks the size of a DOM element.
 *
 * @typeParam T - The type of the HTML element to be observed.
 * @returns A tuple containing:
 * - A ref object to be attached to the target element.
 * - An object representing the current width and height of the element.
 */
export function useElementSize<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}
