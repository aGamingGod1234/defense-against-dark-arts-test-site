// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { DarkArtsPage } from '../pages/DarkArtsPage'

beforeAll(() => {
  ;(globalThis as typeof globalThis & { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver = class IntersectionObserverMock {
    readonly root = null
    readonly rootMargin = '0px'
    readonly thresholds = [0]
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return [] }
  } as unknown as typeof IntersectionObserver

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }),
  })
})

afterEach(cleanup)

function renderPage() {
  render(<DarkArtsPage />)
}

describe('The Collegium campaign', () => {
  it('renders the complete original campaign narrative', () => {
    renderPage()

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /defense against the dark arts/i,
      }),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Enter the Collegium' })).toBeTruthy()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
    expect(screen.getByRole('tab', { name: /sever/i })).toBeTruthy()
    expect(screen.getByRole('tab', { name: /bind/i })).toBeTruthy()
    expect(screen.getByRole('tab', { name: /reveal/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /null choir/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /gloam hound/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /crownless/i })).toBeTruthy()
    expect(screen.getByText(/original fictional concept/i)).toBeTruthy()
  })

  it('rewrites the discipline instrument when Bind is selected', async () => {
    renderPage()

    const bindTab = screen.getByRole('tab', { name: /bind/i })
    fireEvent.click(bindTab)

    expect(bindTab.getAttribute('aria-selected')).toBe('true')
    expect(await screen.findByText('Hold the impossible.', {}, { timeout: 2000 })).toBeTruthy()
    expect(screen.getByText(/fix hostile matter to a shape/i)).toBeTruthy()
  })

  it('moves focus with the selected discipline on arrow keys', () => {
    renderPage()

    const severTab = screen.getByRole('tab', { name: /sever/i })
    const bindTab = screen.getByRole('tab', { name: /bind/i })
    severTab.focus()
    fireEvent.keyDown(severTab, { key: 'ArrowRight' })

    expect(document.activeElement).toBe(bindTab)
    expect(bindTab.getAttribute('aria-selected')).toBe('true')
  })

  it('brings the selected enemy dossier forward', () => {
    renderPage()

    const gloamHound = screen.getByRole('button', { name: /gloam hound/i })
    fireEvent.click(gloamHound)

    expect(gloamHound.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByText('Bind the reflection, not the body.')).toBeTruthy()
  })

  it('moves focus with the expanded enemy dossier on arrow keys', () => {
    renderPage()

    const crownless = screen.getByRole('button', { name: /crownless/i })
    const gloamHound = screen.getByRole('button', { name: /gloam hound/i })
    crownless.focus()
    fireEvent.keyDown(crownless, { key: 'ArrowRight' })

    expect(document.activeElement).toBe(gloamHound)
    expect(gloamHound.getAttribute('aria-expanded')).toBe('true')
  })
})
