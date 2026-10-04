import { useEffect, useState } from 'react'
import { DinosaurDietGame } from '../games/dinosaur-diet/DinosaurDietGame'
import { GameMenu } from './GameMenu'

const DINOSAUR_DIET_HASH = '#/dinosaur-diet'

function isDinosaurDietRoute() {
  return window.location.hash === DINOSAUR_DIET_HASH
}

export function App() {
  const [showDinosaurDiet, setShowDinosaurDiet] = useState(isDinosaurDietRoute)

  useEffect(() => {
    const syncRoute = () => setShowDinosaurDiet(isDinosaurDietRoute())
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  const openDinosaurDiet = () => {
    window.location.hash = DINOSAUR_DIET_HASH
    setShowDinosaurDiet(true)
  }
  const returnToMenu = () => {
    window.location.hash = ''
    setShowDinosaurDiet(false)
  }

  return showDinosaurDiet
    ? <DinosaurDietGame onHome={returnToMenu} />
    : <GameMenu onStartDinosaurDiet={openDinosaurDiet} />
}
