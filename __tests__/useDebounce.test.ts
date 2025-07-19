import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useDebounce } from "../src/hooks/useDebounce";

describe("useDebounce", () => {
  it("debe devolver el valor inicial inmediatamente", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it("debe actualizar el valor después del retraso", async () => {
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
