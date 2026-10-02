# Marta Game

Primera actividad de una colección de juegos educativos: clasificar dinosaurios herbívoros y carnívoros en una pizarra digital.

## Stack

Vite, React, TypeScript, Tailwind CSS, dnd-kit, Lucide, Vitest y React Testing Library.

## Desarrollo

```bash
npm install
npm run dev
```

## Calidad y build

```bash
npm test
npm run lint
npm run build
```

## GitHub Pages

El workflow de `.github/workflows/deploy.yml` publica cada push a `main`. Vite toma automáticamente el nombre del repositorio desde `GITHUB_REPOSITORY` en CI; en local usa `/` como base.

## Estructura

- `src/components`: controles de aula reutilizables.
- `src/data`: dataset de dinosaurios.
- `src/games/dinosaur-diet`: reglas y pantalla específica del juego.
- `docs`: diseño y arquitectura.
