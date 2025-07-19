import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";

import { useTimeout } from "../src/hooks/useTimeout";

describe("useTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should call the callback after the specified delay.", () => {
    const callback = vi.fn();

    renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback if delay is null.", () => {
    const callback = vi.fn();

    renderHook(() => useTimeout(callback, null as any));

    vi.advanceTimersByTime(5000);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should use the latest version of the callback.", () => {
    const first = vi.fn();
    const second = vi.fn();

    const { rerender } = renderHook(({ cb, delay }) => useTimeout(cb, delay), {
      initialProps: { cb: first, delay: 1000 },
    });

    rerender({ cb: second, delay: 1000 });

    vi.advanceTimersByTime(1000);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("should clear timeout on unmount.", () => {
    const clearSpy = vi.spyOn(globalThis, "clearTimeout");
    const { unmount } = renderHook(() => useTimeout(() => {}, 1000));

    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });
});
