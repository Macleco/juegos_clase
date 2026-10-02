# Diseño técnico — juego de dieta de dinosaurios

## Objetivo

Aplicación estática para pizarra digital que permite clasificar doce
dinosaurios (seis herbívoros y seis carnívoros) mediante arrastrar y soltar.
La primera versión contiene exclusivamente este juego y no necesita cuentas,
datos remotos ni funcionamiento sin conexión.

## Stack y despliegue

- Vite, React y TypeScript con comprobación estricta.
- Tailwind CSS para el sistema visual y animaciones ligeras.
- `@dnd-kit/core` para drag & drop basado en Pointer Events, con sensores de
  puntero y ratón y reglas CSS de `touch-action` para superficies táctiles.
- Vitest y React Testing Library.
- GitHub Actions que publica el directorio `dist` en GitHub Pages. La base de
  Vite se obtiene de `GITHUB_REPOSITORY` en CI y usa `/` en desarrollo, para
  no fijar el nombre del repositorio antes de conocerlo.

## Estructura

```
src/
  app/                 punto de entrada y composición de la aplicación
  components/          cabecera, modal y progreso reutilizables
  data/                dataset de dinosaurios
  games/dinosaur-diet/ componentes, estado y lógica específicos del juego
  hooks/               reservado para hooks comunes futuros
  styles/              estilos globales y tokens Tailwind
  assets/              reservado para imágenes futuras
```

No se introduce un motor genérico: un segundo juego se añadirá como otra
carpeta dentro de `games/`, una ruta o selector de inicio y sus propios datos
y estado.

## Datos y estado

`Dinosaur` contiene `id`, `name`, `diet` e `image?`. El dataset permanece en
un único módulo y se valida con tests de cardinalidad.

El hook `useDinosaurDietGame` mantiene:

- `deck`: orden aleatorio de tarjetas aún pendientes;
- `classifiedHerbivores` y `classifiedCarnivores`;
- `feedback`: estado temporal de acierto o intento para las animaciones;
- `gameCompleted`;
- estado de apertura de configuración y celebración en el componente de
  pantalla, porque no afecta a las reglas del juego.

La operación pura de clasificación recibe el estado y el destino. Un acierto
elimina solo la tarjeta superior, la añade a su colección y marca final al
alcanzar doce. Un fallo devuelve el mismo estado de mazo y activa feedback
temporal. `shuffle` usa Fisher–Yates y se exporta para pruebas.

## Interacción y presentación

La pantalla usa una cuadrícula que prioriza 16:9: dos zonas superiores
simétricas con una rejilla de 3×2 cromos clasificados, y el mazo centrado en
la zona inferior. El mazo muestra únicamente la tarjeta superior como
interactiva y dos o tres respaldos neutros, sin revelar las siguientes.

Al arrastrar, el `DragOverlay` escala y eleva la tarjeta; las zonas válidas se
resaltan. Al soltar, una clasificación correcta reproduce un feedback suave
y deja el cromo pequeño en su zona. Una incorrecta reproduce un rebote breve
y conserva la tarjeta activa. Las transiciones CSS respetan
`prefers-reduced-motion`.

Cada control tiene texto accesible, objetivos grandes y contraste suficiente;
las categorías se distinguen por icono, texto y color. No se requiere hover.

## Pruebas

Las pruebas unitarias cubren dataset, Fisher–Yates y transiciones correctas,
incorrectas y de final de partida. Las pruebas de interfaz verifican tarjeta
actual, una única tarjeta activa, progreso, clasificación y modal final. No
se añade Playwright al MVP: `dnd-kit` se prueba por sus callbacks de arrastre
y el flujo de UI queda cubierto sin introducir una segunda infraestructura.

## Alcance explícitamente excluido

Otros juegos, imágenes definitivas, audio, PWA, autenticación, backend,
estadísticas, perfiles, edades y modos de dificultad.
