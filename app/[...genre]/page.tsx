import { headers } from 'next/headers';
import { fetchMovies } from '@/lib/fetchMovies';
import MoviesList from '@/components/MoviesList';
import Pagination from '@/components/Pagination';

const genreMap = {
  trending: { type: 'simple', endpoint: 'trending/all/week' },
  'top-rated': { type: 'simple', endpoint: 'movie/top_rated' },
  action: { type: 'genre', endpoint: 'discover/movie', with_genres: '28' },
} as const;

type GenreKey = keyof typeof genreMap;
type GenreConfig =
  | { type: 'simple'; endpoint: string }
  | { type: 'genre'; endpoint: string; with_genres: string };

export default async function GenrePage() {
  const headersList = await headers();
  const query = headersList.get('x-invoke-query') ?? '';
  const url = new URL(`http://localhost?${query}`);

  const genreKey = (url.searchParams.get('genre') as GenreKey) || 'trending';
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const config = genreMap[genreKey] as GenreConfig;

  // ✅ FIXED: safely pass `with_genres` only if defined
  const movies = await fetchMovies({
    endpoint: config.endpoint,
    page,
    ...(config.type === 'genre' ? { with_genres: config.with_genres } : {}),
  });

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold capitalize text-primary">
        {genreKey.replace('-', ' ')}
      </h1>
      <MoviesList movies={movies.results} />
      <Pagination currentPage={page} totalPages={movies.total_pages} />
    </div>
  );
}
