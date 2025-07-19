import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useMediaQuery } from "../src/hooks/useMediaQuery";

describe("useMediaQuery", () => {
  let listeners: Array<(e: MediaQueryListEvent) => void> = [];
  let mqlInstance: MediaQueryList;

  beforeEach(() => {
    listeners = [];

    //Simulación básica de matchMedia
    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => {
        mqlInstance = {
          media: query,
          matches: true,
          onchange: null,
          addEventListener: (_event, listener) => listeners.push(listener),
          removeEventListener: (_event, listener) => {
            listeners = listeners.filter((l) => l !== listener);
          },
          dispatchEvent: () => true,
        } as unknown as MediaQueryList;

        return mqlInstance;
      })
    );
  });

  it("should respond to media query change events.", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(true);

    act(() => {
      (mqlInstance.matches as boolean) = false;
      listeners.forEach((fn) => fn({ matches: false } as MediaQueryListEvent));
    });

    expect(result.current).toBe(false);

    act(() => {
      (mqlInstance.matches as boolean) = true;
      listeners.forEach((fn) => fn({ matches: true } as MediaQueryListEvent));
    });

    expect(result.current).toBe(true);
  });
});
