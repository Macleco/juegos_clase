import { Home, RotateCcw, Settings } from 'lucide-react'

interface GameHeaderProps { title?: string; onHome: () => void; onRestart: () => void; onSettings: () => void }

export function GameHeader({ title = '¿Qué comía cada dinosaurio?', onHome, onRestart, onSettings }: GameHeaderProps) {
  return <header className="game-header">
    <button className="icon-button home-button" aria-label="Inicio" onClick={onHome}><Home aria-hidden="true" /></button>
    <h1>{title}</h1>
    <div className="header-actions">
      <button className="icon-button" aria-label="Reiniciar partida" onClick={onRestart}><RotateCcw aria-hidden="true" /></button>
      <button className="icon-button" aria-label="Configuración" onClick={onSettings}><Settings aria-hidden="true" /></button>
    </div>
  </header>
}
