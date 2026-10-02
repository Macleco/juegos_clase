import { DndContext, DragOverlay, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Drumstick, Leaf } from 'lucide-react'
import { useState } from 'react'
import type { Diet, Dinosaur } from '../../data/dinosaurs'
import { DINOSAURS } from '../../data/dinosaurs'
import { GameHeader } from '../../components/GameHeader'
import { Modal } from '../../components/Modal'
import { ProgressIndicator } from '../../components/ProgressIndicator'
import { classifyCurrentCard, createGameState, shuffle } from './game-state'

function Card({ dinosaur, active = false }: { dinosaur: Dinosaur; active?: boolean }) {
  const draggable = useDraggable({ id: dinosaur.id, disabled: !active })
  return <article ref={draggable.setNodeRef} {...draggable.listeners} {...draggable.attributes} data-testid={active ? 'active-dinosaur-card' : undefined} className={`dino-card ${active ? 'active-card' : ''}`} style={active ? { transform: CSS.Translate.toString(draggable.transform) } : undefined}>
    <div className="dino-placeholder" aria-hidden="true">🦕</div><strong>{dinosaur.name}</strong>
  </article>
}
function Zone({ diet, dinosaurs }: { diet: Diet; dinosaurs: readonly Dinosaur[] }) {
  const drop = useDroppable({ id: diet })
  const herbivore = diet === 'herbivore'
  return <section ref={drop.setNodeRef} className={`diet-zone ${diet} ${drop.isOver ? 'over' : ''}`} aria-label={herbivore ? 'Herbívoros' : 'Carnívoros'}>
    <h2>{herbivore ? <Leaf /> : <Drumstick />} {herbivore ? 'HERBÍVOROS' : 'CARNÍVOROS'}</h2><p>¡Arrastra aquí!</p><div className="classified">{dinosaurs.map(dinosaur => <Card key={dinosaur.id} dinosaur={dinosaur} />)}</div>
  </section>
}
export function DinosaurDietGame() {
  const [state, setState] = useState(() => createGameState(shuffle(DINOSAURS)))
  const [settings, setSettings] = useState(false); const [celebrate, setCelebrate] = useState(false); const [dragging, setDragging] = useState(false); const [wrong, setWrong] = useState(false)
  const current = state.deck[0]; const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))
  const restart = () => { setState(createGameState(shuffle(DINOSAURS))); setCelebrate(false); setSettings(false) }
  const classify = (target: Diet) => { const result = classifyCurrentCard(state, target); if (!result.accepted) { setWrong(true); window.setTimeout(() => setWrong(false), 450); return }; setState(result.state); if (result.state.completed) window.setTimeout(() => setCelebrate(true), 350) }
  return <main className="game-shell"><GameHeader onHome={restart} onRestart={restart} onSettings={() => setSettings(true)} />
    <DndContext sensors={sensors} onDragStart={() => setDragging(true)} onDragCancel={() => setDragging(false)} onDragEnd={({ over }) => { setDragging(false); if (over?.id === 'herbivore' || over?.id === 'carnivore') classify(over.id) }}>
      <div className="zones"><Zone diet="herbivore" dinosaurs={state.classifiedHerbivores} /><Zone diet="carnivore" dinosaurs={state.classifiedCarnivores} /></div>
      <ProgressIndicator current={12 - state.deck.length} total={12} />
      <section className="deck" aria-label="Mazo de dinosaurios"><div className="card-back back-one"/><div className="card-back back-two"/>{current && <div className={`deck-card ${wrong ? 'wrong' : ''}`}><Card dinosaur={current} active /></div>}</section>
      <DragOverlay>{dragging && current ? <Card dinosaur={current} /> : null}</DragOverlay>
    </DndContext>
    {settings && <Modal title="Configuración" onClose={() => setSettings(false)}><p>Panel preparado para futuras opciones de aula.</p><button className="primary-button" onClick={restart}>Reiniciar partida</button></Modal>}
    {celebrate && <Modal title="🎉 ¡Muy bien! 🎉" onClose={() => setCelebrate(false)}><p>¡Has clasificado todos los dinosaurios!</p><button className="primary-button" onClick={restart}>Jugar otra vez</button></Modal>}
  </main>
}
