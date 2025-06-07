
import { render, screen } from '@testing-library/react'
import NavbarItem from '@/components/Navbar/NavbarItem'
import { usePathname } from 'next/navigation'
import '@testing-library/jest-dom'


jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('NavbarItem', () => {
  const mockedUsePathname = usePathname as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders link with correct text and href', () => {
    mockedUsePathname.mockReturnValue('/')

    render(<NavbarItem title="Trending" param="trending" />)

    const link = screen.getByRole('link', { name: 'Trending' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/trending')
  })

  it('applies active class when pathname includes param', () => {
    mockedUsePathname.mockReturnValue('/trending')

    render(<NavbarItem title="Trending" param="trending" />)

    const link = screen.getByRole('link', { name: 'Trending' })
    expect(link).toHaveClass('underline')
    expect(link).toHaveClass('decoration-primary')
    expect(link).toHaveClass('text-primary')
  })

  it('does not apply active class when pathname does not include param', () => {
    mockedUsePathname.mockReturnValue('/top-rated')

    render(<NavbarItem title="Trending" param="trending" />)

    const link = screen.getByRole('link', { name: 'Trending' })
    expect(link).not.toHaveClass('underline')
    expect(link).toHaveClass('hover:text-primary')
  })
})
