# ⚛️ cf-hooks

[![Build Status](https://github.com/cosmo-frameworks/cf-hooks/actions/workflows/publish.yml/badge.svg)](https://github.com/cosmo-frameworks/cf-hooks/actions)
[![codecov](https://codecov.io/github/cosmo-frameworks/cf-hooks/graph/badge.svg?token=9NLJ1LS7W5)](https://codecov.io/github/cosmo-frameworks/cf-hooks)
[![npm](https://img.shields.io/npm/v/cf-hooks)](https://www.npmjs.com/package/cf-hooks)

Librería profesional de **React Hooks reutilizables**, diseñados para mejorar la productividad, simplicidad y rendimiento en aplicaciones modernas con React.

## 🚀 Instalación

```bash
npm install cf-hooks
```
> **⚠️ Esta librería requiere react como peerDependency. Asegúrate de tener React 18+ instalado en tu proyecto.**

## 🧩 Hooks disponibles

### `useDebounce`

```tsx
const debouncedValue = useDebounce(value, delay);
```

- **value**: cualquier valor que desees debilitar.
- **delay**: tiempo de espera (en ms) antes de actualizar el valor.

> Ideal para optimizar búsquedas, inputs o eventos frecuentes.

### `useToggle`

```tsx
const [value, toggle, setOn, setOff] = useToggle(initialValue);
```

- **toggle()**: invierte el valor actual.
- **setOn()**: lo pone en true.
- **setOff()**: lo pone en false.

> Útil para switches, modales, etc.

### `useClickOutside`

```tsx
const ref = useClickOutside(() => {
  // Se ejecuta cuando el usuario hace clic fuera del elemento
});
```

Asigna el ref al elemento que quieres proteger del clic externo.
