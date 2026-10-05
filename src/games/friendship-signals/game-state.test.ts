import { describe, expect, it } from 'vitest'

import { FRIENDSHIP_SITUATIONS } from '../../data/friendship-situations'
import { classifyCurrentCard, createGameState, selectRound } from './game-state'

describe('friendship signals game rules', () => {
  it('keeps situations in the three safety signals', () => {
    expect(FRIENDSHIP_SITUATIONS.filter(({ signal }) => signal === 'green')).toHaveLength(4)
    expect(FRIENDSHIP_SITUATIONS.filter(({ signal }) => signal === 'yellow')).toHaveLength(4)
    expect(FRIENDSHIP_SITUATIONS.filter(({ signal }) => signal === 'red')).toHaveLength(6)
    expect(FRIENDSHIP_SITUATIONS.map(({ id }) => id)).toContain('cromos')
  })

  it('moves a situation only to its matching signal', () => {
    const situation = FRIENDSHIP_SITUATIONS[0]
    const result = classifyCurrentCard(createGameState([situation]), 'green')

    expect(result.accepted).toBe(true)
    expect(result.state.classified.green).toEqual([situation])
    expect(result.state.completed).toBe(true)
  })

  it('keeps the current situation after choosing the wrong signal', () => {
    const state = createGameState([FRIENDSHIP_SITUATIONS[0]])
    const result = classifyCurrentCard(state, 'red')

    expect(result.accepted).toBe(false)
    expect(result.state).toBe(state)
  })

  it('creates a round with every situation', () => {
    const round = selectRound(FRIENDSHIP_SITUATIONS)

    expect(round).toHaveLength(14)
    expect(new Set(round.map(({ id }) => id))).toHaveLength(14)
  })
})
