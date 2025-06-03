import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/Navbar/Navbar';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('Navbar', () => {
  const mockedUsePathname = usePathname as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both NavbarItems with correct text', () => {
    mockedUsePathname.mockReturnValue('/');
    render(<Navbar />);

    expect(screen.getByRole('link', { name: 'Trending' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Top Rated' })).toBeInTheDocument();
  });

  it('renders correct hrefs for links', () => {
    mockedUsePathname.mockReturnValue('/');
    render(<Navbar />);

    expect(screen.getByRole('link', { name: 'Trending' })).toHaveAttribute('href', '/trending');
    expect(screen.getByRole('link', { name: 'Top Rated' })).toHaveAttribute('href', '/top-rated');
  });

  it('applies active class to the active link', () => {
    mockedUsePathname.mockReturnValue('/top-rated');
    render(<Navbar />);

    const trendingLink = screen.getByRole('link', { name: 'Trending' });
    const topRatedLink = screen.getByRole('link', { name: 'Top Rated' });

    expect(topRatedLink).toHaveClass('underline');
    expect(trendingLink).not.toHaveClass('underline');
  });

  it('updates search input and triggers router.push on submit', () => {
    mockedUsePathname.mockReturnValue('/');
    render(<Navbar />);

    const input = screen.getByPlaceholderText('Search movies...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'inception' } });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/search?query=inception');
  });

  it('does not push if query is empty or only spaces', () => {
    mockedUsePathname.mockReturnValue('/');
    render(<Navbar />);

    const input = screen.getByPlaceholderText('Search movies...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    expect(pushMock).not.toHaveBeenCalled();
  });
});
