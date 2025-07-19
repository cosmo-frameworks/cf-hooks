import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useSyncedState } from "../src/hooks/useSyncedState";

describe("useSyncedState", () => {
  const key = "test-key";

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialized with the value of localStorage if present.", () => {
    localStorage.setItem(key, JSON.stringify("stored"));
    const { result } = renderHook(() => useSyncedState(key, "default"));

    expect(result.current[0]).toBe("stored");
  });

  it("should be initialized with the default value if there is no local storage value.", () => {
    const { result } = renderHook(() => useSyncedState(key, "default"));

    expect(result.current[0]).toBe("default");
  });

  it("should update the state and local storage when calling the update function.", () => {
    const { result } = renderHook(() => useSyncedState(key, "initial"));

    act(() => {
      result.current[1]("new-value");
    });

    expect(result.current[0]).toBe("new-value");
    expect(localStorage.getItem(key)).toBe(JSON.stringify("new-value"));
  });

  it("should update state when save event is triggered (sync between tabs).", () => {
    const { result } = renderHook(() => useSyncedState(key, "initial"));

    act(() => {
      const newValue = JSON.stringify("synced-value");
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue,
        })
      );
    });

    expect(result.current[0]).toBe("synced-value");
  });
});
