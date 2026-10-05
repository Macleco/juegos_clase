import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FriendshipSignalsGame } from './FriendshipSignalsGame'

describe('FriendshipSignalsGame', () => {
  it('shows one draggable situation and the three signal zones', () => {
    render(<FriendshipSignalsGame />)

    const activeCard = screen.getByTestId('active-situation-card')
    expect(screen.getAllByTestId('active-situation-card')).toHaveLength(1)
    expect(within(activeCard).getByRole('img')).toHaveAttribute('src', expect.stringMatching(/^imagenes_amistad\//))
    expect(screen.getByRole('region', { name: /está bien/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /no me gusta/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /tengo que parar/i })).toBeInTheDocument()
    expect(screen.getByText('0 / 14')).toBeInTheDocument()
  })
})
