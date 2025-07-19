import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import { useClickOutside } from "../src/hooks/useClickOutside";

function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
  const ref = useClickOutside<HTMLDivElement>(onOutsideClick);

  return (
    <div>
      <div data-testid="outside">Outside</div>
      <div ref={ref} data-testid="inside">
        Inside
      </div>
    </div>
  );
}

describe("useClickOutside", () => {
  it("should run the handler when clicked outside.", () => {
    const onOutsideClick = vi.fn();
    const { getByTestId } = render(
      <TestComponent onOutsideClick={onOutsideClick} />
    );

    fireEvent.mouseDown(getByTestId("outside"));
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
  });

  it("should not run the handler when clicked inside.", () => {
    const onOutsideClick = vi.fn();
    const { getByTestId } = render(
      <TestComponent onOutsideClick={onOutsideClick} />
    );

    fireEvent.mouseDown(getByTestId("inside"));
    expect(onOutsideClick).not.toHaveBeenCalled();
  });
});
