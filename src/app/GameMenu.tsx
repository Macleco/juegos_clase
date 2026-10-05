interface GameMenuProps {
  onStartDinosaurDiet: () => void
  onStartFriendshipSignals: () => void
}

export function GameMenu({ onStartDinosaurDiet, onStartFriendshipSignals }: GameMenuProps) {
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
        <button className="game-menu-card friendship-menu-card" onClick={onStartFriendshipSignals}>
          <span className="game-menu-icon" aria-hidden="true">🤝</span>
          <span>
            <strong>Señales de mis amistades</strong>
            <small>Clasifica situaciones que pueden pasar con tus amistades.</small>
          </span>
        </button>
      </section>
    </main>
  )
}
