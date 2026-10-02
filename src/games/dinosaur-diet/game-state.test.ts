import { describe, expect, it } from 'vitest'

import { DINOSAURS } from '../../data/dinosaurs'
import { classifyCurrentCard, createGameState, shuffle } from './game-state'

describe('dinosaur diet game rules', () => {
  it('contains twelve dinosaurs split evenly by diet', () => {
    expect(DINOSAURS).toHaveLength(12)
    expect(DINOSAURS.filter(({ diet }) => diet === 'herbivore')).toHaveLength(6)
    expect(DINOSAURS.filter(({ diet }) => diet === 'carnivore')).toHaveLength(6)
  })

  it('assigns a unique public photograph to every dinosaur', () => {
    const images = DINOSAURS.map(({ image }) => image)

    expect(images).toEqual([
      '/dinos/triceratops.jpg',
      '/dinos/diplodocus.jpg',
      '/dinos/pachycephalosaurus.jpg',
      '/dinos/stegosaurus.jpg',
      '/dinos/ankylosaurus.jpg',
      '/dinos/parasaurolophus.jpg',
      '/dinos/tyrannosaurus-rex.jpg',
      '/dinos/velociraptor.jpg',
      '/dinos/spinosaurus.jpg',
      '/dinos/giganotosaurus.jpg',
      '/dinos/carnotaurus.jpg',
      '/dinos/dilophosaurus.jpg',
    ])
    expect(new Set(images).size).toBe(12)
  })

  it('shuffles without losing or mutating dinosaurs', () => {
    const shuffled = shuffle(DINOSAURS)
    expect(new Set(shuffled.map(({ id }) => id))).toEqual(new Set(DINOSAURS.map(({ id }) => id)))
    expect(shuffled).not.toBe(DINOSAURS)
  })

  it('moves the current dinosaur to its matching collection', () => {
    const state = createGameState([DINOSAURS[0]])
    const result = classifyCurrentCard(state, DINOSAURS[0].diet)
    expect(result.accepted).toBe(true)
    expect(result.state.deck).toHaveLength(0)
    expect(result.state.classifiedHerbivores).toContainEqual(DINOSAURS[0])
    expect(result.state.completed).toBe(true)
  })

  it('keeps the current dinosaur after an incorrect classification', () => {
    const state = createGameState([DINOSAURS[0]])
    const result = classifyCurrentCard(state, 'carnivore')
    expect(result.accepted).toBe(false)
    expect(result.state.deck).toEqual(state.deck)
    expect(result.state.classifiedHerbivores).toEqual([])
  })

  it('completes after all twelve dinosaurs are correctly classified', () => {
    let state = createGameState(DINOSAURS)
    for (const dinosaur of DINOSAURS) state = classifyCurrentCard(state, dinosaur.diet).state
    expect(state.completed).toBe(true)
    expect(state.deck).toHaveLength(0)
  })
})
