import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useLocalStorage } from "../src/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  const key = "test-key";

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should be initialized with the value of localStorage if available.", () => {
    localStorage.setItem(key, JSON.stringify("stored-value"));

    const { result } = renderHook(() => useLocalStorage(key, "default"));

    expect(result.current[0]).toBe("stored-value");
  });

  it("should be initialized with the default value if there is no item in localStorage.", () => {
    const { result } = renderHook(() => useLocalStorage(key, "default"));

    expect(result.current[0]).toBe("default");
  });

  it("should update the state and local storage.", () => {
    const { result } = renderHook(() => useLocalStorage(key, "initial"));

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    expect(localStorage.getItem(key)).toBe(JSON.stringify("updated"));
  });

  it("should handle complex types like objects.", () => {
    const obj = { name: "Alice", age: 30 };

    const { result } = renderHook(() =>
      useLocalStorage<typeof obj>(key, { name: "", age: 0 })
    );

    act(() => {
      result.current[1](obj);
    });

    expect(result.current[0]).toEqual(obj);
    expect(JSON.parse(localStorage.getItem(key)!)).toEqual(obj);
  });

  it("should fall back to initialValue if JSON is not valid.", () => {
    localStorage.setItem(key, "{invalid json");

    const { result } = renderHook(() => useLocalStorage(key, "fallback"));

    expect(result.current[0]).toBe("fallback");
  });

  it("should resort to initialValue if localStorage.getItem returns.", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("Blocked");
      },
      setItem: vi.fn(),
    });

    const { result } = renderHook(() => useLocalStorage(key, "safe"));

    expect(result.current[0]).toBe("safe");
  });
});
