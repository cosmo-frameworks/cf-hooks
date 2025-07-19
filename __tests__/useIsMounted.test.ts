import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";

import { useIsMounted } from "../src/hooks/useIsMounted";

describe("useIsMounted", () => {
  it("should return true when the component is mounted.", () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current.current).toBe(true);
  });

  it("should return false after the component is unmounted.", () => {
    const { result, unmount } = renderHook(() => useIsMounted());
    expect(result.current.current).toBe(true);

    unmount();

    expect(result.current.current).toBe(false);
  });
});
