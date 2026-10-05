import { useEffect, useState } from 'react'
import { DinosaurDietGame } from '../games/dinosaur-diet/DinosaurDietGame'
import { FriendshipSignalsGame } from '../games/friendship-signals/FriendshipSignalsGame'
import { GameMenu } from './GameMenu'

const DINOSAUR_DIET_HASH = '#/dinosaur-diet'
const FRIENDSHIP_SIGNALS_HASH = '#/friendship-signals'

function currentRoute() {
  return window.location.hash
}

export function App() {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const syncRoute = () => setRoute(currentRoute())
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  const openDinosaurDiet = () => {
    window.location.hash = DINOSAUR_DIET_HASH
    setRoute(DINOSAUR_DIET_HASH)
  }
  const openFriendshipSignals = () => {
    window.location.hash = FRIENDSHIP_SIGNALS_HASH
    setRoute(FRIENDSHIP_SIGNALS_HASH)
  }
  const returnToMenu = () => {
    window.location.hash = ''
    setRoute('')
  }

  if (route === DINOSAUR_DIET_HASH) return <DinosaurDietGame onHome={returnToMenu} />
  if (route === FRIENDSHIP_SIGNALS_HASH) return <FriendshipSignalsGame onHome={returnToMenu} />
  return <GameMenu onStartDinosaurDiet={openDinosaurDiet} onStartFriendshipSignals={openFriendshipSignals} />
}
