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

type PageProps = {
  searchParams: {
    genre?: string;
    page?: string;
  };
};

export default async function GenrePage({ searchParams }: PageProps) {
  const genreKey = (searchParams.genre as GenreKey) || 'trending';
  const config = genreMap[genreKey] as GenreConfig;
  const page = parseInt(searchParams.page || '1', 10);

  const movies =
    config.type === 'genre'
      ? await fetchMovies({ endpoint: config.endpoint, with_genres: config.with_genres, page })
      : await fetchMovies({ endpoint: config.endpoint, page });

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold capitalize text-primary">
        {genreKey.replace('-', ' ')}
      </h1>
      <MoviesList movies={movies.results} />
      <Pagination
        currentPage={page}
        totalPages={movies.total_pages}
      />
    </div>
  );
}