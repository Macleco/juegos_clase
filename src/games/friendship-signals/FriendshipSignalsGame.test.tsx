import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FriendshipSignalsGame } from './FriendshipSignalsGame'

describe('FriendshipSignalsGame', () => {
  it('shows one draggable situation and the three signal zones', () => {
    render(<FriendshipSignalsGame />)

    expect(screen.getAllByTestId('active-situation-card')).toHaveLength(1)
    expect(screen.getByRole('region', { name: /está bien/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /no me gusta/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /tengo que parar/i })).toBeInTheDocument()
    expect(screen.getByText('0 / 9')).toBeInTheDocument()
  })
})
