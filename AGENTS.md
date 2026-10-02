# AGENTS.md

## Proyecto

Aplicación web educativa estática para pizarra digital. La primera actividad
es clasificar dinosaurios como herbívoros o carnívoros.

## Stack

- Vite, React y TypeScript estricto.
- Tailwind CSS para estilos; CSS local cuando simplifique animaciones o layout.
- `@dnd-kit/core` para arrastrar y soltar compatible con ratón, táctil y
  puntero de pizarra.
- Vitest y React Testing Library.

## Estructura

- `src/app`: composición de la aplicación.
- `src/components`: piezas comunes reutilizables.
- `src/data`: datasets estáticos.
- `src/games/dinosaur-diet`: reglas, componentes y pruebas del juego actual.
- `src/styles`: estilos globales.
- `docs`: documentación de arquitectura, diseño y planes.

Mantén los juegos futuros aislados dentro de `src/games/<nombre-del-juego>`.
No introduzcas un motor genérico ni estado global sin una necesidad compartida
demostrable.

## Desarrollo

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

Antes de declarar una tarea terminada, ejecuta `npm test`, `npm run lint` y
`npm run build`.

## Convenciones

- Escribe o actualiza pruebas antes de cambiar lógica o comportamiento.
- Mantén `game-state.ts` como lógica pura e inmutable; los componentes React
  gestionan la presentación y la interacción.
- Centraliza los dinosaurios y sus categorías en `src/data/dinosaurs.ts`.
- Prioriza 1920×1080 y evita scroll vertical durante la partida.
- No dependas de hover, texto pequeño ni controles pequeños.
- Respeta `prefers-reduced-motion`, contraste, HTML semántico y targets táctiles
  grandes.
- Para drag & drop, preserva `touch-action: none` y prueba al menos el flujo
  correcto e incorrecto.

## Límites de alcance actuales

No añadir backend, autenticación, PWA, Service Worker, persistencia, perfiles,
estadísticas, modos por edad, otros juegos, audio o ilustraciones definitivas
sin una petición explícita.

## Git y despliegue

- Trabaja en la rama indicada por la persona usuaria; actualmente se usa
  `main`.
- Realiza commits pequeños y descriptivos.
- GitHub Actions publica GitHub Pages desde `main`; no fijes el nombre del
  repositorio en `vite.config.ts`.
