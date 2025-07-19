import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import { useClickOutside } from '../src/hooks/useClickOutside';

function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
  const ref = useClickOutside<HTMLDivElement>(onOutsideClick);

  return (
    <div>
      <div data-testid="outside">Outside</div>
      <div ref={ref} data-testid="inside">Inside</div>
    </div>
  );
}

describe('useClickOutside', () => {
  it('debe ejecutar el handler cuando se hace clic fuera', () => {
    const onOutsideClick = vi.fn();
    const { getByTestId } = render(<TestComponent onOutsideClick={onOutsideClick} />);

    fireEvent.mouseDown(getByTestId('outside'));
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('NO debe ejecutar el handler cuando se hace clic dentro', () => {
    const onOutsideClick = vi.fn();
    const { getByTestId } = render(<TestComponent onOutsideClick={onOutsideClick} />);

    fireEvent.mouseDown(getByTestId('inside'));
    expect(onOutsideClick).not.toHaveBeenCalled();
  });
});
