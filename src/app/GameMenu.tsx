import { Drumstick } from 'lucide-react'

interface GameMenuProps {
  onStartDinosaurDiet: () => void
}

export function GameMenu({ onStartDinosaurDiet }: GameMenuProps) {
  return (
    <main className="game-menu">
      <header className="game-menu-header">
        <p className="game-menu-kicker">Juegos de dinosaurios</p>
        <h1>Elige un juego</h1>
        <p>Aprende jugando en la pizarra.</p>
      </header>
      <section className="game-menu-list" aria-label="Juegos disponibles">
        <button className="game-menu-card" onClick={onStartDinosaurDiet}>
          <Drumstick aria-hidden="true" />
          <span>
            <strong>¿Qué comía cada dinosaurio?</strong>
            <small>Clasifica dinosaurios en herbívoros y carnívoros.</small>
          </span>
        </button>
      </section>
    </main>
  )
}
