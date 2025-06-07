import MoviesList from '@/components/MoviesList';
import { fetchMoviesBySearch } from '@/lib/fetchMoviesBySearch';
import { notFound } from 'next/navigation';

export default async function SearchPage(props: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await props.searchParams;

  const trimmedQuery = query?.trim();
  if (!trimmedQuery) return notFound();

  const movies = await fetchMoviesBySearch(trimmedQuery);
  if (!movies || movies.length === 0) return notFound();

  return (
    <main className="px-4 py-6 max-w-7xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-primary">Search Results for {trimmedQuery}</h1>
      <MoviesList movies={movies} />
    </main>
  );
}
