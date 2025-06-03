
import { render, screen } from '@testing-library/react';
import SearchPage from '@/app/search/page';
import { notFound } from 'next/navigation';
import { fetchMoviesBySearch } from '@/lib/fetchMoviesBySearch';

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

jest.mock('@/lib/fetchMoviesBySearch');

const mockedFetchMoviesBySearch = fetchMoviesBySearch as jest.Mock;
const mockedNotFound = notFound as unknown;

it('renders movie list for a valid query', async () => {
  mockedFetchMoviesBySearch.mockResolvedValueOnce([
    {
      id: 1,
      title: 'Sinners',
      overview: 'A thrilling movie.',
      poster_path: '/sinners.jpg',
    },
  ]);

  const props = {
    searchParams: Promise.resolve({ query: 'sinners' }),
  };

  render(await SearchPage(props));

  expect(await screen.findByText(/Search Results for sinners/i)).toBeInTheDocument();
});

it('calls notFound for empty query', async () => {
  const props = {
    searchParams: Promise.resolve({ query: '   ' }),
  };

  await SearchPage(props);

  expect(mockedNotFound).toHaveBeenCalled();
});

it('calls notFound if no movies are found', async () => {
  mockedFetchMoviesBySearch.mockResolvedValueOnce([]);

  const props = {
    searchParams: Promise.resolve({ query: 'unknownmovie' }),
  };

  await SearchPage(props);

  expect(mockedNotFound).toHaveBeenCalled();
});

