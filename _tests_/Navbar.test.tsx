import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar/Navbar'
import { useSearchParams } from 'next/navigation'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}))

describe('Navbar', () => {
  const mockedUseSearchParams = useSearchParams as jest.Mock

  beforeEach(() => {
    mockedUseSearchParams.mockReturnValue({
      get: () => null, 
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders both NavbarItems with correct text', () => {
    render(<Navbar />)

    expect(screen.getByRole('link', { name: 'Trending' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Top Rated' })).toBeInTheDocument()
  })

  it('renders correct hrefs for links', () => {
    render(<Navbar />)

    expect(screen.getByRole('link', { name: 'Trending' })).toHaveAttribute(
      'href',
      '/?genre=fetchTrending'
    )
    expect(screen.getByRole('link', { name: 'Top Rated' })).toHaveAttribute(
      'href',
      '/?genre=fetchTopRated'
    )
  })

  it('applies active class to selected genre link', () => {
    mockedUseSearchParams.mockReturnValue({
      get: () => 'fetchTrending',
    })

    render(<Navbar />)

    const trendingLink = screen.getByRole('link', { name: 'Trending' })
    const topRatedLink = screen.getByRole('link', { name: 'Top Rated' })

    expect(trendingLink).toHaveClass('underline')
    expect(topRatedLink).not.toHaveClass('underline')
  })
})
