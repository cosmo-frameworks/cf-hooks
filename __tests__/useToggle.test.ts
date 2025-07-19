import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToggle } from '../src/hooks/useToggle';

describe('useToggle', () => {
  it('debe iniciar con false por defecto', () => {
    const { result } = renderHook(() => useToggle());
    const [value] = result.current;
    expect(value).toBe(false);
  });

  it('debe aceptar un valor inicial true', () => {
    const { result } = renderHook(() => useToggle(true));
    const [value] = result.current;
    expect(value).toBe(true);
  });

  it('debe alternar el valor con toggle()', () => {
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

  it('debe activar y desactivar con setOn() y setOff()', () => {
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
