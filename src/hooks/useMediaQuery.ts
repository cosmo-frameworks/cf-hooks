import React from "react";

/**
 * Custom hook that listens for changes to a media query and returns whether it matches.
 *
 * @param query - A string representing the media query to evaluate.
 * @returns A boolean indicating whether the media query currently matches.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(
    () => window.matchMedia(query).matches
  );

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const handler = () => setMatches(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
