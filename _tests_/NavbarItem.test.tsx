import { render, screen } from '@testing-library/react'
import NavbarItem from '@/components/Navbar/NavbarItem'
import { useSearchParams } from 'next/navigation'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}))

describe('NavbarItem', () => {
  const mockedUseSearchParams = useSearchParams as jest.Mock

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders a link with the correct href and title', () => {
    mockedUseSearchParams.mockReturnValue({
      get: () => null,
    })

    render(<NavbarItem title="Trending" param="fetchTrending" />)

    const link = screen.getByRole('link', { name: 'Trending' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/?genre=fetchTrending')
  })

  it('adds active class when genre param matches', () => {
    mockedUseSearchParams.mockReturnValue({
      get: () => 'fetchTrending',
    })

    render(<NavbarItem title="Trending" param="fetchTrending" />)

    const link = screen.getByRole('link', { name: 'Trending' })
    expect(link).toHaveClass('underline')
    expect(link).toHaveClass('decoration-primary')
  })

  it('does not add active class when genre param does not match', () => {
    mockedUseSearchParams.mockReturnValue({
      get: () => 'fetchTopRated',
    })

    render(<NavbarItem title="Trending" param="fetchTrending" />)

    const link = screen.getByRole('link', { name: 'Trending' })
    expect(link).not.toHaveClass('underline')
    expect(link).toHaveClass('hover:text-primary')
  })
})
