/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react'
import Home from '../page'

describe('Home', () => {
  it('renders a time grid', () => {
    const { container } = render(<Home />)
    // Check the presence of the grid/table
    expect(container.querySelector('.time-grid')).toBeDefined()
  })

  it('selects a time slot when clicked', () => {
    const { container } = render(<Home />)
    const allCells = container.querySelectorAll('td')
    fireEvent.click(allCells[1])
    expect(allCells[1].className).toContain('selected')
  })
})
