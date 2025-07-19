import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, cleanup, waitFor } from "@testing-library/react";

import { useIntersectionObserver } from "../src/hooks/useIntersectionObserver";

describe("useIntersectionObserver", () => {
  let observerCallback: IntersectionObserverCallback;
  let observe: ReturnType<typeof vi.fn>;
  let disconnect: ReturnType<typeof vi.fn>;
  let trigger: ((visible: boolean) => void) | null = null;

  beforeEach(() => {
    observe = vi.fn();
    disconnect = vi.fn();

    vi.stubGlobal(
      "IntersectionObserver",
      class {
        root: Element | null = null;
        rootMargin: string = "";
        thresholds: ReadonlyArray<number> = [];

        constructor(
          callback: IntersectionObserverCallback,
          options?: IntersectionObserverInit
        ) {
          observerCallback = callback;

          if (options?.root instanceof Element) {
            this.root = options.root;
          }

          if (options?.rootMargin) {
            this.rootMargin = options.rootMargin;
          }

          if (options?.threshold !== undefined) {
            this.thresholds = Array.isArray(options.threshold)
              ? options.threshold
              : [options.threshold];
          }

          trigger = (visible: boolean) => {
            const entry = {
              isIntersecting: visible,
              target: document.createElement("div"),
              intersectionRatio: visible ? 1 : 0,
              boundingClientRect: {} as DOMRectReadOnly,
              intersectionRect: {} as DOMRectReadOnly,
              rootBounds: null,
              time: 0,
            } as IntersectionObserverEntry;

            observerCallback([entry], this as unknown as IntersectionObserver);
          };
        }

        observe = observe;
        disconnect = disconnect;
        unobserve = vi.fn();
        takeRecords = vi.fn(() => []);
      }
    );

    cleanup();
  });

  it("should return false initially and update to true when intersecting.", async () => {
    function TestComponent() {
      const [ref, isVisible] = useIntersectionObserver();
      return (
        <div>
          <div ref={ref} data-testid="target" />
          <span data-testid="state">{isVisible ? "Visible" : "Hidden"}</span>
        </div>
      );
    }

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("state").textContent).toBe("Hidden");

    //Simulamos visibilidad
    trigger?.(true);

    //Esperamos el render asíncrono
    await waitFor(() => {
      expect(getByTestId("state").textContent).toBe("Visible");
    });

    //Simulamos invisibilidad y esperamos nuevamente
    trigger?.(false);

    await waitFor(() => {
      expect(getByTestId("state").textContent).toBe("Hidden");
    });
  });

  it("should clean up observer on unmount.", () => {
    function TestComponent() {
      const [ref] = useIntersectionObserver();
      return <div ref={ref} />;
    }

    const { unmount } = render(<TestComponent />);
    unmount();

    expect(disconnect).toHaveBeenCalled();
  });
});
