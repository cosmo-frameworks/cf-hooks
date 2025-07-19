import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useWindowSize } from "../src/hooks/useWindowSize";

describe("useWindowSize", () => {
  const setWindowSize = (width: number, height: number) => {
    (window.innerWidth as number) = width;
    (window.innerHeight as number) = height;
    window.dispatchEvent(new Event("resize"));
  };

  it("should return the current size of the window when mounted.", () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });

  it("should update the size when the window is resized.", () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      setWindowSize(800, 600);
    });

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);

    act(() => {
      setWindowSize(1024, 768);
    });

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });
});
