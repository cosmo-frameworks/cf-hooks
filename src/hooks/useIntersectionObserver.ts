import React from "react";

/**
 * A custom React hook that uses the Intersection Observer API to determine
 * the visibility of a DOM element within the viewport.
 *
 * @typeParam T - The type of the HTML element being observed. Defaults to HTMLDivElement.
 * @param options - An optional object of type IntersectionObserverInit that allows
 * customization of the observer's behavior, such as root, rootMargin, and threshold.
 * @returns A tuple containing:
 * - A React ref object to be attached to the DOM element to be observed.
 * - A boolean indicating whether the element is currently visible in the viewport.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {}
) {
  const ref = React.useRef<T | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible] as const;
}
