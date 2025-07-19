import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useDebounce } from "../src/hooks/useDebounce";

describe("useDebounce", () => {
  it("should return the initial value immediately.", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it("should update the value after the delay.", async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "a" },
      }
    );

    rerender({ value: "b" });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("b");
    vi.useRealTimers();
  });
});
