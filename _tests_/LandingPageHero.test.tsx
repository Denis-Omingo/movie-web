
import { render, screen, fireEvent, act } from '@testing-library/react'
import LandingPageHero from '@/components/LandingPageHero'
import '@testing-library/jest-dom'

jest.useFakeTimers()

describe('LandingHero', () => {
  beforeEach(() => {
    render(<LandingPageHero />)
  })

  it('renders the first slide initially', () => {
    expect(screen.getByText(/Unforgettable Stories/i)).toBeInTheDocument()
    expect(screen.getByText(/Watch amazing shows/i)).toBeInTheDocument()
  })

  it('auto-advances slides every 10 seconds', () => {
    act(() => {
      jest.advanceTimersByTime(10000)
    })
    expect(screen.getByText(/Live the Action/i)).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(10000)
    })
    expect(screen.getByText(/New Adventures Weekly/i)).toBeInTheDocument()
  })

  it('loops back to the first slide after the last', () => {
    act(() => {
      jest.advanceTimersByTime(30000)
    })
    expect(screen.getByText(/Unforgettable Stories/i)).toBeInTheDocument()
  })

  it('navigates to the next slide on right arrow click', () => {
    fireEvent.click(screen.getByLabelText(/Next Slide/i))
    expect(screen.getByText(/Live the Action/i)).toBeInTheDocument()
  })

  it('navigates to the previous slide on left arrow click', () => {
    fireEvent.click(screen.getByLabelText(/Previous Slide/i))
    expect(screen.getByText(/New Adventures Weekly/i)).toBeInTheDocument()
  })

  it('navigates to a specific slide when a dot is clicked', () => {
    const dots = screen.getAllByRole('button', { name: /Go to slide/i })
    fireEvent.click(dots[2])
    expect(screen.getByText(/New Adventures Weekly/i)).toBeInTheDocument()
  })

  it('renders Join Our Shows CTA button', () => {
    expect(screen.getByText(/Join Our Shows/i)).toBeInTheDocument()
  })
})
