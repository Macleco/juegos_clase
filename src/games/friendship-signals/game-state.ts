import type { FriendshipSignal, FriendshipSituation } from '../../data/friendship-situations'

export interface FriendshipSignalsState {
  deck: readonly FriendshipSituation[]
  classified: Readonly<Record<FriendshipSignal, readonly FriendshipSituation[]>>
  completed: boolean
}

export interface ClassificationResult {
  accepted: boolean
  state: FriendshipSignalsState
}

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[randomIndex]] = [result[randomIndex], result[index]]
  }
  return result
}

export function selectRound(situations: readonly FriendshipSituation[]): FriendshipSituation[] {
  return shuffle(situations)
}

export function createGameState(deck: readonly FriendshipSituation[]): FriendshipSignalsState {
  return { deck: [...deck], classified: { green: [], yellow: [], red: [] }, completed: deck.length === 0 }
}

export function classifyCurrentCard(state: FriendshipSignalsState, target: FriendshipSignal): ClassificationResult {
  const currentCard = state.deck[0]
  if (!currentCard || currentCard.signal !== target) return { accepted: false, state }

  const deck = state.deck.slice(1)
  return {
    accepted: true,
    state: {
      deck,
      classified: { ...state.classified, [target]: [...state.classified[target], currentCard] },
      completed: deck.length === 0,
    },
  }
}
