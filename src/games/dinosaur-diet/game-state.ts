import type { Diet, Dinosaur } from '../../data/dinosaurs'

export interface GameState {
  deck: readonly Dinosaur[]
  classifiedHerbivores: readonly Dinosaur[]
  classifiedCarnivores: readonly Dinosaur[]
  completed: boolean
}

export interface ClassificationResult {
  accepted: boolean
  state: GameState
}

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[randomIndex]] = [result[randomIndex], result[index]]
  }
  return result
}

export function selectRound(dinosaurs: readonly Dinosaur[]): Dinosaur[] {
  const herbivores = dinosaurs.filter(({ diet }) => diet === 'herbivore')
  const carnivores = dinosaurs.filter(({ diet }) => diet === 'carnivore')

  return shuffle([
    ...shuffle(herbivores).slice(0, 4),
    ...shuffle(carnivores).slice(0, 4),
  ])
}

export function createGameState(deck: readonly Dinosaur[]): GameState {
  return {
    deck: [...deck],
    classifiedHerbivores: [],
    classifiedCarnivores: [],
    completed: deck.length === 0,
  }
}

export function classifyCurrentCard(state: GameState, target: Diet): ClassificationResult {
  const currentCard = state.deck[0]
  if (!currentCard || currentCard.diet !== target) return { accepted: false, state }

  const deck = state.deck.slice(1)
  const classifiedHerbivores =
    target === 'herbivore' ? [...state.classifiedHerbivores, currentCard] : state.classifiedHerbivores
  const classifiedCarnivores =
    target === 'carnivore' ? [...state.classifiedCarnivores, currentCard] : state.classifiedCarnivores

  return {
    accepted: true,
    state: {
      deck,
      classifiedHerbivores,
      classifiedCarnivores,
      completed: deck.length === 0,
    },
  }
}
