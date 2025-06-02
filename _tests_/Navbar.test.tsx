
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar/Navbar'
import { usePathname } from 'next/navigation'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('Navbar', () => {
  const mockedUsePathname = usePathname as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders both NavbarItems with correct text', () => {
    mockedUsePathname.mockReturnValue('/')
    render(<Navbar />)

    expect(screen.getByRole('link', { name: 'Trending' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Top Rated' })).toBeInTheDocument()
  })

  it('renders correct hrefs for links', () => {
    mockedUsePathname.mockReturnValue('/')
    render(<Navbar />)

    expect(screen.getByRole('link', { name: 'Trending' })).toHaveAttribute('href', '/trending')
    expect(screen.getByRole('link', { name: 'Top Rated' })).toHaveAttribute('href', '/top-rated')
  })

  it('applies active class to the active link', () => {
    mockedUsePathname.mockReturnValue('/trending')
    render(<Navbar />)

    const trendingLink = screen.getByRole('link', { name: 'Trending' })
    const topRatedLink = screen.getByRole('link', { name: 'Top Rated' })

    expect(trendingLink).toHaveClass('underline')
    expect(topRatedLink).not.toHaveClass('underline')
  })
})
