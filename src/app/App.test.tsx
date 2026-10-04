import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { App } from './App'

describe('App', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('shows the game menu at the root URL', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /elige un juego/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /qué comía cada dinosaurio/i })).toBeInTheDocument()
  })

  it('opens the dinosaur game from the menu and returns home', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /qué comía cada dinosaurio/i }))

    expect(screen.getByRole('heading', { name: /qué comía cada dinosaurio/i })).toBeInTheDocument()
    expect(window.location.hash).toBe('#/dinosaur-diet')

    fireEvent.click(screen.getByRole('button', { name: /inicio/i }))

    expect(screen.getByRole('heading', { name: /elige un juego/i })).toBeInTheDocument()
    expect(window.location.hash).toBe('')
  })
})
