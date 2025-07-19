import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useSessionStorage } from "../src/hooks/useSessionStorage";

describe("useSessionStorage", () => {
  const key = "test-session-key";

  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it("should be initialized with the value of sessionStorage if available.", () => {
    sessionStorage.setItem(key, JSON.stringify("stored-value"));

    const { result } = renderHook(() => useSessionStorage(key, "default"));

    expect(result.current[0]).toBe("stored-value");
  });

  it("should be initialized with the default value if sessionStorage is empty.", () => {
    const { result } = renderHook(() => useSessionStorage(key, "default"));

    expect(result.current[0]).toBe("default");
  });

  it("should update state and sessionStorage when the configurator is called.", () => {
    const { result } = renderHook(() => useSessionStorage(key, "initial"));

    act(() => {
      result.current[1]("new-value");
    });

    expect(result.current[0]).toBe("new-value");
    expect(sessionStorage.getItem(key)).toBe(JSON.stringify("new-value"));
  });

  it("should handle complex types like objects.", () => {
    const obj = { user: "Alice", loggedIn: true };

    const { result } = renderHook(() =>
      useSessionStorage<typeof obj>(key, { user: "", loggedIn: false })
    );

    act(() => {
      result.current[1](obj);
    });

    expect(result.current[0]).toEqual(obj);

    const stored = sessionStorage.getItem(key);
    expect(JSON.parse(stored!)).toEqual(obj);
  });

  it("should return to the initial value if JSON.parse throws (invalid JSON).", () => {
    sessionStorage.setItem(key, "{invalid-json");

    const { result } = renderHook(() => useSessionStorage(key, "fallback"));

    expect(result.current[0]).toBe("fallback");
  });

  it("should return to the initial value if sessionStorage.getItem returns.", () => {
    vi.stubGlobal("sessionStorage", {
      getItem: () => {
        throw new Error("sessionStorage blocked");
      },
      setItem: vi.fn(),
    });

    const { result } = renderHook(() => useSessionStorage(key, "safe"));

    expect(result.current[0]).toBe("safe");
  });
});
