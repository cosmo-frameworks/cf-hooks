import React from "react";

/**
 * Custom hook to track the hover state of an HTML element.
 *
 * @typeParam T - The type of the HTML element to be tracked.
 * @returns A tuple containing a ref to be attached to the element and a boolean indicating if the element is hovered.
 */
export function useHover<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return [ref, hovered] as const;
}
