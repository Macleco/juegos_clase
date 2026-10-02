# Arquitectura

La aplicación usa React localmente y no contiene estado global ni servicios remotos. `src/data/dinosaurs.ts` centraliza el contenido y `game-state.ts` mantiene las transiciones puras e inmutables de partida; `DinosaurDietGame` las conecta con la interfaz y dnd-kit.

Los elementos genéricos de aula viven en `src/components`; cada juego conserva sus componentes y reglas en `src/games/<nombre>`. Para un segundo juego, crea otra carpeta de juego con sus datos, lógica y pantalla, y añádelo al selector o inicio que corresponda. No hace falta introducir un motor genérico hasta que ambos juegos compartan una necesidad real.
