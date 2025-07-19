import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";

import { useElementSize } from "../src/hooks/useElementSize";

//Mocks global ResizeObserver
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    ResizeObserverMock.instance = this;
  }

  static instance: ResizeObserverMock | null = null;

  //simular cambio de tamaño
  static triggerResize(width: number, height: number) {
    const entry = {
      contentRect: { width, height },
    } as ResizeObserverEntry;

    ResizeObserverMock.instance?.callback(
      [entry],
      ResizeObserverMock.instance as unknown as ResizeObserver
    );
  }
}
let observerInstance: ResizeObserverMock;

describe("useElementSize", () => {
  beforeEach(() => {
    ResizeObserverMock.instance = null;
    observerInstance = new ResizeObserverMock(() => {});
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);
  });

  it("should observe and update the size of the element.", () => {
    function TestComponent() {
      const [ref, size] = useElementSize<HTMLDivElement>();

      return (
        <div>
          <div ref={ref} data-testid="box" />
          <p data-testid="size">
            {size.width}x{size.height}
          </p>
        </div>
      );
    }

    const { getByTestId } = render(<TestComponent />);
    const sizeText = getByTestId("size");

    expect(sizeText.textContent).toBe("0x0");

    act(() => {
      ResizeObserverMock.triggerResize(100, 200);
    });

    expect(sizeText.textContent).toBe("100x200");
    expect(ResizeObserverMock.instance?.observe).toHaveBeenCalled();
  });

  it("should not be thrown if the element is not yet mounted.", () => {
    function DelayedMount() {
      const [ref, size] = useElementSize<HTMLDivElement>();
      return <div>{size.width + size.height}</div>;
    }

    const { container } = render(<DelayedMount />);
    expect(container.textContent).toBe("0");
  });

  it("should disconnect the observer when dismounting.", () => {
    function Test() {
      const [ref] = useElementSize<HTMLDivElement>();
      return <div ref={ref} />;
    }

    const { unmount } = render(<Test />);
    unmount();

    expect(ResizeObserverMock.instance?.disconnect).toHaveBeenCalled();
  });
});
