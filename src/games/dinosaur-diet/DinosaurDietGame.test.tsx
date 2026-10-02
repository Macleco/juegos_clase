import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DinosaurDietGame } from './DinosaurDietGame'

describe('DinosaurDietGame', () => {
  it('shows one active dinosaur and progress', () => {
    render(<DinosaurDietGame />)
    expect(screen.getAllByTestId('active-dinosaur-card')).toHaveLength(1)
    expect(screen.getByTestId('active-dinosaur-card').parentElement).toHaveClass('deck-card')
    expect(screen.getByText('0 / 12')).toBeInTheDocument()
  })

  it('shows a single drag instruction beside the dinosaur deck', () => {
    render(<DinosaurDietGame />)

    expect(screen.getByRole('complementary', { name: /instrucciones de juego/i })).toHaveTextContent(/arrastra\s*el dinosaurio/i)
    expect(screen.queryByText('¡Arrastra aquí!')).not.toBeInTheDocument()
  })
})
