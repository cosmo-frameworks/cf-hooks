import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";

import { useHover } from "../src/hooks/useHover";

describe("useHover", () => {
  afterEach(() => cleanup());

  it("should return a reference and track the scroll state correctly.", () => {
    function HoverComponent() {
      const [ref, hovered] = useHover<HTMLDivElement>();
      return (
        <div>
          <div ref={ref} data-testid="hover-target">
            Hover me
          </div>
          <span data-testid="hover-state">
            {hovered ? "Hovered" : "Not hovered"}
          </span>
        </div>
      );
    }

    const { getByTestId } = render(<HoverComponent />);
    const target = getByTestId("hover-target");
    const hoverState = getByTestId("hover-state");

    expect(hoverState.textContent).toBe("Not hovered");

    fireEvent.mouseEnter(target);
    expect(hoverState.textContent).toBe("Hovered");

    fireEvent.mouseLeave(target);
    expect(hoverState.textContent).toBe("Not hovered");
  });

  it("should not be thrown if ref.current is null in the assembly.", () => {
    function DummyComponent() {
      const [, hovered] = useHover<HTMLDivElement>();
      return <p>{hovered ? "Hovered" : "Not hovered"}</p>;
    }

    const { getByText } = render(<DummyComponent />);
    expect(getByText("Not hovered")).toBeTruthy();
  });

  it("should clean the listeners when disassembling.", () => {
    const addEventListener = vi.spyOn(
      HTMLElement.prototype,
      "addEventListener"
    );
    const removeEventListener = vi.spyOn(
      HTMLElement.prototype,
      "removeEventListener"
    );

    function HoverComponent() {
      const [ref] = useHover<HTMLDivElement>();
      return <div ref={ref} data-testid="hover-target" />;
    }

    const { unmount } = render(<HoverComponent />);
    expect(addEventListener).toHaveBeenCalledWith(
      "mouseenter",
      expect.any(Function)
    );
    expect(addEventListener).toHaveBeenCalledWith(
      "mouseleave",
      expect.any(Function)
    );

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "mouseenter",
      expect.any(Function)
    );
    expect(removeEventListener).toHaveBeenCalledWith(
      "mouseleave",
      expect.any(Function)
    );
  });
});
