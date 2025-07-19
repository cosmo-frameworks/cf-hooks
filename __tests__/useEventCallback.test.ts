import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";

import { useEventCallback } from "../src/hooks/useEventCallback";

describe("useEventCallback", () => {
  it("should return a stable function reference.", () => {
    const fn = () => {};
    const { result, rerender } = renderHook(({ cb }) => useEventCallback(cb), {
      initialProps: { cb: fn },
    });

    const firstCallback = result.current;

    rerender({ cb: () => {} });

    expect(result.current).toBe(firstCallback);
  });

  it("should always call the latest version of the function.", () => {
    let value = 0;
    const initialFn = () => value;

    const { result, rerender } = renderHook(({ cb }) => useEventCallback(cb), {
      initialProps: { cb: initialFn },
    });

    expect(result.current()).toBe(0);

    value = 42;
    const updatedFn = () => value;
    rerender({ cb: updatedFn });

    expect(result.current()).toBe(42);
  });
});
