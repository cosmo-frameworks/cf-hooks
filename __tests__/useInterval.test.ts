import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";

import { useInterval } from "../src/hooks/useInterval";

describe("useInterval", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should call the callback repeatedly with the given delay.", () => {
    const callback = vi.fn();

    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("should not set interval if delay is null.", () => {
    const callback = vi.fn();

    renderHook(() => useInterval(callback, null));

    vi.advanceTimersByTime(3000);

    expect(callback).not.toHaveBeenCalled();
  });

  it("should use the latest callback.", () => {
    const first = vi.fn();
    const second = vi.fn();

    const { rerender } = renderHook(({ cb, delay }) => useInterval(cb, delay), {
      initialProps: { cb: first, delay: 1000 },
    });

    vi.advanceTimersByTime(1000);
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(0);

    rerender({ cb: second, delay: 1000 });

    vi.advanceTimersByTime(1000);
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("should clear interval on unmount.", () => {
    const clearSpy = vi.spyOn(globalThis, "clearInterval");
    const { unmount } = renderHook(() => useInterval(() => {}, 500));

    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });
});
