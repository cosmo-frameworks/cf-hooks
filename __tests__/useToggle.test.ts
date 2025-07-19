import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useToggle } from "../src/hooks/useToggle";

describe("useToggle", () => {
  it("should start with false by default.", () => {
    const { result } = renderHook(() => useToggle());
    const [value] = result.current;
    expect(value).toBe(false);
  });

  it("should accept an initial value of true.", () => {
    const { result } = renderHook(() => useToggle(true));
    const [value] = result.current;
    expect(value).toBe(true);
  });

  it("should toggle the value with toggle().", () => {
    const { result } = renderHook(() => useToggle());
    const [, toggle] = result.current;

    act(() => {
      toggle();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      toggle();
    });

    expect(result.current[0]).toBe(false);
  });

  it("should activate and deactivate with setOn() and setOff().", () => {
    const { result } = renderHook(() => useToggle());
    const [, , setOn, setOff] = result.current;

    act(() => {
      setOn();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      setOff();
    });
    expect(result.current[0]).toBe(false);
  });
});
