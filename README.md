# ⚛️ cf-hooks

[![Build Status](https://github.com/cosmo-frameworks/cf-hooks-lib/actions/workflows/publish.yml/badge.svg)](https://github.com/cosmo-frameworks/cf-hooks-lib/actions)
[![codecov](https://codecov.io/github/cosmo-frameworks/cf-hooks-lib/graph/badge.svg?token=9NLJ1LS7W5)](https://codecov.io/github/cosmo-frameworks/cf-hooks-lib)
[![npm](https://img.shields.io/npm/v/cf-hooks-lib)](https://www.npmjs.com/package/cf-hooks-lib)

Librería profesional de **React Hooks reutilizables**, diseñados para mejorar la productividad, simplicidad y rendimiento en aplicaciones modernas con React.

## 🚀 Instalación

```bash
npm install cf-hooks-lib
```

> **⚠️ Esta librería requiere react como peerDependency. Asegúrate de tener React 18+ instalado en tu proyecto.**

## 🧩 Hooks disponibles

### `useDebounce`

> Ideal para optimizar búsquedas, inputs o eventos frecuentes.

```tsx
const debouncedValue = useDebounce(value, delay);
```

- **value**: cualquier valor que desees debilitar.
- **delay**: tiempo de espera (en ms) antes de actualizar el valor.

### `useToggle`

> Útil para switches, modales, etc.

```tsx
const [value, toggle, setOn, setOff] = useToggle(initialValue);
```

- **toggle()**: invierte el valor actual.
- **setOn()**: lo pone en true.
- **setOff()**: lo pone en false.

### `useClickOutside`

> Asigna el ref al elemento que quieres proteger del clic externo.

```tsx
const ref = useClickOutside(() => {
  // Se ejecuta cuando el usuario hace clic fuera del elemento
});
```

### `useIsMounted`

> Saber si un componente sigue montado. Útil para evitar actualizar estado tras `unmount`

```tsx
const isMounted = useIsMounted();

useEffect(() => {
  fetchData().then((data) => {
    if (isMounted.current) {
      setData(data);
    }
  });
}, []);
```

### `useEventCallback`

> Devuelve un callback estable que no se vuelve a crear en cada render (memoria óptima).

```tsx
const handleClick = useEventCallback(() => {
  console.log("Siempre la misma referencia");
});
```

### `useLocalStorage`

> Guarda y lee datos de localStorage de forma reactiva.

```tsx
const [theme, setTheme] = useLocalStorage("theme", "light");
```

### `useSessionStorage`

> Igual que useLocalStorage, pero usa sessionStorage

```tsx
const [step, setStep] = useSessionStorage("wizardStep", 1);
```

### `useSyncedState`

> Estado sincronizado entre pestañas usando localStorage.

```tsx
const [name, setName] = useSyncedState("sharedName", "");
```

### `useMediaQuery`

> Detecta si el viewport coincide con una media query.

```tsx
const isLarge = useMediaQuery("(min-width: 1024px)");
```

### `useWindowSize`

> Devuelve { width, height } actualizados al redimensionar la ventana.

```tsx
const { width, height } = useWindowSize();
```

### `useElementSize`

> Mide dinámicamente el tamaño de un elemento (usa ResizeObserver).

```tsx
const [ref, size] = useElementSize<HTMLDivElement>();
return <div ref={ref}>Ancho: {size.width}px</div>;
```

### `useIntersectionObserver`

> Detecta si un elemento está visible en el viewport (lazy load, animaciones, etc).

```tsx
const [ref, isVisible] = useIntersectionObserver();
return <div ref={ref}>{isVisible ? "Visible" : "No visible"}</div>;
```

### `useHover`

> Saber si el mouse está encima de un elemento.

```tsx
const [ref, hovering] = useHover<HTMLDivElement>();
return <div ref={ref}>{hovering ? "Hovering" : "Not hovering"}</div>;
```

### `useTimeout`

> Ejecuta una función una sola vez tras un tiempo.

```tsx
useTimeout(() => {
  console.log("Timeout ejecutado");
}, 1000);
```

### `useInterval`

> Ejecuta una función repetidamente cada X milisegundos.

```tsx
useInterval(() => {
  console.log("Cada segundo");
}, 1000);
```
