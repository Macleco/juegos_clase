interface GameMenuProps {
  onStartDinosaurDiet: () => void
}

export function GameMenu({ onStartDinosaurDiet }: GameMenuProps) {
  return (
    <main className="game-menu">
      <header className="game-menu-header">
        <h1>Elige un juego</h1>
        <p>Aprende jugando.</p>
      </header>
      <section className="game-menu-list" aria-label="Juegos disponibles">
        <button className="game-menu-card" onClick={onStartDinosaurDiet}>
          <span className="game-menu-icon" aria-hidden="true">🦕</span>
          <span>
            <strong>¿Qué comía cada dinosaurio?</strong>
            <small>Clasifica dinosaurios en herbívoros y carnívoros.</small>
          </span>
        </button>
      </section>
    </main>
  )
}
